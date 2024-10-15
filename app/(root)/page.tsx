import HeaderBox from "@/components/HeaderBox";
import HomeRightSidebar from "@/components/HomeRightSidebar";
import RecentTransaction from "@/components/RecentTransaction";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

async function Home({ searchParams: { id, page } }: SearchParamProps) {
	const currentPage = Number(page) || 1;
	const loggedIn = await getLoggedInUser();
	const accounts = await getAccounts({ userId: loggedIn.$id });

	if (!accounts) return;

	const accountsData = accounts?.data;
	const appwriteItemId = id || accountsData[0]?.appwriteItemId;

	const account = await getAccount({ appwriteItemId });

	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Bienvenue"
						user={`${loggedIn?.firstName} ${loggedIn?.lastName}` || "Guest"}
						subtext="Accédez et gérez vos comptes ou vos transactions efficacement."
					/>

					<TotalBalanceBox
						accounts={accountsData}
						totalBanks={accounts?.totalBanks}
						totalCurrentBalance={accounts?.totalCurrentBalance}
					/>
				</header>

				<RecentTransaction
					accounts={accountsData}
					transactions={account?.transactions}
					appwriteItemId={appwriteItemId}
					page={currentPage}
				/>
			</div>

			<HomeRightSidebar user={loggedIn} transactions={accounts?.transactions} banks={accountsData?.slice(0, 2)} />
		</section>
	);
}

export default Home;
