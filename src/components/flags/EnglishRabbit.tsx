import React from 'react'

interface RabbitProps {
	width?: number
	height?: number
}

export const EnglishRabbit: React.FC<RabbitProps> = ({
	width = 48,
	height = 48,
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 64 64'
			fill='none'
		>
			{/* 英式小兔子 - 蓝色主题 */}
			{/* 左耳 */}
			<ellipse
				cx='22'
				cy='18'
				rx='6'
				ry='16'
				fill='#B0E0E6'
				transform='rotate(-15 22 18)'
			/>
			<ellipse
				cx='22'
				cy='18'
				rx='3'
				ry='12'
				fill='#87CEEB'
				transform='rotate(-15 22 18)'
			/>
			{/* 右耳 */}
			<ellipse
				cx='42'
				cy='18'
				rx='6'
				ry='16'
				fill='#B0E0E6'
				transform='rotate(15 42 18)'
			/>
			<ellipse
				cx='42'
				cy='18'
				rx='3'
				ry='12'
				fill='#87CEEB'
				transform='rotate(15 42 18)'
			/>
			{/* 头部 */}
			<circle cx='32' cy='36' r='18' fill='#E6F3FF' />
			{/* 左眼 */}
			<circle cx='26' cy='34' r='3' fill='#4169E1' />
			<circle cx='27' cy='33' r='1' fill='white' />
			{/* 右眼 */}
			<circle cx='38' cy='34' r='3' fill='#4169E1' />
			<circle cx='39' cy='33' r='1' fill='white' />
			{/* 鼻子 */}
			<ellipse cx='32' cy='40' rx='2' ry='1.5' fill='#4682B4' />
			{/* 嘴巴 */}
			<path
				d='M 32 40 Q 28 43 26 42'
				stroke='#4682B4'
				strokeWidth='1.5'
				fill='none'
				strokeLinecap='round'
			/>
			<path
				d='M 32 40 Q 36 43 38 42'
				stroke='#4682B4'
				strokeWidth='1.5'
				fill='none'
				strokeLinecap='round'
			/>
			{/* 腮红 */}
			<ellipse cx='22' cy='40' rx='4' ry='3' fill='#ADD8E6' opacity='0.5' />
			<ellipse cx='42' cy='40' rx='4' ry='3' fill='#ADD8E6' opacity='0.5' />
			{/* 绅士帽装饰 */}
			<rect x='26' y='16' width='12' height='4' rx='2' fill='#4169E1' />
			<ellipse cx='32' cy='20' rx='8' ry='2' fill='#4169E1' />
		</svg>
	)
}
