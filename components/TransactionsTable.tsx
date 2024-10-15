import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils";

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
							<TableRow key={transaction.id}>
								<TableCell>
									<div>
										<h1>{removeSpecialCharacters(transaction.name)}</h1>
									</div>
								</TableCell>

								<TableCell>{isDebit ? `-${amount}` : amount}</TableCell>

								<TableCell>{status}</TableCell>

								<TableCell>{formatDateTime(new Date(transaction.date)).dateTime}</TableCell>

								<TableCell>{transaction.paymentChannel}</TableCell>

								<TableCell>{transaction.category}</TableCell>
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
