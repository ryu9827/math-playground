import { ReactElement } from 'react'
import { motion } from 'framer-motion'

// 定义运算类型
export type OperationType = '+' | '-' | '×' | '÷'

// Emoji 集合
const emojis = {
	addition: [
		'😊',
		'🎉',
		'🌟',
		'✨',
		'🎊',
		'🎈',
		'🎁',
		'🏆',
		'🌈',
		'⭐',
		'💫',
		'🌸',
		'🌺',
		'🌻',
		'🌼',
		'🌷',
		'🍀',
		'🦋',
		'🐝',
		'🐞',
		'🎯',
		'🎪',
		'🎨',
		'🦄',
		'🐰',
		'🎀',
		'🍭',
		'🧸',
		'🎂',
		'🍓',
		'🦊',
		'🐱',
		'🎬',
	],
	subtraction: [
		'🤔',
		'🧠',
		'💡',
		'🔍',
		'📚',
		'✏️',
		'📝',
		'🎓',
		'🦉',
		'🧩',
		'🎲',
		'🔬',
		'🔭',
		'⚗️',
		'🧪',
		'📊',
		'📈',
		'🗝️',
		'🔑',
		'🎯',
		'🧮',
		'💎',
		'🏅',
		'🌟',
		'⭐',
	],
	multiplication: [
		'🚀',
		'⚡',
		'💥',
		'🔥',
		'💪',
		'🦸',
		'🦾',
		'🎸',
		'🎵',
		'🎶',
		'🎤',
		'🥁',
		'🎺',
		'🎷',
		'🎻',
		'🏃',
		'⚽',
		'🏀',
		'🎾',
		'🏐',
		'🏈',
		'⚾',
		'🥊',
		'🏋️',
		'🤸',
	],
	division: [
		'🧘',
		'🕉️',
		'☯️',
		'🎋',
		'🍃',
		'🌿',
		'🌾',
		'🌱',
		'🪴',
		'🦚',
		'🦢',
		'🦩',
		'🐬',
		'🐳',
		'🐋',
		'🌊',
		'🏝️',
		'🗻',
		'🌄',
		'🌅',
		'🌌',
		'🌙',
		'⭐',
		'💫',
		'✨',
	],
}

// 赞美文字集合
// 中文庆祝语
const praises = {
	addition: [
		'太棒了！',
		'你真聪明！',
		'完美！',
		'做得好！',
		'继续加油！',
		'真厉害！',
		'你是天才！',
		'精彩！',
		'了不起！',
		'超级棒！',
		'好样的！',
		'真不错！',
		'太优秀了！',
		'你很棒！',
		'加油！',
		'真棒！',
		'厉害！',
		'太好了！',
		'好极了！',
		'出色！',
	],
	subtraction: [
		'思考得很好！',
		'逻辑清晰！',
		'分析正确！',
		'真聪明！',
		'计算准确！',
		'头脑清醒！',
		'思维敏捷！',
		'推理正确！',
		'很有逻辑！',
		'分析得当！',
		'思路清楚！',
		'判断准确！',
		'理解透彻！',
		'掌握得好！',
		'计算精准！',
		'思维缜密！',
		'分析透彻！',
		'逻辑严密！',
		'判断精确！',
		'思考周全！',
	],
	multiplication: [
		'速度真快！',
		'反应迅速！',
		'太强了！',
		'无敌！',
		'飞速计算！',
		'快如闪电！',
		'厉害炸了！',
		'超级快！',
		'神速！',
		'太快了！',
		'迅雷不及！',
		'快准狠！',
		'火力全开！',
		'全速前进！',
		'冲刺成功！',
		'爆发力强！',
		'快马加鞭！',
		'势如破竹！',
		'一马当先！',
		'遥遥领先！',
	],
	division: [
		'心平气和！',
		'沉着冷静！',
		'稳如泰山！',
		'平衡得当！',
		'分配均匀！',
		'精准分解！',
		'井井有条！',
		'条理清晰！',
		'有条不紊！',
		'秩序井然！',
		'平稳前行！',
		'稳步前进！',
		'步步为营！',
		'稳扎稳打！',
		'从容不迫！',
		'游刃有余！',
		'举重若轻！',
		'淡定自若！',
		'胸有成竹！',
		'成竹在胸！',
	],
}

