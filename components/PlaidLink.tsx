"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import Image from "next/image";

function PlaidLink({ user, variant }: PlaidLinkProps) {
	const router = useRouter();

	const [token, setToken] = useState<string>("");

	useEffect(() => {
		const getLinkToken = async () => {
			const data = await createLinkToken(user);

			setToken(data?.linkToken);
		};

		getLinkToken();
	}, [user]);

	const onSuccess = useCallback<PlaidLinkOnSuccess>(
		async (public_token: string) => {
			await exchangePublicToken({
				publicToken: public_token,
				user
			});

			router.push("/");
		},
		[user, router]
	);

	const config: PlaidLinkOptions = {
		token,
		onSuccess
	};

	const { open, ready } = usePlaidLink(config);

	return (
		<>
			{variant === "primary" ? (
				<Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
					Se connecter à ma banque
				</Button>
			) : variant === "ghost" ? (
				<Button onClick={() => open()} variant="ghost" className="plaidlink-ghost">
					<Image src="/icons/connect-bank.svg" alt="Logo liaison compte bancaire" width={24} height={24} />
					<p className="hidden xl:block text-[16px] font-semibold text-black-2">Lier un compte bancaire</p>
				</Button>
			) : variant === "compact" ? (
				<Button onClick={() => open()} className="flex gap-2 p-0">
					<Image src="/icons/plus.svg" width={20} height={20} alt="Logo plus" />
					<p className="text-14 font-semibold text-gray-600">Ajouter un compte</p>
				</Button>
			) : (
				<Button onClick={() => open()} className="plaidlink-default">
					<Image src="/icons/connect-bank.svg" alt="Logo liaison compte bancaire" width={24} height={24} />
					<p className="text-[16px] font-semibold text-black-2 max-xl:hidden">Lier un compte bancaire</p>
				</Button>
			)}
		</>
	);
}

export default PlaidLink;
