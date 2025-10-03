import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/CelebrationAnimations.scss'

interface CelebrationAnimationProps {
	show: boolean
	onComplete: () => void
}

// 30种不同的庆祝动画
export const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({
	show,
	onComplete,
}) => {
	const [animationType, setAnimationType] = React.useState(() =>
		Math.floor(Math.random() * 30)
	)

	// 使用 ref 来保存最新的 onComplete，避免依赖问题
	const onCompleteRef = React.useRef(onComplete)

	React.useEffect(() => {
		onCompleteRef.current = onComplete
	}, [onComplete])

	React.useEffect(() => {
		if (show) {
			console.log('CelebrationAnimation - 显示动画, 类型:', animationType)
			// 每次显示时随机选择一个新动画
			setAnimationType(Math.floor(Math.random() * 30))
			const timer = setTimeout(() => {
				console.log('CelebrationAnimation - 2秒后调用 onComplete')
				onCompleteRef.current()
			}, 2000)

			// 清理函数：当组件卸载或 show 变为 false 时清除定时器
			return () => {
				console.log('CelebrationAnimation - 清理定时器')
				clearTimeout(timer)
			}
		}
	}, [show])

	const animations = [
		// 1. 烟花爆炸
		<div key='fireworks' className='animation-container'>
			{[...Array(20)].map((_, i) => (
				<motion.div
					key={i}
					className='firework-particle'
					initial={{ scale: 0, x: 0, y: 0 }}
					animate={{
						scale: [0, 1, 0],
						x: Math.cos((i * 18 * Math.PI) / 180) * 150,
						y: Math.sin((i * 18 * Math.PI) / 180) * 150,
					}}
					transition={{ duration: 1.5, ease: 'easeOut' }}
				/>
			))}
		</div>,

		// 2. 可爱的小猫咪
		<motion.div
			key='cat'
			className='animation-container'
			initial={{ scale: 0, rotate: -180 }}
			animate={{ scale: [0, 1.2, 1], rotate: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className='emoji-large'>😺</div>
			<motion.div
				className='sparkles'
				animate={{ rotate: 360 }}
				transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
			>
				✨✨✨
			</motion.div>
		</motion.div>,

		// 3. 跳跃的兔子
		<motion.div
			key='rabbit'
			className='animation-container'
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: [100, -20, 0, -10, 0], opacity: 1 }}
			transition={{ duration: 1.5 }}
		>
			<div className='emoji-large'>🐰</div>
			<motion.div className='text-celebration'>太棒了！</motion.div>
		</motion.div>,

		// 4. 旋转的星星
		<motion.div key='stars' className='animation-container'>
			{[...Array(8)].map((_, i) => (
				<motion.div
					key={i}
					className='star-item'
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
					}}
					animate={{
						rotate: [0, 360],
						scale: [0, 1.5, 0],
						x: Math.cos((i * 45 * Math.PI) / 180) * 100,
						y: Math.sin((i * 45 * Math.PI) / 180) * 100,
					}}
					transition={{ duration: 2, ease: 'easeOut' }}
				>
					⭐
				</motion.div>
			))}
		</motion.div>,

		// 5. 欢呼的熊猫
		<motion.div
			key='panda'
			className='animation-container'
			initial={{ scale: 0 }}
			animate={{ scale: [0, 1.3, 1], rotate: [0, -10, 10, -10, 0] }}
			transition={{ duration: 1 }}
		>
			<div className='emoji-large'>🐼</div>
			<motion.div
				animate={{ y: [-10, 10, -10] }}
				transition={{ duration: 0.5, repeat: 3 }}
			>
				Perfect!
			</motion.div>
		</motion.div>,

		// 6. 彩虹
		<motion.div
			key='rainbow'
			className='animation-container'
			initial={{ scale: 0, y: 50 }}
			animate={{ scale: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='rainbow'>🌈</div>
			<div className='emoji-large'>🎉</div>
		</motion.div>,

		// 7. 跳舞的企鹅
		<motion.div
			key='penguin'
			className='animation-container'
			animate={{ rotate: [-15, 15, -15, 15, 0] }}
			transition={{ duration: 1.5 }}
		>
			<div className='emoji-large'>🐧</div>
			<motion.div
				animate={{ scale: [1, 1.2, 1, 1.2, 1] }}
				transition={{ duration: 1.5 }}
			>
				跳舞吧！
			</motion.div>
		</motion.div>,

		// 8. 飘落的心形
		<div key='hearts' className='animation-container'>
			{[...Array(15)].map((_, i) => (
				<motion.div
					key={i}
					className='falling-item'
					style={{ left: `${Math.random() * 100}%` }}
					initial={{ y: -50, opacity: 0 }}
					animate={{ y: 300, opacity: [0, 1, 1, 0] }}
					transition={{ duration: 2, delay: i * 0.1 }}
				>
					❤️
				</motion.div>
			))}
		</div>,

		// 9. 旋转的狗狗
		<motion.div
			key='dog'
			className='animation-container'
			animate={{ rotate: [0, 360, 720] }}
			transition={{ duration: 2 }}
		>
			<div className='emoji-large'>🐕</div>
			<div className='text-celebration'>汪汪！</div>
		</motion.div>,

		// 10. 爆炸的礼物盒
		<motion.div key='gift' className='animation-container'>
			<motion.div
				initial={{ scale: 1 }}
				animate={{ scale: [1, 1.5, 0] }}
				transition={{ duration: 0.6 }}
			>
				🎁
			</motion.div>
			{[...Array(12)].map((_, i) => (
				<motion.div
					key={i}
					className='gift-particle'
					initial={{ scale: 0, x: 0, y: 0 }}
					animate={{
						scale: [0, 1, 0],
						x: Math.cos((i * 30 * Math.PI) / 180) * 120,
						y: Math.sin((i * 30 * Math.PI) / 180) * 120,
					}}
					transition={{ duration: 1.5, delay: 0.3 }}
				>
					🎊
				</motion.div>
			))}
		</motion.div>,

		// 11. 飞翔的小鸟
		<motion.div key='bird' className='animation-container'>
			<motion.div
				className='emoji-large'
				animate={{ x: [-200, 200], y: [0, -30, 0, -30, 0] }}
				transition={{ duration: 2 }}
			>
				🐦
			</motion.div>
		</motion.div>,

		// 12. 跳跃的青蛙
		<motion.div
			key='frog'
			className='animation-container'
			animate={{ y: [0, -80, -40, -100, 0], rotate: [0, 360] }}
			transition={{ duration: 1.8 }}
		>
			<div className='emoji-large'>🐸</div>
		</motion.div>,

		// 13. 闪烁的奖杯
		<motion.div
			key='trophy'
			className='animation-container'
			animate={{
				scale: [0, 1.5, 1.2, 1.5, 1],
				rotate: [0, -10, 10, -10, 0],
			}}
			transition={{ duration: 1.5 }}
		>
			<div className='emoji-large'>🏆</div>
			<motion.div
				animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
				transition={{ duration: 1.5 }}
				className='text-celebration'
			>
				冠军！
			</motion.div>
		</motion.div>,

		// 14. 旋转的披萨
		<motion.div
			key='pizza'
			className='animation-container'
			animate={{ rotate: [0, 720], scale: [0.5, 1.3, 1] }}
			transition={{ duration: 2 }}
		>
			<div className='emoji-large'>🍕</div>
			<div className='text-celebration'>奖励披萨！</div>
		</motion.div>,

		// 15. 发光的钻石
		<motion.div key='diamond' className='animation-container'>
			<motion.div
				className='emoji-large'
				animate={{
					scale: [1, 1.5, 1, 1.5, 1],
					rotate: [0, 180, 360],
				}}
				transition={{ duration: 2 }}
			>
				💎
			</motion.div>
			{[...Array(8)].map((_, i) => (
				<motion.div
					key={i}
					className='shine-ray'
					style={{
						transform: `rotate(${i * 45}deg)`,
					}}
					animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 0.5] }}
					transition={{ duration: 2, delay: i * 0.1 }}
				/>
			))}
		</motion.div>,

		// 16. 弹跳的足球
		<motion.div key='soccer' className='animation-container'>
			<motion.div
				className='emoji-large'
				animate={{
					y: [0, -100, -50, -120, 0],
					rotate: [0, 360, 720],
				}}
				transition={{ duration: 2 }}
			>
				⚽
			</motion.div>
		</motion.div>,

		// 17. 欢庆的猴子
		<motion.div
			key='monkey'
			className='animation-container'
			animate={{
				rotate: [0, -20, 20, -20, 20, 0],
				scale: [0.8, 1.2, 0.8, 1.2, 1],
			}}
			transition={{ duration: 1.5 }}
		>
			<div className='emoji-large'>🐵</div>
			<div className='text-celebration'>Awesome!</div>
		</motion.div>,

		// 18. 魔法星星雨
		<div key='star-rain' className='animation-container'>
			{[...Array(20)].map((_, i) => (
				<motion.div
					key={i}
					className='falling-item'
					style={{
						left: `${i * 5}%`,
						fontSize: '2rem',
					}}
					initial={{ y: -50, opacity: 0, rotate: 0 }}
					animate={{
						y: 300,
						opacity: [0, 1, 1, 0],
						rotate: 360,
					}}
					transition={{ duration: 2, delay: i * 0.05 }}
				>
					⭐
				</motion.div>
			))}
		</div>,

		// 19. 派对气球
		<div key='balloons' className='animation-container'>
			{['🎈', '🎈', '🎈', '🎈', '🎈'].map((balloon, i) => (
				<motion.div
					key={i}
					className='balloon-item'
					style={{ left: `${20 + i * 15}%` }}
					initial={{ y: 300, scale: 0 }}
					animate={{
						y: -100,
						scale: 1,
						rotate: [0, -10, 10, -10, 0],
					}}
					transition={{ duration: 2, delay: i * 0.1 }}
				>
					{balloon}
				</motion.div>
			))}
		</div>,

		// 20. 旋转的地球
		<motion.div
			key='earth'
			className='animation-container'
			animate={{ rotate: [0, 360] }}
			transition={{ duration: 2, ease: 'linear' }}
		>
			<div className='emoji-large'>🌍</div>
			<motion.div
				animate={{ scale: [1, 1.2, 1] }}
				transition={{ duration: 1, repeat: 1 }}
				className='text-celebration'
			>
				世界级！
			</motion.div>
		</motion.div>,

		// 21. 闪电效果
		<div key='lightning' className='animation-container'>
			{[...Array(5)].map((_, i) => (
				<motion.div
					key={i}
					className='lightning-bolt'
					initial={{ opacity: 0, scale: 0 }}
					animate={{
						opacity: [0, 1, 0, 1, 0],
						scale: [0, 1.5, 0, 1.5, 0],
					}}
					transition={{ duration: 1.5, delay: i * 0.2 }}
				>
					⚡
				</motion.div>
			))}
		</div>,

		// 22. 独角兽
		<motion.div
			key='unicorn'
			className='animation-container'
			initial={{ x: -200, scale: 0 }}
			animate={{
				x: 0,
				scale: [0, 1.3, 1],
				rotate: [0, 360],
			}}
			transition={{ duration: 1.5 }}
		>
			<div className='emoji-large'>🦄</div>
			<div className='text-celebration'>神奇！</div>
		</motion.div>,

		// 23. 庆祝彩带
		<div key='confetti' className='animation-container'>
			{[...Array(30)].map((_, i) => (
				<motion.div
					key={i}
					className='confetti-piece'
					style={{
						left: `${Math.random() * 100}%`,
						background: `hsl(${Math.random() * 360}, 70%, 60%)`,
					}}
					initial={{ y: -50, rotate: 0, opacity: 1 }}
					animate={{
						y: 300,
						rotate: Math.random() * 720,
						opacity: [1, 1, 0],
					}}
					transition={{ duration: 2, delay: Math.random() * 0.3 }}
				/>
			))}
		</div>,

		// 24. 火箭升空
		<motion.div key='rocket' className='animation-container'>
			<motion.div
				className='emoji-large'
				initial={{ y: 200, scale: 0.5 }}
				animate={{ y: -200, scale: 1 }}
				transition={{ duration: 2 }}
			>
				🚀
			</motion.div>
			{[...Array(10)].map((_, i) => (
				<motion.div
					key={i}
					style={{
						position: 'absolute',
						bottom: 0,
						left: '50%',
					}}
					animate={{
						y: [0, Math.random() * 50],
						x: [(Math.random() - 0.5) * 30],
						opacity: [1, 0],
					}}
					transition={{ duration: 0.5, delay: i * 0.1 }}
				>
					💨
				</motion.div>
			))}
		</motion.div>,

		// 25. 跳舞的章鱼
		<motion.div key='octopus' className='animation-container'>
			<motion.div
				className='emoji-large'
				animate={{
					rotate: [0, 10, -10, 10, -10, 0],
					y: [0, -20, 0, -20, 0],
				}}
				transition={{ duration: 2 }}
			>
				🐙
			</motion.div>
		</motion.div>,

		// 26. 闪烁的太阳
		<motion.div key='sun' className='animation-container'>
			<motion.div
				className='emoji-large'
				animate={{
					rotate: [0, 360],
					scale: [1, 1.3, 1, 1.3, 1],
				}}
				transition={{ duration: 2 }}
			>
				☀️
			</motion.div>
			{[...Array(12)].map((_, i) => (
				<motion.div
					key={i}
					className='sun-ray'
					style={{
						transform: `rotate(${i * 30}deg)`,
					}}
					animate={{
						scale: [1, 1.5, 1],
						opacity: [0.5, 1, 0.5],
					}}
					transition={{ duration: 2, delay: i * 0.05 }}
				/>
			))}
		</motion.div>,

		// 27. 冰淇淋庆祝
		<motion.div
			key='icecream'
			className='animation-container'
			initial={{ y: 100, rotate: -180, scale: 0 }}
			animate={{
				y: 0,
				rotate: 0,
				scale: [0, 1.5, 1],
			}}
			transition={{ duration: 1.5 }}
		>
			<div className='emoji-large'>🍦</div>
			<div className='text-celebration'>甜蜜奖励！</div>
		</motion.div>, // 28. 蝴蝶飞舞
		<div key='butterfly' className='animation-container'>
			{[...Array(6)].map((_, i) => (
				<motion.div
					key={i}
					className='emoji-medium'
					animate={{
						x: [
							Math.cos((i * 60 * Math.PI) / 180) * 80,
							Math.cos(((i + 3) * 60 * Math.PI) / 180) * 80,
						],
						y: [
							Math.sin((i * 60 * Math.PI) / 180) * 80,
							Math.sin(((i + 3) * 60 * Math.PI) / 180) * 80,
						],
						rotate: [0, 360],
					}}
					transition={{ duration: 2, ease: 'easeInOut' }}
				>
					🦋
				</motion.div>
			))}
		</div>,

		// 29. 金币雨
		<div key='coins' className='animation-container'>
			{[...Array(15)].map((_, i) => (
				<motion.div
					key={i}
					className='falling-item'
					style={{ left: `${Math.random() * 100}%` }}
					initial={{ y: -50, rotate: 0 }}
					animate={{
						y: 300,
						rotate: [0, 180, 360, 540, 720],
					}}
					transition={{ duration: 2, delay: i * 0.08 }}
				>
					🪙
				</motion.div>
			))}
		</div>,

		// 30. 皇冠加冕
		<motion.div key='crown' className='animation-container'>
			<motion.div
				initial={{ y: -200, scale: 0 }}
				animate={{
					y: 0,
					scale: [0, 1.5, 1.2, 1.5, 1],
					rotate: [0, -10, 10, -10, 0],
				}}
				transition={{ duration: 1.5 }}
			>
				<div className='emoji-large'>👑</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className='text-celebration'
			>
				你是王者！
			</motion.div>
			{[...Array(6)].map((_, i) => (
				<motion.div
					key={i}
					className='star-item'
					style={{
						position: 'absolute',
						left: '50%',
						top: '20%',
					}}
					animate={{
						rotate: [0, 360],
						scale: [0, 1, 0],
						x: Math.cos((i * 60 * Math.PI) / 180) * 80,
						y: Math.sin((i * 60 * Math.PI) / 180) * 80,
					}}
					transition={{ duration: 1.5, delay: 0.5 }}
				>
					⭐
				</motion.div>
			))}
		</motion.div>,
	]

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className='celebration-overlay'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					{/* 调试：显示当前动画编号 */}
					<div
						style={{
							position: 'absolute',
							top: '10px',
							left: '10px',
							background: 'rgba(0,0,0,0.7)',
							color: 'white',
							padding: '5px 10px',
							borderRadius: '5px',
							fontSize: '14px',
							zIndex: 10000,
						}}
					>
						动画 #{animationType}
					</div>
					{animations[animationType]}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