// 英文庆祝语
const praisesEn = {
	addition: [
		'Awesome!',
		'You\'re so smart!',
		'Perfect!',
		'Well done!',
		'Keep it up!',
		'Amazing!',
		'You\'re a genius!',
		'Fantastic!',
		'Outstanding!',
		'Super great!',
		'Good job!',
		'Excellent!',
		'Wonderful!',
		'You\'re great!',
		'Go for it!',
		'Brilliant!',
		'Impressive!',
		'Terrific!',
		'Superb!',
		'Marvelous!',
	],
	subtraction: [
		'Great thinking!',
		'Clear logic!',
		'Correct analysis!',
		'So clever!',
		'Accurate calculation!',
		'Sharp mind!',
		'Quick thinking!',
		'Right reasoning!',
		'Very logical!',
		'Good analysis!',
		'Clear thought!',
		'Precise judgment!',
		'Deep understanding!',
		'Well mastered!',
		'Exact calculation!',
		'Careful thinking!',
		'Thorough analysis!',
		'Solid logic!',
		'Accurate judgment!',
		'Thoughtful!',
	],
	multiplication: [
		'So fast!',
		'Quick response!',
		'Super strong!',
		'Unbeatable!',
		'Lightning speed!',
		'Fast as lightning!',
		'Incredibly good!',
		'Super fast!',
		'Lightning quick!',
		'So speedy!',
		'Blazing fast!',
		'Fast and accurate!',
		'Full power!',
		'Full speed ahead!',
		'Sprint success!',
		'Great burst!',
		'Fast track!',
		'Unstoppable!',
		'Leading the way!',
		'Way ahead!',
	],
	division: [
		'Stay calm!',
		'Cool and collected!',
		'Rock steady!',
		'Well balanced!',
		'Even distribution!',
		'Precise breakdown!',
		'Well organized!',
		'Clear structure!',
		'Methodical!',
		'Orderly!',
		'Steady progress!',
		'Step by step!',
		'Strategic!',
		'Solid foundation!',
		'Composed!',
		'Skillful!',
		'Effortless!',
		'Calm and cool!',
		'Confident!',
		'Well prepared!',
	],
}

// 颜色方案
const colorSchemes = {
	addition: ['#FFD700', '#FFA500', '#FF69B4', '#FF1493', '#FF6347'],
	subtraction: ['#87CEEB', '#4169E1', '#6495ED', '#00BFFF', '#1E90FF'],
	multiplication: ['#FF4500', '#FF6347', '#FF7F50', '#FFA07A', '#FF8C00'],
	division: ['#98FB98', '#00FA9A', '#00FF7F', '#3CB371', '#2E8B57'],
}

// 生成动画函数
export const generateAnimations = (
	operation: OperationType,
	language: 'zh' | 'en' = 'zh'
): ReactElement[] => {
	const animations: ReactElement[] = []
	const operationType = getOperationCategory(operation)
	const emojiSet = emojis[operationType]
	const praiseSet = language === 'en' ? praisesEn[operationType] : praises[operationType]
	const colors = colorSchemes[operationType]

	// 生成100个动画
	for (let i = 0; i < 100; i++) {
		const emoji = emojiSet[i % emojiSet.length]
		const praise = praiseSet[i % praiseSet.length]
		const color = colors[i % colors.length]
		const animationIndex = i % 10 // 使用10种基本动画模式

		animations.push(createAnimation(animationIndex, emoji, praise, color, i))
	}

	return animations
}

// 新增：获取庆祝文字的函数
export const getPraiseText = (
	operation: OperationType,
	index: number,
	language: 'zh' | 'en' = 'zh'
): string => {
	const operationType = getOperationCategory(operation)
	const praiseSet = language === 'en' ? praisesEn[operationType] : praises[operationType]
	return praiseSet[index % praiseSet.length]
}

// 获取运算类别
const getOperationCategory = (
	operation: OperationType
): keyof typeof emojis => {
	switch (operation) {
		case '+':
			return 'addition'
		case '-':
			return 'subtraction'
		case '×':
			return 'multiplication'
		case '÷':
			return 'division'
		default:
			return 'addition'
	}
}

