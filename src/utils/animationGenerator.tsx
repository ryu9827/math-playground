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
		'⭐',
		'💫',
		'🌸',
		'🌺',
		'🌻',
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
		// 新增emoji，删除了2个无法正常显示的emoji（原L8彩虹和L14花朵），当前共133个
		'🌞',
		'🌝',
		'💖',
		'💝',
		'💗',
		'💓',
		'💕',
		'💞',
		'💘',
		'💌',
		'🎵',
		'🎶',
		'🎼',
		'🎤',
		'🎧',
		'🎸',
		'🎹',
		'🥁',
		'🎺',
		'🎷',
		'🎻',
		'🎸',
		'🌹',
		'🌺',
		'🌴',
		'🌵',
		'🌾',
		'🌿',
		'🍁',
		'🍂',
		'🍃',
		'🐦',
		'🐦',
		'🐦',
		'🦆',
		'🐦',
		'🦅',
		'🦆',
		'🐣',
		'🐤',
		'🐥',
		'🐦',
		'🐧',
		'🦉',
		'🐸',
		'🐢',
		'🦎',
		'🐙',
		'🐙',
		'🦀',
		'🦀',
		'🐠',
		'🐟',
		'🐡',
		'🐬',
		'🐳',
		'🐋',
		'🐟',
		'🐅',
		'🐆',
		'🐴',
		'🐵',
		'🐵',
		'🐘',
		'🦏',
		'🦏',
		'🐪',
		'🐫',
		'🐫',
		'🐨',
		'🦒',
		'🐃',
		'🐂',
		'🐄',
		'🐎',
		'🐖',
		'🐏',
		'🐑',
		'🐫',
		'🐐',
		'🐕',
		'🐩',
		'🐕',
		'🐈',
		'🐓',
		'🦃',
		'🐦',
		'🐦',
		'🦆',
		'🐦',
		'🐦',
		'🐇',
		'🐻',
		'🦔',
		'🦔',
		'🦔',
		'🐻',
		'🐁',
		'🐀',
		'🐹',
		'🐭',
		'🐰',
	],
	subtraction: [
		'🤔',
		'🧠',
		'💡',
		'🔍',
		'📚',
		'✏',
		'📝',
		'🎓',
		'🦉',
		'🧩',
		'🎲',
		'🔬',
		'🔭',
		'🧪',
		'🧪',
		'📊',
		'📈',
		'🔑',
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
		'💪',
		'💪',
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
		'🏋',
		'🤸',
	],
	division: [
		'🧘',
		'🕉',
		'☯',
		'🎋',
		'🍃',
		'🌿',
		'🌾',
		'🌱',
		'🪴',
		'🐦',
		'🦆',
		'🐦',
		'🐬',
		'🐳',
		'🐋',
		'🌊',
		'🏝',
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
		// 新增80个，共100个
		'无与伦比！',
		'卓越非凡！',
		'技艺超群！',
		'炉火纯青！',
		'登峰造极！',
		'出类拔萃！',
		'独占鳌头！',
		'遥遥领先！',
		'一马当先！',
		'首屈一指！',
		'鹤立鸡群！',
		'独树一帜！',
		'别具匠心！',
		'巧夺天工！',
		'妙不可言！',
		'美轮美奂！',
		'精益求精！',
		'尽善尽美！',
		'天衣无缝！',
		'毫无瑕疵！',
		'才华横溢！',
		'才思敏捷！',
		'聪明绝顶！',
		'智慧超群！',
		'天赋异禀！',
		'慧眼独具！',
		'明察秋毫！',
		'洞察秋毫！',
		'目光如炬！',
		'眼光独到！',
		'高瞻远瞩！',
		'深谋远虑！',
		'胸有成竹！',
		'成竹在胸！',
		'运筹帷幄！',
		'决胜千里！',
		'料事如神！',
		'未卜先知！',
		'算无遗策！',
		'神机妙算！',
		'妙计连环！',
		'绝处逢生！',
		'化险为夷！',
		'转危为安！',
		'反败为胜！',
		'出奇制胜！',
		'技压群雄！',
		'艺高人胆大！',
		'勇往直前！',
		'势如破竹！',
		'披荆斩棘！',
		'所向披靡！',
		'无坚不摧！',
		'锐不可当！',
		'雷霆万钧！',
		'气贯长虹！',
		'气吞山河！',
		'一鸣惊人！',
		'一飞冲天！',
		'扶摇直上！',
		'平步青云！',
		'青云直上！',
		'步步高升！',
		'节节高升！',
		'蒸蒸日上！',
		'日新月异！',
		'突飞猛进！',
		'飞速进步！',
		'进步神速！',
		'一日千里！',
		'后来居上！',
		'青出于蓝！',
		'更胜一筹！',
		'略胜一筹！',
		'技高一筹！',
		'棋高一着！',
		'高人一等！',
		'独步天下！',
		'天下无双！',
		'举世无双！',
		'盖世无双！',
		'空前绝后！',
		'前无古人！',
		'千古流芳！',
		'名垂青史！',
		'流芳百世！',
		'永垂不朽！',
		'万古长青！',
		'经久不衰！',
		'历久弥新！',
		'常青不败！',
		'屹立不倒！',
		'坚如磐石！',
		'固若金汤！',
		'稳如泰山！',
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
		"You're so smart!",
		'Perfect!',
		'Well done!',
		'Keep it up!',
		'Amazing!',
		"You're a genius!",
		'Fantastic!',
		'Outstanding!',
		'Super great!',
		'Good job!',
		'Excellent!',
		'Wonderful!',
		"You're great!",
		'Go for it!',
		'Brilliant!',
		'Impressive!',
		'Terrific!',
		'Superb!',
		'Marvelous!',
		// 新增80个，共100个
		'Unparalleled!',
		'Exceptional!',
		'Extraordinary!',
		'Phenomenal!',
		'Remarkable!',
		'Spectacular!',
		'Magnificent!',
		'Splendid!',
		'Stunning!',
		'Breathtaking!',
		'Mind-blowing!',
		'Incredible!',
		'Unbelievable!',
		'Sensational!',
		'Fabulous!',
		'Glorious!',
		'Majestic!',
		'Supreme!',
		'Divine!',
		'Heavenly!',
		'Top-notch!',
		'First-class!',
		'World-class!',
		'Top-tier!',
		'Elite!',
		'Premium!',
		'Stellar!',
		'Dazzling!',
		'Radiant!',
		'Shining!',
		'Sparkling!',
		'Glittering!',
		'Luminous!',
		'Brilliant work!',
		'Masterful!',
		'Expert level!',
		'Pro status!',
		'Champion!',
		'Winner!',
		'Victory!',
		'Triumphant!',
		'Unstoppable!',
		'Invincible!',
		'Legendary!',
		'Epic!',
		'Heroic!',
		'Mighty!',
		'Powerful!',
		'Strong!',
		'Formidable!',
		'Impressive feat!',
		'Great success!',
		'Total win!',
		'Crushing it!',
		'Nailing it!',
		'Killing it!',
		'Owning it!',
		'Rocking it!',
		'Smashing it!',
		'Acing it!',
		'Perfect score!',
		'Flawless!',
		'Impeccable!',
		'Spotless!',
		'Pristine!',
		'Pure genius!',
		'Sheer brilliance!',
		'Absolute perfection!',
		'Total mastery!',
		'Complete dominance!',
		'Full control!',
		'Peak performance!',
		'Maximum effort!',
		'Ultimate success!',
		'Supreme achievement!',
		'Top achievement!',
		'Record breaking!',
		'Game changer!',
		'Trendsetter!',
		'Trailblazer!',
		'Pioneer!',
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

// emoji 在文件中的起始行号
const emojiLineNumbers = {
	addition: 10, // 'addition' 数组第一个 emoji 的行号
	subtraction: 148,
	multiplication: 175,
	division: 202,
}

// 生成动画函数
export const generateAnimations = (
	operation: OperationType,
	language: 'zh' | 'en' = 'zh',
	showDebugInfo: boolean = false // 是否显示调试信息（行号）
): ReactElement[] => {
	const animations: ReactElement[] = []
	const operationType = getOperationCategory(operation)
	const emojiSet = emojis[operationType]
	const praiseSet =
		language === 'en' ? praisesEn[operationType] : praises[operationType]
	const colors = colorSchemes[operationType]

	// 加法生成200个动画，其他运算生成100个
	const animationCount = operation === '+' ? 200 : 100
	for (let i = 0; i < animationCount; i++) {
		const emojiIndex = i % emojiSet.length
		const emoji = emojiSet[emojiIndex]
		const praise = praiseSet[i % praiseSet.length]
		const color = colors[i % colors.length]
		const animationIndex = i % 10 // 使用10种基本动画模式

		// 计算 emoji 的实际行号
		const emojiLineNumber = emojiLineNumbers[operationType] + emojiIndex

		animations.push(
			createAnimation(
				animationIndex,
				emoji,
				praise,
				color,
				i,
				showDebugInfo ? emojiLineNumber : undefined
			)
		)
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
	const praiseSet =
		language === 'en' ? praisesEn[operationType] : praises[operationType]
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
	index: number,
	lineNumber?: number // 可选的行号参数
): ReactElement => {
	const key = `anim-${index}`

	// 如果提供了行号，在 emoji 旁边显示行号标签
	const emojiWithLineNumber = lineNumber ? (
		<div style={{ position: 'relative', display: 'inline-block' }}>
			{emoji}
			<div
				style={{
					position: 'absolute',
					top: '-8px',
					right: '-8px',
					background: '#ff5722',
					color: 'white',
					fontSize: '10px',
					padding: '2px 4px',
					borderRadius: '4px',
					fontWeight: 'bold',
					zIndex: 1000,
					boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
				}}
			>
				L{lineNumber}
			</div>
		</div>
	) : (
		emoji
	)

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
						{emojiWithLineNumber}
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
						{emojiWithLineNumber}
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
					<div className='emoji-large'>{emojiWithLineNumber}</div>
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
					<div className='emoji-large'>{emojiWithLineNumber}</div>
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
							{emojiWithLineNumber}
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
						{emojiWithLineNumber}
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
					<div className='emoji-large'>{emojiWithLineNumber}</div>
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
					<div className='emoji-large'>{emojiWithLineNumber}</div>
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
						{emojiWithLineNumber}
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
					<div className='emoji-large'>{emojiWithLineNumber}</div>
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

// 导出 emoji 数据供调试页面使用
export const getEmojisByOperation = (operation: OperationType) => {
	const emojiLineNumbers = {
		'+': 10,
		'-': 148,
		'×': 175,
		'÷': 202,
	}

	let emojiArray: string[] = []
	switch (operation) {
		case '+':
			emojiArray = emojis.addition
			break
		case '-':
			emojiArray = emojis.subtraction
			break
		case '×':
			emojiArray = emojis.multiplication
			break
		case '÷':
			emojiArray = emojis.division
			break
	}

	return emojiArray.map((emoji, index) => ({
		emoji,
		lineNumber: emojiLineNumbers[operation] + index,
		operation,
	}))
}
