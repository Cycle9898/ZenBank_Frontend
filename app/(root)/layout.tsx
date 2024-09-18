import MobileNavBar from "@/components/MobileNavBar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const loggedIn = { firstName: "Test", lastName: "User" };

	return (
		<main className="flex h-screen w-full font-inter">
			<Sidebar user={loggedIn} />

			<div className="flex size-full flex-col">
				<div className="root-layout">
					<Image src="/icons/ZenBank_logo.png" width={30} height={30} alt="ZenBank logo" />

					<MobileNavBar user={loggedIn} />
				</div>

				{children}
			</div>
		</main>
	);
}
