import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";

function Home() {
	const loggedIn = { firstName: "testUser" };

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
			</div>
		</section>
	);
}

export default Home;