// 创建单个动画
const createAnimation = (
	type: number,
	emoji: string,
	praise: string,
	color: string,
	index: number
): ReactElement => {
	const key = `anim-${index}`

	switch (type) {
		case 0: // 爆炸效果
			return (
				<div key={key} className='animation-container'>
					{[...Array(15)].map((_, i) => (
						<motion.div
							key={i}
							className='particle'
							initial={{ scale: 0, x: 0, y: 0 }}
							animate={{
								scale: [0, 1, 0],
								x: Math.cos((i * 24 * Math.PI) / 180) * 120,
								y: Math.sin((i * 24 * Math.PI) / 180) * 120,
							}}
							transition={{ duration: 1.5, ease: 'easeOut' }}
							style={{ background: color }}
						/>
					))}
					<motion.div
						className='center-emoji'
						initial={{ scale: 0 }}
						animate={{ scale: [0, 1.5, 1] }}
						transition={{ duration: 0.5 }}
					>
						{emoji}
					</motion.div>
				</div>
			)

		case 1: // 跳跃效果
			return (
				<motion.div
					key={key}
					className='animation-container'
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: [100, -20, 0, -10, 0], opacity: 1 }}
					transition={{ duration: 1.5 }}
				>
					<div className='emoji-large' style={{ color }}>
						{emoji}
					</div>
					<motion.div className='text-celebration' style={{ color: '#FFFFFF' }}>
						{praise}
					</motion.div>
				</motion.div>
			)

		case 2: // 旋转效果
			return (
				<motion.div
					key={key}
					className='animation-container'
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: [0, 1.2, 1], rotate: 360 }}
					transition={{ duration: 1 }}
				>
					<div className='emoji-large'>{emoji}</div>
					<motion.div
						className='sparkles'
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
						style={{ color }}
					>
						✨✨✨
					</motion.div>
				</motion.div>
			)

		case 3: // 放大效果
			return (
				<motion.div
					key={key}
					className='animation-container'
					initial={{ scale: 0 }}
					animate={{ scale: [0, 1.5, 1] }}
					transition={{ duration: 0.8 }}
				>
					<div className='emoji-large'>{emoji}</div>
					<motion.div
						className='text-celebration'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						style={{ color: '#FFFFFF', fontWeight: 'bold' }}
					>
						{praise}
					</motion.div>
				</motion.div>
			)

		case 4: // 飘落效果
			return (
				<div key={key} className='animation-container'>
					{[...Array(12)].map((_, i) => (
						<motion.div
							key={i}
							className='falling-item'
							initial={{ y: -50, x: -100 + i * 20, opacity: 0 }}
							animate={{
								y: 200,
								x: -100 + i * 20 + Math.sin(i) * 30,
								opacity: [0, 1, 1, 0],
							}}
							transition={{ duration: 2, delay: i * 0.1 }}
							style={{ fontSize: '2rem' }}
						>
							{emoji}
						</motion.div>
					))}
					<motion.div
						className='text-celebration'
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.5 }}
						style={{ color: '#FFFFFF', position: 'relative', zIndex: 10 }}
					>
						{praise}
					</motion.div>
				</div>
			)

		case 5: // 脉冲效果
			return (
				<motion.div
					key={key}
					className='animation-container'
					initial={{ scale: 1 }}
					animate={{ scale: [1, 1.3, 1, 1.3, 1] }}
					transition={{ duration: 1.5 }}
				>
					<div
						className='emoji-large'
						style={{ filter: `drop-shadow(0 0 20px ${color})` }}
					>
						{emoji}
					</div>
					<motion.div
						className='text-celebration'
						animate={{ opacity: [0.5, 1, 0.5, 1] }}
						transition={{ duration: 1.5 }}
						style={{ color: '#FFFFFF' }}
					>
						{praise}
					</motion.div>
				</motion.div>
			)

		case 6: // 波纹效果
			return (
				<div key={key} className='animation-container'>
					{[...Array(3)].map((_, i) => (
						<motion.div
							key={i}
							className='ripple'
							initial={{ scale: 0, opacity: 0.8 }}
							animate={{ scale: 3, opacity: 0 }}
							transition={{ duration: 2, delay: i * 0.3 }}
							style={{ borderColor: color }}
						/>
					))}
					<div className='emoji-large'>{emoji}</div>
					<motion.div className='text-celebration' style={{ color: '#FFFFFF' }}>
						{praise}
					</motion.div>
				</div>
			)

		case 7: // 左右摇摆
			return (
				<motion.div
					key={key}
					className='animation-container'
					animate={{ rotate: [-10, 10, -10, 10, 0] }}
					transition={{ duration: 1 }}
				>
					<div className='emoji-large'>{emoji}</div>
					<motion.div
						className='text-celebration'
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						style={{ color: '#FFFFFF' }}
					>
						{praise}
					</motion.div>
				</motion.div>
			)

		case 8: // 闪烁效果
			return (
				<motion.div
					key={key}
					className='animation-container'
					animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
					transition={{ duration: 1.2 }}
				>
					<div
						className='emoji-large'
						style={{ textShadow: `0 0 20px ${color}` }}
					>
						{emoji}
					</div>
					<motion.div className='text-celebration' style={{ color: '#FFFFFF' }}>
						{praise}
					</motion.div>
				</motion.div>
			)

		case 9: // 组合效果
		default:
			return (
				<motion.div
					key={key}
					className='animation-container'
					initial={{ scale: 0, rotate: 0 }}
					animate={{
						scale: [0, 1.2, 1],
						rotate: [0, 360],
					}}
					transition={{ duration: 1.5 }}
				>
					<div className='emoji-large'>{emoji}</div>
					<motion.div
						className='text-celebration'
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.5 }}
						style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.5rem' }}
					>
						{praise}
					</motion.div>
					<motion.div
						className='sparkles-circle'
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
						style={{ color }}
					>
						{[...Array(8)].map((_, i) => (
							<span
								key={i}
								style={{
									position: 'absolute',
									transform: `rotate(${i * 45}deg) translateY(-60px)`,
								}}
							>
								✨
							</span>
						))}
					</motion.div>
				</motion.div>
			)
	}
}
