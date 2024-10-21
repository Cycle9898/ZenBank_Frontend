import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

async function PaymentTransfer() {
	const loggedIn = await getLoggedInUser();
	const accounts = await getAccounts({ userId: loggedIn.$id });

	if (!accounts) return;

	const accountsData = accounts?.data;

	return (
		<section className="payment-transfer">
			<HeaderBox
				title="Transférer des fonds"
				subtext="Veuillez fournir les détails concernant le transfert de fonds."
			/>

			<div className="size-full pt-10">
				<PaymentTransferForm accounts={accountsData} />
			</div>
		</section>
	);
}

export default PaymentTransfer;
