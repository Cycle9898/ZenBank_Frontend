"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { console } from "inspector";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { revalidatePath } from "next/cache";

const {
	APPWRITE_DATABASE_ID: DATABASE_ID,
	APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
	APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID
} = process.env;

export async function signIn({ email, password }: SignInProps) {
	try {
		const { account } = await createAdminClient();

		const response = await account.createEmailPasswordSession(email, password);

		cookies().set("appwrite-session", response.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true
		});

		return parseStringify(response);
	} catch (error) {
		console.error("Error:", error);
	}
}

export async function signUp(userData: SignUpParams) {
	const { email, password, firstName, lastName } = userData;

	let newUserAccount;

	try {
		const { account, database } = await createAdminClient();

		newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

		if (!newUserAccount) throw new Error("Error creating user !");

		const dwollaCustomerUrl = await createDwollaCustomer({
			...userData,
			type: "personal"
		});

		if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer !");

		const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

		const newUser = await database.createDocument(DATABASE_ID!, USER_COLLECTION_ID!, ID.unique(), {
			...userData,
			userId: newUserAccount.$id,
			dwollaCustomerId,
			dwollaCustomerUrl
		});

		const session = await account.createEmailPasswordSession(email, password);

		cookies().set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true
		});

		return parseStringify(newUser);
	} catch (error) {
		console.error("Error:", error);
	}
}

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();

		const user = await account.get();

		return parseStringify(user);
	} catch (error) {
		return null;
	}
}

export async function logoutAccount() {
	try {
		const { account } = await createSessionClient();

		cookies().delete("appwrite-session");

		await account.deleteSession("current");
	} catch (error) {
		return null;
	}
}

export async function createLinkToken(user: User) {
	try {
		const tokenParams = {
			user: {
				client_user_id: user.$id
			},
			client_name: user.name,
			products: ["auth"] as Products[],
			language: "fr",
			country_codes: ["FR"] as CountryCode[]
		};

		const response = await plaidClient.linkTokenCreate(tokenParams);

		return parseStringify({ linkToken: response.data.link_token });
	} catch (error) {
		console.error(error);
	}
}

export async function createBankAccount({
	userId,
	bankId,
	accountId,
	accessToken,
	fundingSourceUrl,
	shareableId
}: CreateBankAccountProps) {
	try {
		const { database } = await createAdminClient();

		const bankAccount = await database.createDocument(DATABASE_ID!, BANK_COLLECTION_ID!, ID.unique(), {
			userId,
			bankId,
			accountId,
			accessToken,
			fundingSourceUrl,
			shareableId
		});

		return parseStringify(bankAccount);
	} catch (error) {
		console.error(error);
	}
}

export async function exchangePublicToken({ publicToken, user }: ExchangePublicTokenProps) {
	try {
		// Exchange public token for access token and item ID
		const response = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });

		const accessToken = response.data.access_token;
		const itemId = response.data.item_id;

		// Get account information from Plaid using access token
		const accountsResponse = await plaidClient.accountsGet({
			access_token: accessToken
		});

		const accountData = accountsResponse.data.accounts[0];

		// Create a processor token for Dwolla using the access token and account ID
		const request: ProcessorTokenCreateRequest = {
			access_token: accessToken,
			account_id: accountData.account_id,
			processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum
		};

		const processorTokenResponse = await plaidClient.processorTokenCreate(request);
		const processorToken = processorTokenResponse.data.processor_token;

		// Create a funding source URL for the account using the Dwolla customer ID, processor token and bank name
		const fundingSourceUrl = await addFundingSource({
			dwollaCustomerId: user.dwollaCustomerId,
			processorToken,
			bankName: accountData.name
		});

		if (!fundingSourceUrl) throw new Error();

		// Create a bank account using the user ID, item ID, account ID, accessToken, funding source URL and sharable ID
		await createBankAccount({
			userId: user.$id,
			bankId: itemId,
			accountId: accountData.account_id,
			accessToken,
			fundingSourceUrl,
			shareableId: encryptId(accountData.account_id)
		});

		revalidatePath("/");

		return parseStringify({ publicTokenExchange: "complete" });
	} catch (error) {
		console.error(error);
	}
}
