import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transactionCellNameStyles } from "@/constants";
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils";

const StyledBadge = ({ cellContent }: StyledBadgeProps) => {
	type CellContentType = keyof typeof transactionCellNameStyles;

	const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
		transactionCellNameStyles[cellContent as CellContentType] || transactionCellNameStyles.default;

	return (
		<div className={cn("styled-badge", borderColor, chipBackgroundColor)}>
			<div className={cn("size-2 rounded-full", backgroundColor)} />
			<p className={cn("text-[12px] font-medium", textColor)}>{cellContent}</p>
		</div>
	);
};

function TransactionsTable({ transactions }: TransactionTableProps) {
	return (
		<Table>
			<TableHeader className="bg-[#f9fafb]">
				<TableRow>
					<TableHead className="px-2">Transaction</TableHead>
					<TableHead className="px-2">Montant</TableHead>
					<TableHead className="px-2">Statut</TableHead>
					<TableHead className="px-2">Date</TableHead>
					<TableHead className="px-2 max-md:hidden">Type</TableHead>
					<TableHead className="px-2 max-md:hidden">Catégorie</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{transactions.length ? (
					transactions.map((transaction: Transaction) => {
						const status = getTransactionStatus(new Date(transaction.date));
						const amount = formatAmount(transaction.amount);

						const isDebit = transaction.type === "debit";

						return (
							<TableRow
								key={transaction.id}
								className={`${
									isDebit || amount[0] === "-" ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"
								} hover:bg-transparent !border-b-DEFAULT`}>
								<TableCell className="max-w-[250px] pl-2 pr-10">
									<div className="flex items-center gap-3">
										<h1
											className="text-14 truncate font-semibold text-[#344054]"
											title={transaction.name}>
											{removeSpecialCharacters(transaction.name)}
										</h1>
									</div>
								</TableCell>

								<TableCell
									className={`pl-2 pr-10 font-semibold ${
										isDebit || amount[0] === "-" ? "text-[#F04438]" : "text-[#039855]"
									}`}>
									{isDebit ? `-${amount}` : amount}
								</TableCell>

								<TableCell className="pl-2 pr-10">
									<StyledBadge cellContent={status} />
								</TableCell>

								<TableCell className="min-w-32 pl-2 pr-10">
									{formatDateTime(new Date(transaction.date)).dateTime}
								</TableCell>

								<TableCell className="pl-2 pr-10 capitalize min-w-24 max-md:hidden">
									{transaction.paymentChannel}
								</TableCell>

								<TableCell className="pl-2 pr-10 max-md:hidden">
									<StyledBadge cellContent={transaction.category} />
								</TableCell>
							</TableRow>
						);
					})
				) : (
					<TableRow>
						<TableCell colSpan={6} className="text-center">
							Aucune transaction trouvée
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

export default TransactionsTable;
