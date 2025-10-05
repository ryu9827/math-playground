import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { translations } from '../utils/i18n'
import { soundEffects } from '../utils/soundEffects'
import '../styles/GoalAchievedAnimation.scss'

interface GoalAchievedAnimationProps {
	show: boolean
	onComplete: () => void
}

// 可爱的小动物 emoji
const animals = [
	'🐰',
	'🦊',
	'🐱',
	'🐶',
	'🐼',
	'🐨',
	'🐹',
	'🦄',
	'🐻',
	'🦁',
	'🐯',
	'🐸',
	'🐷',
	'🐮',
	'🐔',
	'🦆',
	'🦉',
	'🐝',
	'🦋',
	'🐞',
]

export const GoalAchievedAnimation: React.FC<GoalAchievedAnimationProps> = ({
	show,
	onComplete,
}) => {
	const { soundEnabled, language } = useSelector(
		(state: RootState) => state.settings
	)
	const t = translations[language]
	const onCompleteRef = useRef(onComplete)

	useEffect(() => {
		onCompleteRef.current = onComplete
	}, [onComplete])

	useEffect(() => {
		if (show) {
			// 播放庆祝音效
			if (soundEnabled) {
				soundEffects.playRandomCelebration()
			}

			// 20秒后自动关闭
			const timer = setTimeout(() => {
				onCompleteRef.current()
			}, 20000)

			return () => clearTimeout(timer)
		}
	}, [show, soundEnabled])

	if (!show) return null

	// 生成随机动物
	const randomAnimals = Array.from({ length: 30 }, () => {
		const animal = animals[Math.floor(Math.random() * animals.length)]
		const startX = Math.random() * 100
		const endX = Math.random() * 100
		const startY = Math.random() * 100
		const duration = 8 + Math.random() * 12 // 8-20秒
		const delay = Math.random() * 5 // 0-5秒延迟

		return { animal, startX, endX, startY, duration, delay }
	})

	// 生成烟花粒子
	const fireworks = Array.from({ length: 50 }, (_, i) => {
		const x = (i % 10) * 10 + 5
		const y = Math.floor(i / 10) * 20 + 10
		const delay = Math.random() * 18

		return { x, y, delay }
	})

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className='goal-achieved-overlay'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{/* 背景遮罩 */}
					<div className='goal-achieved-backdrop' />

					{/* 中心文字 */}
					<motion.div
						className='goal-achieved-center'
						initial={{ scale: 0, rotate: -180 }}
						animate={{
							scale: [0, 1.2, 1, 1.1, 1],
							rotate: [0, 360],
						}}
						transition={{ duration: 2, ease: 'easeOut' }}
					>
						<div className='goal-trophy'>🏆</div>
						<motion.h1
							className='goal-title'
							animate={{
								scale: [1, 1.05, 1],
								textShadow: [
									'0 0 20px rgba(255, 215, 0, 0.8)',
									'0 0 40px rgba(255, 215, 0, 1)',
									'0 0 20px rgba(255, 215, 0, 0.8)',
								],
							}}
							transition={{ duration: 2, repeat: Infinity }}
						>
							{t.goalAchieved}
						</motion.h1>
						<p className='goal-subtitle'>{t.goalAchievedMessage} 🎉</p>
						<motion.div
							className='goal-stars'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}
						>
							⭐ ⭐ ⭐
						</motion.div>
					</motion.div>

					{/* 飘动的小动物 */}
					{randomAnimals.map((item, index) => (
						<motion.div
							key={`animal-${index}`}
							className='floating-animal'
							initial={{
								x: `${item.startX}vw`,
								y: `${item.startY}vh`,
								opacity: 0,
								scale: 0,
							}}
							animate={{
								x: `${item.endX}vw`,
								y: [
									`${item.startY}vh`,
									`${item.startY - 20}vh`,
									`${item.startY}vh`,
									`${item.startY - 15}vh`,
									`${item.startY + 10}vh`,
								],
								opacity: [0, 1, 1, 1, 0],
								scale: [0, 1.5, 1.2, 1, 0.8],
								rotate: [0, 360, 720],
							}}
							transition={{
								duration: item.duration,
								delay: item.delay,
								ease: 'easeInOut',
							}}
						>
							{item.animal}
						</motion.div>
					))}

					{/* 全屏烟花效果 */}
					{fireworks.map((fw, index) => (
						<motion.div
							key={`firework-${index}`}
							className='firework'
							style={{
								left: `${fw.x}%`,
								top: `${fw.y}%`,
							}}
							initial={{ opacity: 0, scale: 0 }}
							animate={{
								opacity: [0, 1, 1, 0],
								scale: [0, 1.5, 2, 0],
							}}
							transition={{
								duration: 2,
								delay: fw.delay,
								repeat: Infinity,
								repeatDelay: 1,
							}}
						>
							{/* 烟花爆炸粒子 */}
							{Array.from({ length: 12 }).map((_, i) => (
								<motion.div
									key={i}
									className='firework-particle'
									initial={{ x: 0, y: 0, opacity: 1 }}
									animate={{
										x: Math.cos((i * 30 * Math.PI) / 180) * 100,
										y: Math.sin((i * 30 * Math.PI) / 180) * 100,
										opacity: 0,
									}}
									transition={{
										duration: 1.5,
										delay: fw.delay,
										repeat: Infinity,
										repeatDelay: 3,
									}}
								/>
							))}
						</motion.div>
					))}

					{/* 彩带飘落 */}
					{Array.from({ length: 100 }).map((_, i) => {
						const colors = [
							'#FFD700',
							'#FF6B6B',
							'#4ECDC4',
							'#45B7D1',
							'#FFA07A',
							'#98D8C8',
						]
						const color = colors[Math.floor(Math.random() * colors.length)]
						const x = Math.random() * 100
						const duration = 8 + Math.random() * 12
						const delay = Math.random() * 5

						return (
							<motion.div
								key={`confetti-${i}`}
								className='confetti'
								style={{ backgroundColor: color }}
								initial={{
									x: `${x}vw`,
									y: '-10vh',
									opacity: 0,
									rotate: 0,
								}}
								animate={{
									y: '110vh',
									opacity: [0, 1, 1, 0],
									rotate: [0, 360, 720, 1080],
								}}
								transition={{
									duration: duration,
									delay: delay,
									ease: 'linear',
									repeat: Infinity,
								}}
							/>
						)
					})}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
