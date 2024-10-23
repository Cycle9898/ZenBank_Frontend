"use client";

import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Footer from "./Footer";

function MobileNavBar({ user }: MobileNavProps) {
	const pathname = usePathname();

	return (
		<section className="max-w-[264px]">
			<Sheet>
				<SheetTrigger>
					<Image
						src="/icons/hamburger.svg"
						width={30}
						height={30}
						alt="Logo hamburger menu"
						className="cursor-pointer"
					/>
				</SheetTrigger>

				<SheetContent side="left" className="border-none bg-white">
					<Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
						<Image src="/icons/ZenBank_logo.png" width={34} height={34} alt="Logo ZenBank" />
						<h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">ZenBank</h1>
					</Link>

					<div className="mobile-nav-sheet">
						<SheetClose asChild>
							<nav className="h-full flex flex-col gap-6 pt-16 text-white">
								{sidebarLinks.map(navItem => {
									const isActive =
										pathname === navItem.route || pathname.startsWith(`${navItem.route}/`);

									return (
										<SheetClose asChild key={navItem.route}>
											<Link
												key={navItem.label}
												href={navItem.route}
												className={cn("mobile-nav-sheet_close", {
													"bg-bank-gradient": isActive
												})}>
												<Image
													src={navItem.imgURL}
													alt={navItem.label}
													width={20}
													height={20}
													className={cn({ "brightness-[3] invert-0": isActive })}
												/>

												<p
													className={cn("text-16 font-semibold text-black-2", {
														"!text-white": isActive
													})}>
													{navItem.label}
												</p>
											</Link>
										</SheetClose>
									);
								})}

								{/* TODO: add connect bank */}
							</nav>
						</SheetClose>

						<Footer user={user} type="mobile" />
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
}

export default MobileNavBar;
