import React from 'react'

interface FlagProps {
	width?: number
	height?: number
}

export const ChinaFlag: React.FC<FlagProps> = ({ width = 32, height = 24 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 900 600'
			width={width}
			height={height}
		>
			<rect width='900' height='600' fill='#de2910' />
			<g fill='#ffde00'>
				{/* Large star */}
				<path
					d='M150,150 L186.18,190.08 L241.48,178.53 L209.07,221.47 L236.18,269.92 L180.00,258.21 L150,300 L119.82,258.21 L63.82,269.92 L90.93,221.47 L58.52,178.53 L113.82,190.08 Z'
					transform='translate(0, 0)'
				/>
				{/* Small stars */}
				<path
					d='M0,0 L7.36,9.51 L19.02,7.76 L12.72,17.28 L20.82,26.24 L9.00,24.41 L0,33 L-9.00,24.41 L-20.82,26.24 L-12.72,17.28 L-19.02,7.76 L-7.36,9.51 Z'
					transform='translate(300, 60)'
				/>
				<path
					d='M0,0 L7.36,9.51 L19.02,7.76 L12.72,17.28 L20.82,26.24 L9.00,24.41 L0,33 L-9.00,24.41 L-20.82,26.24 L-12.72,17.28 L-19.02,7.76 L-7.36,9.51 Z'
					transform='translate(330, 120) rotate(23.5 0 0)'
				/>
				<path
					d='M0,0 L7.36,9.51 L19.02,7.76 L12.72,17.28 L20.82,26.24 L9.00,24.41 L0,33 L-9.00,24.41 L-20.82,26.24 L-12.72,17.28 L-19.02,7.76 L-7.36,9.51 Z'
					transform='translate(300, 180) rotate(48 0 0)'
				/>
				<path
					d='M0,0 L7.36,9.51 L19.02,7.76 L12.72,17.28 L20.82,26.24 L9.00,24.41 L0,33 L-9.00,24.41 L-20.82,26.24 L-12.72,17.28 L-19.02,7.76 L-7.36,9.51 Z'
					transform='translate(240, 210) rotate(70 0 0)'
				/>
			</g>
		</svg>
	)
}
