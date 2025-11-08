import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { soundEffects } from '../utils/soundEffects'
import '../styles/MilestoneReward.scss'

interface MilestoneRewardProps {
	isOpen: boolean
	onClose: () => void
	milestone: number
	milestoneCount: number
	language: 'zh' | 'en'
}

// 可爱的小动物 emoji（与 GoalAchievedAnimation 保持一致）
const animals = [
	'🐰',
	'🦊',
	'🐱',
	'🐶',
	'🐼',
	'🐨',
	'🐹',
	'🦄',
	'�',
	'🦁',
	'🐯',
	'🐸',
	'🐷',
	'🐮',
	'�',
	'🦆',
	'🦉',
	'🐝',
	'🦋',
	'🐞',
]

// 奖杯样式（不同的emoji）
export const trophyEmojis = [
	'🏆', // L0
	'🥇', // L1
	'🎖️', // L2
	'👑', // L3
	'⭐', // L4
	'💎', // L5
	'🌟', // L6
	'✨', // L7
	'🎯', // L8
	'🔥', // L9
	'💪', // L10
	'🚀', // L11
]
// 祝贺文字（中文）
const congratulationsZh = [
	'太棒了！',
	'真厉害！',
	'好样的！',
	'了不起！',
	'继续加油！',
	'势不可挡！',
	'无与伦比！',
	'卓越表现！',
	'令人惊叹！',
	'出类拔萃！',
]

// 祝贺文字（英文）
const congratulationsEn = [
	'Amazing!',
	'Fantastic!',
	'Excellent!',
	'Outstanding!',
	'Keep Going!',
	'Unstoppable!',
	'Incredible!',
	'Phenomenal!',
	'Brilliant!',
	'Remarkable!',
]

export const MilestoneReward: React.FC<MilestoneRewardProps> = ({
	isOpen,
	onClose,
	milestone,
	milestoneCount,
	language,
}) => {
	const { soundEnabled } = useSelector((state: RootState) => state.settings)
	const [trophy, setTrophy] = useState('🏆')
	const [trophyIndex, setTrophyIndex] = useState(0)
	const [congratulation, setCongratulation] = useState('')
	const onCloseRef = useRef(onClose)

	useEffect(() => {
		onCloseRef.current = onClose
	}, [onClose])

	useEffect(() => {
		if (isOpen) {
			// 随机选择奖杯
			const randomIndex = Math.floor(Math.random() * trophyEmojis.length)
			const randomTrophy = trophyEmojis[randomIndex]
			setTrophy(randomTrophy)
			setTrophyIndex(randomIndex)

			// 随机选择祝贺文字
			const congratsList =
				language === 'zh' ? congratulationsZh : congratulationsEn
			const randomCongrats =
				congratsList[Math.floor(Math.random() * congratsList.length)]
			setCongratulation(randomCongrats)

			// 播放庆祝音效
			if (soundEnabled) {
				soundEffects.playRandomCelebration()
			}

			// 20秒后自动关闭
			const timer = setTimeout(() => {
				onCloseRef.current()
			}, 20000)

			return () => clearTimeout(timer)
		}
	}, [isOpen, language, soundEnabled])

	if (!isOpen) return null

	// 生成随机动物
	const randomAnimals = Array.from({ length: 30 }, () => {
		const animalIndex = Math.floor(Math.random() * animals.length)
		const animal = animals[animalIndex]
		const startX = Math.random() * 100
		const endX = Math.random() * 100
		const startY = Math.random() * 100
		const duration = 8 + Math.random() * 12 // 8-20秒
		const delay = Math.random() * 5 // 0-5秒延迟

		return { animal, animalIndex, startX, endX, startY, duration, delay }
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
			{isOpen && (
				<motion.div
					className='milestone-overlay'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{/* 背景遮罩 */}
					<div className='milestone-backdrop' />

					{/* 中心文字 */}
					<div className='milestone-center'>
						<motion.div
							className='milestone-trophy'
							initial={{ scale: 0, rotate: -180 }}
							animate={{
								scale: [0, 1.2, 1, 1.1, 1],
								rotate: [0, 360],
							}}
							transition={{ duration: 2, ease: 'easeOut' }}
						>
							<span style={{ position: 'relative', display: 'inline-block' }}>
								{trophy}
								<span
									style={{
										position: 'absolute',
										top: '-10px',
										right: '-15px',
										background: '#ff0000',
										color: 'white',
										fontSize: '14px',
										fontWeight: 'bold',
										padding: '3px 6px',
										borderRadius: '4px',
										lineHeight: 1,
										boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
										zIndex: 10000,
									}}
								>
									L{trophyIndex}
								</span>
							</span>
						</motion.div>
						<motion.h1
							className='milestone-title'
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
							{congratulation}
						</motion.h1>
						<motion.div
							className='milestone-info'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
						>
							<div className='milestone-count'>
								{language === 'zh' ? '已完成 ' : 'Completed '}
								<span className='milestone-number'>{milestone}</span>
								{language === 'zh' ? ' 题！' : ' questions!'}
							</div>
							<div className='milestone-achievement'>
								{language === 'zh'
									? `第 ${milestoneCount} 次达成目标！`
									: `${milestoneCount}${getOrdinalSuffix(
											milestoneCount
									  )} milestone!`}
							</div>
						</motion.div>
						<motion.div
							className='milestone-stars'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}
						>
							⭐ ⭐ ⭐
						</motion.div>
					</div>

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
							}}
							transition={{
								duration: item.duration,
								delay: item.delay,
								ease: 'easeInOut',
							}}
						>
							<span style={{ position: 'relative', display: 'inline-block' }}>
								{item.animal}
								<span
									style={{
										position: 'absolute',
										top: '-5px',
										right: '-8px',
										background: '#ff0000',
										color: 'white',
										fontSize: '10px',
										fontWeight: 'bold',
										padding: '2px 4px',
										borderRadius: '3px',
										lineHeight: 1,
										boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
									}}
								>
									L{item.animalIndex}
								</span>
							</span>
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

// 获取英文序数词后缀
function getOrdinalSuffix(num: number): string {
	const j = num % 10
	const k = num % 100
	if (j === 1 && k !== 11) return 'st'
	if (j === 2 && k !== 12) return 'nd'
	if (j === 3 && k !== 13) return 'rd'
	return 'th'
}
