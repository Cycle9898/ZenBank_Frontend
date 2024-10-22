"use client";

import Image from "next/image";
import { cn, formatAmount, getAccountTypeColors } from "@/lib/utils";

function BankInfo({ account, appwriteItemId, type }: BankInfoProps) {
	const isActive = appwriteItemId === account?.appwriteItemId;

	const colors = getAccountTypeColors(account?.type as AccountTypes);

	return (
		<div
			className={cn(`bank-info ${colors.bg}`, {
				"shadow-sm border-blue-700": type === "card" && isActive,
				"rounded-xl": type === "card",
				"hover:shadow-sm cursor-pointer": type === "card"
			})}>
			<figure className={`flex-center h-fit rounded-full bg-blue-100 ${colors.lightBg}`}>
				<Image
					src="/icons/monitor.svg"
					width={20}
					height={20}
					alt="Logo de monitoring"
					className="m-2 min-w-5"
				/>
			</figure>
			<div className="flex w-full flex-1 flex-col justify-center gap-1">
				<div className="bank-info_content">
					<h2 className={`text-16 line-clamp-1 flex-1 font-bold text-blue-900 ${colors.title}`}>
						{account.name}
					</h2>
					{type === "full" && (
						<p
							className={`text-12 rounded-full px-3 py-1 font-medium text-blue-700 ${colors.subText} ${colors.lightBg}`}>
							{account.subtype}
						</p>
					)}
				</div>

				<p className={`text-16 font-medium text-blue-700 ${colors.subText}`}>
					{formatAmount(account.currentBalance)}
				</p>
			</div>
		</div>
	);
}

export default BankInfo;
