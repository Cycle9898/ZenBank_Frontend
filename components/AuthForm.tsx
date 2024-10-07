"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

function AuthForm({ type }: AuthFormProps) {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const formSchema = authFormSchema(type);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true);

		try {
			if (type === "sign-up") {
				const shortenedSsn = data.ssn?.slice(0, 9);

				const userData = {
					firstName: data.firstName!,
					lastName: data.lastName!,
					address1: data.address1!,
					city: data.city!,
					state: "CA",
					postalCode: data.postalCode!,
					dateOfBirth: data.dateOfBirth!,
					ssn: shortenedSsn!,
					email: data.email,
					password: data.password
				};

				const newUser = await signUp(userData);

				setUser(newUser);
			}

			if (type === "sign-in") {
				const response = await signIn({
					email: data.email,
					password: data.password
				});

				if (response) router.push("/");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Link href="/" className="cursor-pointer flex items-center gap-1">
					<Image src="/icons/ZenBank_logo.png" width={34} height={34} alt="ZenBank logo" />

					<h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">ZenBank</h1>
				</Link>

				<div className="flex flex-col gap-1 md:gap-3">
					<h1 className="text-24 lg:text-36 font-semibold text-gray-900">
						{user ? "Lier un compte bancaire" : type === "sign-in" ? "Se connecter" : "S'inscrire"}
						<span className="block text-16 font-normal text-gray-600">
							{user
								? "Associez votre compte bancaire pour commencer"
								: "Veuillez entrer vos informations"}
						</span>
					</h1>
				</div>
			</header>

			{user ? (
				<div className="flex flex-col gap-4">
					<PlaidLink user={user} variant="primary" />
				</div>
			) : (
				<>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{type === "sign-up" && (
								<>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="firstName"
											label="Prénom"
											placeholder="Renseignez votre prénom"
										/>

										<CustomInput
											control={form.control}
											name="lastName"
											label="Nom"
											placeholder="Renseignez votre nom"
										/>
									</div>

									<CustomInput
										control={form.control}
										name="address1"
										label="Adresse"
										placeholder="Renseignez votre adresse"
									/>

									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="postalCode"
											label="Code postal"
											placeholder="Ex: 75000"
										/>

										<CustomInput
											control={form.control}
											name="city"
											label="Localité"
											placeholder="Ex: Paris"
										/>
									</div>

									<CustomInput
										control={form.control}
										name="state"
										label="Région"
										placeholder="Renseignez votre région"
									/>

									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="dateOfBirth"
											label="Date de naissance"
											placeholder="JJ/MM/AAAA"
											inputType="date"
										/>

										<CustomInput
											control={form.control}
											name="ssn"
											label="Numéro de Sécurité Sociale"
											placeholder="1234567890123"
										/>
									</div>
								</>
							)}

							<CustomInput
								control={form.control}
								name="email"
								label="Adresse e-mail"
								placeholder="Renseignez votre adresse e-mail"
								inputType="email"
							/>

							<CustomInput
								control={form.control}
								name="password"
								label="Mot de passe"
								placeholder="Renseignez votre mot de passe"
								inputType="password"
							/>

							<div className="flex flex-col gap-5">
								<Button type="submit" disabled={isLoading} className="form-btn">
									{isLoading ? (
										<>
											<Loader2 size={20} className="animate-spin" />
											&nbsp;Chargement...
										</>
									) : type === "sign-in" ? (
										"Se connecter"
									) : (
										"S'inscrire"
									)}
								</Button>
							</div>
						</form>
					</Form>

					<footer className="flex justify-center gap-1">
						{type === "sign-in" ? (
							<>
								<p className="text-14 font-normal text-gray-600">Vous n&apos;avez pas de compte ?</p>
								<Link href="/sign-up" className="form-link">
									S&apos;inscrire
								</Link>
							</>
						) : (
							<>
								<p className="text-14 font-normal text-gray-600">Vous avez déjà un compte ?</p>
								<Link href="/sign-in" className="form-link">
									Se connecter
								</Link>
							</>
						)}
					</footer>
				</>
			)}
		</section>
	);
}

export default AuthForm;
