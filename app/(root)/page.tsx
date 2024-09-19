import HeaderBox from "@/components/HeaderBox";
import HomeRightSidebar from "@/components/HomeRightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

function Home() {
	const loggedIn = { firstName: "test", lastName: "User", email: "test.user@fake.com" };

	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Bienvenue"
						user={loggedIn.firstName || "Guest"}
						subtext="Accédez et gérez votre compte ou vos transactions efficacement."
					/>

					<TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.35} />
				</header>

				{/* TODO: add recent transactions */}
			</div>

			<HomeRightSidebar
				user={loggedIn}
				transactions={[]}
				banks={[{ currentBalance: 1234.5 }, { currentBalance: 305.5 }]}
			/>
		</section>
	);
}

export default Home;
