// Plaid test ID: good_user / good_password - Bank of America

export const sidebarLinks = [
	{
		imgURL: "/icons/home.svg",
		route: "/",
		label: "Accueil"
	},
	{
		imgURL: "/icons/dollar-circle.svg",
		route: "/my-banks",
		label: "Mes comptes bancaires"
	},
	{
		imgURL: "/icons/transaction.svg",
		route: "/transaction-history",
		label: "Historique des transactions"
	},
	{
		imgURL: "/icons/money-send.svg",
		route: "/payment-transfer",
		label: "Transférer des fonds"
	}
];

export const topCategoryStyles = {
	"Food and Drink": {
		bg: "bg-pink-25",
		circleBg: "bg-pink-100",
		text: {
			main: "text-pink-900",
			count: "text-pink-700"
		},
		progress: {
			bg: "bg-pink-100",
			indicator: "bg-pink-700"
		},
		icon: "/icons/shopping-bag.svg"
	},
	Payment: {
		bg: "bg-success-25",
		circleBg: "bg-success-100",
		text: {
			main: "text-success-900",
			count: "text-success-700"
		},
		progress: {
			bg: "bg-success-100",
			indicator: "bg-success-700"
		},
		icon: "/icons/dollar.svg"
	},
	"Bank Fees": {
		bg: "bg-success-25",
		circleBg: "bg-success-100",
		text: {
			main: "text-success-900",
			count: "text-success-700"
		},
		progress: {
			bg: "bg-success-100",
			indicator: "bg-success-700"
		},
		icon: "/icons/coins.svg"
	},
	Transfer: {
		bg: "bg-red-25",
		circleBg: "bg-red-100",
		text: {
			main: "text-red-900",
			count: "text-red-700"
		},
		progress: {
			bg: "bg-red-100",
			indicator: "bg-red-700"
		},
		icon: "/icons/bank-transfer.svg"
	},
	Travel: {
		bg: "bg-blue-25",
		circleBg: "bg-blue-100",
		text: {
			main: "text-blue-900",
			count: "text-blue-700"
		},
		progress: {
			bg: "bg-blue-100",
			indicator: "bg-blue-700"
		},
		icon: "/icons/travel.svg"
	},
	default: {
		bg: "bg-blue-25",
		circleBg: "bg-blue-100",
		text: {
			main: "text-blue-900",
			count: "text-blue-700"
		},
		progress: {
			bg: "bg-blue-100",
			indicator: "bg-blue-700"
		},
		icon: "/icons/monitor.svg"
	}
};

export const transactionCellNameStyles = {
	"Food and Drink": {
		borderColor: "border-pink-600",
		backgroundColor: "bg-pink-500",
		textColor: "text-pink-700",
		chipBackgroundColor: "bg-inherit"
	},
	Payment: {
		borderColor: "border-success-600",
		backgroundColor: "bg-green-600",
		textColor: "text-success-700",
		chipBackgroundColor: "bg-inherit"
	},
	"Bank Fees": {
		borderColor: "border-success-600",
		backgroundColor: "bg-green-600",
		textColor: "text-success-700",
		chipBackgroundColor: "bg-inherit"
	},
	Transfer: {
		borderColor: "border-red-700",
		backgroundColor: "bg-red-700",
		textColor: "text-red-700",
		chipBackgroundColor: "bg-inherit"
	},
	"En cours": {
		borderColor: "border-[#F2F4F7]",
		backgroundColor: "bg-gray-500",
		textColor: "text-[#344054]",
		chipBackgroundColor: "bg-[#F2F4F7]"
	},
	Validée: {
		borderColor: "border-[#12B76A]",
		backgroundColor: "bg-[#12B76A]",
		textColor: "text-[#027A48]",
		chipBackgroundColor: "bg-[#ECFDF3]"
	},
	Travel: {
		borderColor: "border-[#0047AB]",
		backgroundColor: "bg-blue-500",
		textColor: "text-blue-700",
		chipBackgroundColor: "bg-[#ECFDF3]"
	},
	default: {
		borderColor: "",
		backgroundColor: "bg-blue-500",
		textColor: "text-blue-700",
		chipBackgroundColor: "bg-inherit"
	}
};
