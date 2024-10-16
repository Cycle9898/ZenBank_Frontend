/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
	const dateTimeOptions: Intl.DateTimeFormatOptions = {
		weekday: "short", // abbreviated weekday name (e.g., 'Mon')
		month: "short", // abbreviated month name (e.g., 'Oct')
		day: "2-digit", // numeric day of the month (e.g., '25')
		hour: "2-digit", // numeric hour (e.g., '8')
		minute: "2-digit", // numeric minute (e.g., '30')
		hour12: false // use 12-hour clock (true) or 24-hour clock (false)
	};

	const dateDayOptions: Intl.DateTimeFormatOptions = {
		weekday: "short", // abbreviated weekday name (e.g., 'Mon')
		year: "numeric", // numeric year (e.g., '2023')
		month: "2-digit", // abbreviated month name (e.g., 'Oct')
		day: "2-digit" // numeric day of the month (e.g., '25')
	};

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: "short", // abbreviated month name (e.g., 'Oct')
		year: "numeric", // numeric year (e.g., '2023')
		day: "numeric" // numeric day of the month (e.g., '25')
	};

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit", // numeric hour (e.g., '8')
		minute: "2-digit", // numeric minute (e.g., '30')
		hour12: false // use 12-hour clock (true) or 24-hour clock (false)
	};

	const formattedDateTime: string = new Date(dateString).toLocaleString("fr-FR", dateTimeOptions);

	const formattedDateDay: string = new Date(dateString).toLocaleString("fr-FR", dateDayOptions);

	const formattedDate: string = new Date(dateString).toLocaleString("fr-FR", dateOptions);

	const formattedTime: string = new Date(dateString).toLocaleString("fr-FR", timeOptions);

	return {
		dateTime: formattedDateTime,
		dateDay: formattedDateDay,
		dateOnly: formattedDate,
		timeOnly: formattedTime
	};
};

export function formatAmount(amount: number): string {
	const formatter = new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2
	});

	return formatter.format(amount);
}

export const parseStringify = (value: unknown) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
	return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
	params: string;
	key: string;
	value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl
		},
		{ skipNull: true }
	);
}

export function getAccountTypeColors(type: AccountTypes) {
	switch (type) {
		case "depository":
			return {
				bg: "bg-blue-25",
				lightBg: "bg-blue-100",
				title: "text-blue-900",
				subText: "text-blue-700"
			};

		case "credit":
			return {
				bg: "bg-success-25",
				lightBg: "bg-success-100",
				title: "text-success-900",
				subText: "text-success-700"
			};

		default:
			return {
				bg: "bg-green-25",
				lightBg: "bg-green-100",
				title: "text-green-900",
				subText: "text-green-700"
			};
	}
}

export function countTransactionCategories(transactions: Transaction[]): CategoryCount[] {
	const categoryCounts: { [category: string]: number } = {};
	let totalCount = 0;

	// Iterate over each transaction
	transactions &&
		transactions.forEach(transaction => {
			// Extract the category from the transaction
			const category = transaction.category;

			// If the category exists in the categoryCounts object, increment its count
			if (categoryCounts.hasOwnProperty(category)) {
				categoryCounts[category]++;
			} else {
				// Otherwise, initialize the count to 1
				categoryCounts[category] = 1;
			}

			// Increment total count
			totalCount++;
		});

	// Convert the categoryCounts object to an array of objects
	const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(category => ({
		name: category,
		count: categoryCounts[category],
		totalCount
	}));

	// Sort the aggregatedCategories array by count in descending order
	aggregatedCategories.sort((a, b) => b.count - a.count);

	return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
	// Split the URL string by '/'
	const parts = url.split("/");

	// Extract the last part, which represents the customer ID
	const customerId = parts[parts.length - 1];

	return customerId;
}

export function encryptId(id: string) {
	return btoa(id);
}

export function decryptId(id: string) {
	return atob(id);
}

export const getTransactionStatus = (date: Date) => {
	const today = new Date();
	const twoDaysAgo = new Date(today);
	twoDaysAgo.setDate(today.getDate() - 2);

	return date > twoDaysAgo ? "En cours" : "Validée";
};

export const authFormSchema = (type: string) =>
	z.object({
		// sign-up only
		firstName:
			type === "sign-in"
				? z.string().optional()
				: z
						.string({ message: "Requis" })
						.min(3, { message: "Le prénom doit contenir au minimum 3 caractères" }),
		lastName:
			type === "sign-in"
				? z.string().optional()
				: z.string({ message: "Requis" }).min(3, { message: "Le nom doit contenir au minimum 3 caractères" }),
		address1:
			type === "sign-in"
				? z.string().optional()
				: z.string({ message: "Requis" }).max(50, { message: "L'adresse ne doit pas dépasser 50 caractères" }),
		city:
			type === "sign-in"
				? z.string().optional()
				: z
						.string({ message: "Requis" })
						.max(50, { message: "La localité ne doit pas dépasser 50 caractères" }),
		state:
			type === "sign-in"
				? z.string().optional()
				: z.string({ message: "Requis" }).max(50, { message: "La région ne doit pas dépasser 50 caractères" }),
		postalCode:
			type === "sign-in"
				? z.string().optional()
				: z
						.string({ message: "Requis" })
						.min(5, { message: "Le code postal doit contenir 5 chiffres" })
						.max(5, { message: "Le code postal doit contenir 5 chiffres" }),
		dateOfBirth:
			type === "sign-in"
				? z.string().optional()
				: z
						.string({ message: "Requis" })
						.min(8, { message: "La date de naissance est invalide" })
						.max(10, { message: "La date de naissance est invalide" }),
		ssn:
			type === "sign-in"
				? z.string().optional()
				: z
						.string({ message: "Requis" })
						.min(9, { message: "Le numéro de Sécurité Sociale doit contenir au moins 9 chiffres" })
						.max(15, { message: "Le numéro de Sécurité Sociale ne doit pas dépasser 15 chiffres" }),
		// sign-up and sign-in
		email: z.string({ message: "Requis" }).email({ message: "L'adresse e-mail est invalide" }),
		password: z
			.string({ message: "Requis" })
			.min(8, { message: "Le mot de passe doit contenir au minimum 8 caractères" })
	});
