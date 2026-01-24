import { ReactElement } from 'react'
import { motion } from 'framer-motion'

// 定义运算类型
export type OperationType = '+' | '-' | '×' | '÷'

// Emoji 集合
const emojis = {
	addition: [
		{ number: 1, value: '😊' },
		{ number: 2, value: '🎉' },
		{ number: 3, value: '🌟' },
		{ number: 4, value: '✨' },
		{ number: 5, value: '🎊' },
		{ number: 6, value: '🎈' },
		{ number: 7, value: '🎁' },
		{ number: 8, value: '🏆' },
		{ number: 9, value: '⭐' },
		{ number: 10, value: '💫' },
		{ number: 11, value: '🌸' },
		{ number: 12, value: '🌺' },
		{ number: 13, value: '🌻' },
		{ number: 14, value: '🍀' },
		{ number: 15, value: '🦋' },
		{ number: 16, value: '🐝' },
		{ number: 17, value: '🐞' },
		{ number: 18, value: '🎯' },
		{ number: 19, value: '🎪' },
		{ number: 20, value: '🎨' },
		{ number: 21, value: '🦄' },
		{ number: 22, value: '🐰' },
		{ number: 23, value: '🎀' },
		{ number: 24, value: '🍭' },
		{ number: 25, value: '🧸' },
		{ number: 26, value: '🎂' },
		{ number: 27, value: '🍓' },
		{ number: 28, value: '🦊' },
		{ number: 29, value: '🐱' },
		{ number: 30, value: '🎬' },
		// 新增emoji，删除了2个无法正常显示的emoji（原L8彩虹和L14花朵），当前共133个
		{ number: 31, value: '🌞' },
		{ number: 32, value: '🌝' },
		{ number: 33, value: '💖' },
		{ number: 34, value: '💝' },
		{ number: 35, value: '💗' },
		{ number: 36, value: '💓' },
		{ number: 37, value: '💕' },
		{ number: 38, value: '💞' },
		{ number: 39, value: '💘' },
		{ number: 40, value: '💌' },
		{ number: 41, value: '🎵' },
		{ number: 42, value: '🎶' },
		{ number: 43, value: '🎼' },
		{ number: 44, value: '🎤' },
		{ number: 45, value: '🎧' },
		{ number: 46, value: '🎸' },
		{ number: 47, value: '🎹' },
		{ number: 48, value: '🥁' },
		{ number: 49, value: '🎺' },
		{ number: 50, value: '🎷' },
		{ number: 51, value: '🎻' },
		{ number: 52, value: '🎸' },
		{ number: 53, value: '🌹' },
		{ number: 54, value: '🌺' },
		{ number: 55, value: '🌴' },
		{ number: 56, value: '🌵' },
		{ number: 57, value: '🌾' },
		{ number: 58, value: '🌿' },
		{ number: 59, value: '🍁' },
		{ number: 60, value: '🍂' },
		{ number: 61, value: '🍃' },
		{ number: 62, value: '🐦' },
		{ number: 63, value: '🐦' },
		{ number: 64, value: '🐦' },
		{ number: 65, value: '🦆' },
		{ number: 66, value: '🐦' },
		{ number: 67, value: '🦅' },
		{ number: 68, value: '🦆' },
		{ number: 69, value: '🐣' },
		{ number: 70, value: '🐤' },
		{ number: 71, value: '🐥' },
		{ number: 72, value: '🐦' },
		{ number: 73, value: '🐧' },
		{ number: 74, value: '🦉' },
		{ number: 75, value: '🐸' },
		{ number: 76, value: '🐢' },
		{ number: 77, value: '🦎' },
		{ number: 78, value: '🐙' },
		{ number: 79, value: '🐙' },
		{ number: 80, value: '🦀' },
		{ number: 81, value: '🦀' },
		{ number: 82, value: '🐠' },
		{ number: 83, value: '🐟' },
		{ number: 84, value: '🐡' },
		{ number: 85, value: '🐬' },
		{ number: 86, value: '🐳' },
		{ number: 87, value: '🐋' },
		{ number: 88, value: '🐟' },
		{ number: 89, value: '🐅' },
		{ number: 90, value: '🐆' },
		{ number: 91, value: '🐴' },
		{ number: 92, value: '🐵' },
		{ number: 93, value: '🐵' },
		{ number: 94, value: '🐘' },
		{ number: 95, value: '🦏' },
		{ number: 96, value: '🦏' },
		{ number: 97, value: '🐪' },
		{ number: 98, value: '🐫' },
		{ number: 99, value: '🐫' },
		{ number: 100, value: '🐨' },
		{ number: 101, value: '🦒' },
		{ number: 102, value: '🐃' },
		{ number: 103, value: '🐂' },
		{ number: 104, value: '🐄' },
		{ number: 105, value: '🐎' },
		{ number: 106, value: '🐖' },
		{ number: 107, value: '🐏' },
		{ number: 108, value: '🐑' },
		{ number: 109, value: '🐫' },
		{ number: 110, value: '🐐' },
		{ number: 111, value: '🐕' },
		{ number: 112, value: '🐩' },
		{ number: 113, value: '🐕' },
		{ number: 114, value: '🐈' },
		{ number: 115, value: '🐓' },
		{ number: 116, value: '🦃' },
		{ number: 117, value: '🐦' },
		{ number: 118, value: '🐦' },
		{ number: 119, value: '🦆' },
		{ number: 120, value: '🐦' },
		{ number: 121, value: '🐦' },
		{ number: 122, value: '🐇' },
		{ number: 123, value: '🐻' },
		{ number: 124, value: '🦔' },
		{ number: 125, value: '🦔' },
		{ number: 126, value: '🦔' },
		{ number: 127, value: '🐻' },
		{ number: 128, value: '🐁' },
		{ number: 129, value: '🐀' },
		{ number: 130, value: '🐹' },
		{ number: 131, value: '🐭' },
		{ number: 132, value: '🐰' },
	],
	subtraction: [
		{ number: 133, value: '🤔' },
		{ number: 134, value: '🧠' },
		{ number: 135, value: '💡' },
		{ number: 136, value: '🔍' },
		{ number: 137, value: '📚' },
		{ number: 138, value: '✏' },
		{ number: 139, value: '📝' },
		{ number: 140, value: '🎓' },
		{ number: 141, value: '🦉' },
		{ number: 142, value: '🧩' },
		{ number: 143, value: '🎲' },
		{ number: 144, value: '🔬' },
		{ number: 145, value: '🔭' },
		{ number: 146, value: '🧪' },
		{ number: 147, value: '🧪' },
		{ number: 148, value: '📊' },
		{ number: 149, value: '📈' },
		{ number: 150, value: '🔑' },
		{ number: 151, value: '🔑' },
		{ number: 152, value: '🎯' },
		{ number: 153, value: '🧮' },
		{ number: 154, value: '💎' },
		{ number: 155, value: '🏅' },
		{ number: 156, value: '🌟' },
		{ number: 157, value: '⭐' },
	],
	multiplication: [
		{ number: 158, value: '🚀' },
		{ number: 159, value: '⚡' },
		{ number: 160, value: '💥' },
		{ number: 161, value: '🔥' },
		{ number: 162, value: '💪' },
		{ number: 163, value: '💪' },
		{ number: 164, value: '💪' },
		{ number: 165, value: '🎸' },
		{ number: 166, value: '🎵' },
		{ number: 167, value: '🎶' },
		{ number: 168, value: '🎤' },
		{ number: 169, value: '🥁' },
		{ number: 170, value: '🎺' },
		{ number: 171, value: '🎷' },
		{ number: 172, value: '🎻' },
		{ number: 173, value: '🏃' },
		{ number: 174, value: '⚽' },
		{ number: 175, value: '🏀' },
		{ number: 176, value: '🎾' },
		{ number: 177, value: '🏐' },
		{ number: 178, value: '🏈' },
		{ number: 179, value: '⚾' },
		{ number: 180, value: '🥊' },
		{ number: 181, value: '🏋' },
		{ number: 182, value: '🤸' },
	],
	division: [
		{ number: 183, value: '🧘' },
		{ number: 184, value: '🕉' },
		{ number: 185, value: '☯' },
		{ number: 186, value: '🎋' },
		{ number: 187, value: '🍃' },
		{ number: 188, value: '🌿' },
		{ number: 189, value: '🌾' },
		{ number: 190, value: '🌱' },
		{ number: 191, value: '🪴' },
		{ number: 192, value: '🐦' },
		{ number: 193, value: '🦆' },
		{ number: 194, value: '🐦' },
		{ number: 195, value: '🐬' },
		{ number: 196, value: '🐳' },
		{ number: 197, value: '🐋' },
		{ number: 198, value: '🌊' },
		{ number: 199, value: '🏝' },
		{ number: 200, value: '🗻' },
		{ number: 201, value: '🌄' },
		{ number: 202, value: '🌅' },
		{ number: 203, value: '🌌' },
		{ number: 204, value: '🌙' },
		{ number: 205, value: '⭐' },
		{ number: 206, value: '💫' },
		{ number: 207, value: '✨' },
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

/**
 * Emoji 编号系统（用于调试模式）
 * ================================
 * 新规则：每个 emoji 对象包含 number 和 value 属性
 * - number: emoji 的唯一编号（1-207，跨所有运算类型）
 * - value: emoji 字符本身
 *
 * 编号范围分配：
 * - addition: 1-132 (132 个)
 * - subtraction: 133-157 (25 个)
 * - multiplication: 158-182 (25 个)
 * - division: 183-207 (25 个)
 *
 * 显示格式：在调试模式下，emoji 右上角会显示编号标签
 * 例如：{ number: 8, value: '�' } → 显示为 🏆 带标签 "8"
 *
 * 这样即使删除某些 emoji，其他 emoji 的编号也不会变化，便于追踪和调试
 */

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

	// 🔍 DEBUG MODE: 只显示 L8 和 L14 用于检查
	const debugMode = true // TODO: 改回 false 恢复正常
	if (debugMode && showDebugInfo) {
		// 只创建 L8 (索引7) 和 L14 (索引13)
		const testIndices = [7, 13]
		testIndices.forEach((emojiIndex, i) => {
			const emojiItem = emojiSet[emojiIndex]
			const emoji = typeof emojiItem === 'string' ? emojiItem : emojiItem.value
			const emojiNumber =
				typeof emojiItem === 'string' ? emojiIndex + 1 : emojiItem.number
			const praise = praiseSet[0]
			const color = colors[0]

			// 创建静止的动画（type 999 表示静止）
			animations.push(
				createAnimation(
					999, // 特殊的静止动画类型
					emoji,
					praise,
					color,
					i,
					emojiNumber // 使用 emoji 对象的 number 属性
				)
			)
		})
		return animations
	}

	// 加法生成200个动画，其他运算生成100个
	const animationCount = operation === '+' ? 200 : 100
	for (let i = 0; i < animationCount; i++) {
		const emojiIndex = i % emojiSet.length
		const emojiItem = emojiSet[emojiIndex]
		const emoji = typeof emojiItem === 'string' ? emojiItem : emojiItem.value
		const emojiNumber =
			typeof emojiItem === 'string' ? emojiIndex + 1 : emojiItem.number
		const praise = praiseSet[i % praiseSet.length]
		const color = colors[i % colors.length]
		const animationIndex = i % 10 // 使用10种基本动画模式

		animations.push(
			createAnimation(
				animationIndex,
				emoji,
				praise,
				color,
				i,
				showDebugInfo ? emojiNumber : undefined // 使用 emoji 对象的 number 属性
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

	// 如果提供了行号，在 emoji 旁边显示编号标签
	const emojiWithLineNumber = lineNumber ? (
		<div style={{ position: 'relative', display: 'inline-block' }}>
			<span style={{ fontSize: '1em' }}>{emoji}</span>
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
				{lineNumber}
			</div>
		</div>
	) : (
		emoji
	)

	// 🔍 DEBUG: 静止动画，用于检查 emoji
	if (type === 999) {
		return (
			<div
				key={key}
				style={{
					position: 'fixed',
					top: lineNumber === 8 ? '200px' : '350px', // L8 在上，L14 在下
					left: '50%',
					transform: 'translateX(-50%)',
					fontSize: '80px',
					zIndex: 9999,
				}}
			>
				{emojiWithLineNumber}
			</div>
		)
	}

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

/**
 * 导出 emoji 数据供调试页面使用
 * 返回指定运算类型的所有 emoji 及其行号标签
 */
export const getEmojisByOperation = (operation: OperationType) => {
	let emojiArray: (string | { number: number; value: string })[] = []
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

	return emojiArray.map((emojiItem, index) => {
		const emoji = typeof emojiItem === 'string' ? emojiItem : emojiItem.value
		const lineNumber =
			typeof emojiItem === 'string' ? index + 1 : emojiItem.number
		return {
			emoji,
			lineNumber,
			operation,
		}
	})
}
