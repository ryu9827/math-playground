import React from 'react'

interface RabbitProps {
	width?: number
	height?: number
}

export const ChineseRabbit: React.FC<RabbitProps> = ({
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
			{/* 中国风小兔子 - 红色主题 */}
			{/* 左耳 */}
			<ellipse
				cx='22'
				cy='18'
				rx='6'
				ry='16'
				fill='#FFB6C1'
				transform='rotate(-15 22 18)'
			/>
			<ellipse
				cx='22'
				cy='18'
				rx='3'
				ry='12'
				fill='#FF69B4'
				transform='rotate(-15 22 18)'
			/>
			{/* 右耳 */}
			<ellipse
				cx='42'
				cy='18'
				rx='6'
				ry='16'
				fill='#FFB6C1'
				transform='rotate(15 42 18)'
			/>
			<ellipse
				cx='42'
				cy='18'
				rx='3'
				ry='12'
				fill='#FF69B4'
				transform='rotate(15 42 18)'
			/>
			{/* 头部 */}
			<circle cx='32' cy='36' r='18' fill='#FFE4E1' />
			{/* 左眼 */}
			<circle cx='26' cy='34' r='3' fill='#8B4513' />
			<circle cx='27' cy='33' r='1' fill='white' />
			{/* 右眼 */}
			<circle cx='38' cy='34' r='3' fill='#8B4513' />
			<circle cx='39' cy='33' r='1' fill='white' />
			{/* 鼻子 */}
			<ellipse cx='32' cy='40' rx='2' ry='1.5' fill='#FF69B4' />
			{/* 嘴巴 */}
			<path
				d='M 32 40 Q 28 43 26 42'
				stroke='#FF69B4'
				strokeWidth='1.5'
				fill='none'
				strokeLinecap='round'
			/>
			<path
				d='M 32 40 Q 36 43 38 42'
				stroke='#FF69B4'
				strokeWidth='1.5'
				fill='none'
				strokeLinecap='round'
			/>
			{/* 腮红 */}
			<ellipse cx='22' cy='40' rx='4' ry='3' fill='#FFB6C1' opacity='0.5' />
			<ellipse cx='42' cy='40' rx='4' ry='3' fill='#FFB6C1' opacity='0.5' />
			{/* 中国结装饰 */}
			<circle cx='50' cy='32' r='3' fill='#DC143C' />
			<circle cx='50' cy='38' r='2' fill='#DC143C' />
			<line
				x1='50'
				y1='35'
				x2='50'
				y2='36'
				stroke='#FFD700'
				strokeWidth='1'
			/>
		</svg>
	)
}
