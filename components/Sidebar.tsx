"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

function Sidebar({ user }: SiderbarProps) {
	const pathname = usePathname();

	return (
		<section className="sidebar">
			<nav className="flex flex-col gap-4">
				<Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
					<Image
						src="/icons/ZenBank_logo.png"
						width={34}
						height={34}
						alt="Logo ZenBank"
						className="size-[24px] max-xl:size-14"
					/>
					<h1 className="sidebar-logo">ZenBank</h1>
				</Link>

				{sidebarLinks.map(navItem => {
					const isActive = pathname === navItem.route || pathname.startsWith(`${navItem.route}/`);

					return (
						<Link
							key={navItem.label}
							href={navItem.route}
							className={cn("sidebar-link", { "bg-bank-gradient": isActive })}>
							<div className="relative size-6">
								<Image
									src={navItem.imgURL}
									alt={navItem.label}
									fill
									className={cn({ "brightness-[3] invert-0": isActive })}
								/>
							</div>

							<p className={cn("sidebar-label", { "!text-white": isActive })}>{navItem.label}</p>
						</Link>
					);
				})}

				<PlaidLink user={user} />
			</nav>

			<Footer user={user} />
		</section>
	);
}

export default Sidebar;
