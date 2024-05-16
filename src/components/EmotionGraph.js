import React from "react";
import { ResponsivePie } from "@nivo/pie";
// import { useSelector } from "react-redux";

export default function EmotionGraph({ width, height, data }) {
	let colors = [
		"#f2d665",
		"#89d8aa",
		"#6ba3d8",
		"#f35b59",
		"#7fccde",
		"#e3aedd",
	];

	//const data = useSelector((state) => state.allEmotionData);
	console.log(data);

	return (
		<div
			style={{
				width: `${width}px`,
				height: `${height}px`,
				margin: "0 auto",
			}}
		>
			{data && (
				<ResponsivePie
					data={data}
					margin={{ top: 40, right: 80, bottom: 80, left: 60 }}
					innerRadius={0.3}
					padAngle={0.7}
					cornerRadius={3}
					activeOuterRadiusOffset={8}
					borderWidth={1}
					borderColor={{
						from: "color",
						modifiers: [["darker", 0.2]],
					}}
					colors={colors}
					enableArcLabels={false}
					enableArcLinkLabels={false}
					legends={[
						{
							anchor: "right",
							direction: "column",
							justify: false,
							translateX: 56,
							translateY: 0,
							itemsSpacing: 20,
							itemWidth: 100,
							itemHeight: 18,
							itemDirection: "left-to-right",
							itemOpacity: 1,
							symbolSize: 18,
							symbolShape: "circle",
							text: {
								fontSize: 12,
								fill: "#000000",
							},
						},
					]}
				/>
			)}
		</div>
	);
}
