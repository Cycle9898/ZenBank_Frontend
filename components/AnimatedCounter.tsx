"use client";

import CountUp from "react-countup";

function AnimatedCounter({ amount }: { amount: number }) {
	return (
		<div className="w-full">
			<CountUp decimal="," separator=" " decimals={2} prefix="€" end={amount} />
		</div>
	);
}

export default AnimatedCounter;
