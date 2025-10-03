import React from 'react'

interface FlagProps {
	width?: number
	height?: number
}

export const USAFlag: React.FC<FlagProps> = ({ width = 32, height = 24 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 1140 600'
			width={width}
			height={height}
		>
			<rect width='1140' height='600' fill='#b22234' />
			<g fill='white'>
				<rect y='46.15' width='1140' height='46.15' />
				<rect y='138.46' width='1140' height='46.15' />
				<rect y='230.77' width='1140' height='46.15' />
				<rect y='323.08' width='1140' height='46.15' />
				<rect y='415.38' width='1140' height='46.15' />
				<rect y='507.69' width='1140' height='46.15' />
			</g>
			<rect width='456' height='323.08' fill='#3c3b6e' />
			<g fill='white'>
				{/* 50 stars arranged in alternating rows of 6 and 5 */}
				{/* Row 1 - 6 stars */}
				<circle cx='38' cy='27' r='13' />
				<circle cx='114' cy='27' r='13' />
				<circle cx='190' cy='27' r='13' />
				<circle cx='266' cy='27' r='13' />
				<circle cx='342' cy='27' r='13' />
				<circle cx='418' cy='27' r='13' />
				{/* Row 2 - 5 stars */}
				<circle cx='76' cy='67' r='13' />
				<circle cx='152' cy='67' r='13' />
				<circle cx='228' cy='67' r='13' />
				<circle cx='304' cy='67' r='13' />
				<circle cx='380' cy='67' r='13' />
				{/* Row 3 - 6 stars */}
				<circle cx='38' cy='107' r='13' />
				<circle cx='114' cy='107' r='13' />
				<circle cx='190' cy='107' r='13' />
				<circle cx='266' cy='107' r='13' />
				<circle cx='342' cy='107' r='13' />
				<circle cx='418' cy='107' r='13' />
				{/* Row 4 - 5 stars */}
				<circle cx='76' cy='147' r='13' />
				<circle cx='152' cy='147' r='13' />
				<circle cx='228' cy='147' r='13' />
				<circle cx='304' cy='147' r='13' />
				<circle cx='380' cy='147' r='13' />
				{/* Row 5 - 6 stars */}
				<circle cx='38' cy='187' r='13' />
				<circle cx='114' cy='187' r='13' />
				<circle cx='190' cy='187' r='13' />
				<circle cx='266' cy='187' r='13' />
				<circle cx='342' cy='187' r='13' />
				<circle cx='418' cy='187' r='13' />
				{/* Row 6 - 5 stars */}
				<circle cx='76' cy='227' r='13' />
				<circle cx='152' cy='227' r='13' />
				<circle cx='228' cy='227' r='13' />
				<circle cx='304' cy='227' r='13' />
				<circle cx='380' cy='227' r='13' />
				{/* Row 7 - 6 stars */}
				<circle cx='38' cy='267' r='13' />
				<circle cx='114' cy='267' r='13' />
				<circle cx='190' cy='267' r='13' />
				<circle cx='266' cy='267' r='13' />
				<circle cx='342' cy='267' r='13' />
				<circle cx='418' cy='267' r='13' />
				{/* Row 8 - 5 stars */}
				<circle cx='76' cy='307' r='13' />
				<circle cx='152' cy='307' r='13' />
				<circle cx='228' cy='307' r='13' />
				<circle cx='304' cy='307' r='13' />
				<circle cx='380' cy='307' r='13' />
			</g>
		</svg>
	)
}
