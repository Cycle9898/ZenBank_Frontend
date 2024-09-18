"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ accounts }: DoughnutChartProps) {
	const data = {
		datasets: [
			{
				label: "Banques",
				data: [1250, 2587, 4563],
				backgroundColor: ["#0747B6", "#2265D8", "#2F91FA"]
			}
		],
		labels: ["Banque 1", "Banque 2", "Banque 3"]
	};

	return (
		<Doughnut
			data={data}
			options={{
				cutout: "60%",
				plugins: {
					legend: {
						display: false
					}
				}
			}}
		/>
	);
}

export default DoughnutChart;
