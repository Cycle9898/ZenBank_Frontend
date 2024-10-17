import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

async function MyBanks() {
	const loggedIn = await getLoggedInUser();
	const accounts = await getAccounts({
		userId: loggedIn.$id
	});

	return (
		<section className="flex">
			<div className="my-banks">
				<HeaderBox title="Mes comptes bancaires" subtext="Gérez sans efforts vos activités bancaires" />

				<div className="space-y-4">
					<h2 className="header-2">Vos cartes bancaires</h2>

					<div className="flex flex-wrap gap-6">
						{accounts &&
							accounts.data.map((account: Account) => (
								<BankCard
									key={account.id}
									account={account}
									userName={`${loggedIn?.firstName} ${loggedIn?.lastName}`}
								/>
							))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default MyBanks;
