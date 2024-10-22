"use client";

import { formatAmount, formUrlQuery } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";

function BankDropdown({ accounts = [], setValue, otherStyles }: BankDropdownProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [selected, setSelected] = useState<Account>(accounts[0]);

	const handleBankChange = (id: string) => {
		const account = accounts.find(account => account.appwriteItemId === id)!;

		setSelected(account);

		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: "id",
			value: id
		});
		router.push(newUrl, { scroll: false });
	};

	useEffect(() => {
		if (setValue) {
			setValue("senderBank", selected.appwriteItemId);
		}
	}, [selected.appwriteItemId, setValue]);

	return (
		<Select defaultValue={selected?.appwriteItemId} onValueChange={value => handleBankChange(value)}>
			<SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
				<Image src="icons/credit-card.svg" width={20} height={20} alt="account" />
				<p className="line-clamp-1 w-full text-left">{selected?.name}</p>
			</SelectTrigger>

			<SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
				<SelectGroup>
					<SelectLabel className="py-2 font-normal text-gray-500">
						Sélectionnez un compte bancaire
					</SelectLabel>

					{accounts.map((account: Account) => (
						<SelectItem key={account.id} value={account.appwriteItemId} className="cursor-pointer border-t">
							<div className="flex flex-col ">
								<p className="text-16 font-medium">{account.name}</p>

								<p className="text-14 font-medium text-blue-600">
									{formatAmount(account.currentBalance)}
								</p>
							</div>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export default BankDropdown;
