"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";

import BankDropdown from "./BankDropdown";
import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
	email: z.string().email("Adresse email invalide"),
	name: z.string().optional(),
	amount: z.string().min(4, "Le montant est incorrect"),
	senderBank: z.string().min(4, "Veuillez sélectionner un compte bancaire valide"),
	shareableId: z.string().min(8, "Veuillez sélectionner un identifiant de compte bancaire valide")
});

function PaymentTransferForm({ accounts }: PaymentTransferFormProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			amount: "",
			senderBank: "",
			shareableId: ""
		}
	});

	const submit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true);

		try {
			const receiverAccountId = decryptId(data.shareableId);
			const receiverBank = await getBankByAccountId({
				accountId: receiverAccountId
			});
			const senderBank = await getBank({ documentId: data.senderBank });

			const transferParams = {
				sourceFundingSourceUrl: senderBank.fundingSourceUrl,
				destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
				amount: data.amount
			};
			// create transfer
			const transfer = await createTransfer(transferParams);

			// create transfer transaction
			if (transfer) {
				const transaction = {
					name: `Transfert de fonds: ${data?.name}`,
					amount: data.amount,
					senderId: senderBank.userId.$id,
					senderBankId: senderBank.$id,
					receiverId: receiverBank.userId.$id,
					receiverBankId: receiverBank.$id,
					email: data.email
				};

				const newTransaction = await createTransaction(transaction);

				if (newTransaction) {
					form.reset();
					router.push("/");
				}
			}
		} catch (error) {
			console.error("Submitting create transfer request failed: ", error);
		}

		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
				<FormField
					control={form.control}
					name="senderBank"
					render={() => (
						<FormItem className="border-t border-gray-200">
							<div className="payment-transfer_form-item pb-6 pt-5">
								<div className="payment-transfer_form-content">
									<FormLabel className="text-14 font-medium text-gray-700">
										Sélectionnez le compte bancaire émetteur
									</FormLabel>

									<FormDescription className="text-12 font-normal text-gray-600">
										Sélectionnez le compte bancaire à partir duquel vous souhaitez transférer des
										fonds
									</FormDescription>
								</div>

								<div className="flex w-full flex-col">
									<FormControl>
										<BankDropdown
											accounts={accounts}
											setValue={form.setValue}
											otherStyles="!w-full"
										/>
									</FormControl>

									<FormMessage className="text-12 text-red-500" />
								</div>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="border-t border-gray-200">
							<div className="payment-transfer_form-item pb-6 pt-5">
								<div className="payment-transfer_form-content">
									<FormLabel className="text-14 font-medium text-gray-700">
										Remarque supplémentaire (facultatif)
									</FormLabel>

									<FormDescription className="text-12 font-normal text-gray-600">
										Veuillez fournir toute information supplémentaire relative au transfert
									</FormDescription>
								</div>

								<div className="flex w-full flex-col">
									<FormControl>
										<Textarea
											placeholder="Rédigez une courte remarque ici"
											className="input-class"
											{...field}
										/>
									</FormControl>

									<FormMessage className="text-12 text-red-500" />
								</div>
							</div>
						</FormItem>
					)}
				/>

				<div className="payment-transfer_form-details">
					<h2 className="text-18 font-semibold text-gray-900">Informations du compte bancaire</h2>

					<p className="text-16 font-normal text-gray-600">
						Entrez les coordonnées bancaires du destinataire
					</p>
				</div>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="border-t border-gray-200">
							<div className="payment-transfer_form-item py-5">
								<FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
									Adresse e-mail du destinataire
								</FormLabel>

								<div className="flex w-full flex-col">
									<FormControl>
										<Input
											placeholder="ex: marceldupont@gmail.com"
											className="input-class"
											{...field}
										/>
									</FormControl>

									<FormMessage className="text-12 text-red-500" />
								</div>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="shareableId"
					render={({ field }) => (
						<FormItem className="border-t border-gray-200">
							<div className="payment-transfer_form-item pb-5 pt-6">
								<FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
									Identifiant du compte Plaid du destinataire
								</FormLabel>

								<div className="flex w-full flex-col">
									<FormControl>
										<Input
											placeholder="Entrez l'identifiant du compte"
											className="input-class"
											{...field}
										/>
									</FormControl>

									<FormMessage className="text-12 text-red-500" />
								</div>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem className="border-y border-gray-200">
							<div className="payment-transfer_form-item py-5">
								<FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
									Montant
								</FormLabel>

								<div className="flex w-full flex-col">
									<FormControl>
										<Input placeholder="ex: 5.00" className="input-class" {...field} />
									</FormControl>

									<FormMessage className="text-12 text-red-500" />
								</div>
							</div>
						</FormItem>
					)}
				/>

				<div className="payment-transfer_btn-box">
					<Button type="submit" className="payment-transfer_btn">
						{isLoading ? (
							<>
								<Loader2 size={20} className="animate-spin" /> &nbsp; Envoi en cours...
							</>
						) : (
							"Transférer des fonds"
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}

export default PaymentTransferForm;
