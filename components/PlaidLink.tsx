import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";

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
				<Button>Se connecter à ma banque</Button>
			) : (
				<Button>Se connecter à ma banque</Button>
			)}
		</>
	);
}

export default PlaidLink;
