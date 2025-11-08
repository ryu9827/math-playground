import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { generateAnimations, getEmojisByOperation, OperationType } from '../utils/animationGenerator'
import { trophyEmojis } from './MilestoneReward'
import '../styles/EmojiDebugPage.scss'

type FloatingTestType = 'animals' | 'trophies' | '+' | '-' | '×' | '÷'

// 可爱的小动物 emoji（与大型庆祝动画保持一致）
const animals = [
	'🐰', // L0
	'🦊', // L1
	'🐱', // L2
	'🐶', // L3
	'🐼', // L4
	'🐨', // L5
	'🐹', // L6
	'🦄', // L7
	'🐻', // L8
	'🦁', // L9
	'🐯', // L10
	'🐸', // L11
	'🐷', // L12
	'🐮', // L13
	'🐔', // L14
	'🦆', // L15
	'🦉', // L16
	'🐝', // L17
	'🦋', // L18
	'🐞', // L19
]

interface AnimationSectionProps {
	operation: OperationType
	operationName: string
	animationCount: number
}

const AnimationSection: React.FC<AnimationSectionProps> = ({ 
	operation, 
	operationName, 
	animationCount 
}) => {
	const animations = React.useMemo(() => {
		return generateAnimations(operation, 'zh')
	}, [operation])

	return (
		<section className='emoji-category'>
			<h2 className='category-title'>
				{operationName}
				<span className='count'>（共 {animationCount} 个动画）</span>
			</h2>
			<p className='section-description'>
				使用真实的庆祝动画渲染，共生成 {animations.length} 个动画效果
			</p>
			<div className='emoji-grid'>
				{animations.slice(0, animationCount).map((animation, index) => (
					<div key={`${operation}-${index}`} className='emoji-card'>
						<div className='animation-wrapper'>
							{animation}
						</div>
						<div className='emoji-info'>
							<div className='index-number'>
								#{index + 1} | 动画类型: {index % 10}
							</div>
							<div className='animation-type'>
								{['爆炸', '跳跃', '旋转', '放大', '飘落', '脉冲', '波纹', '摇摆', '闪烁', '组合'][index % 10]}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export const EmojiDebugPage: React.FC = () => {
	const [pauseAll, setPauseAll] = useState(false)
	const [showEmojiList, setShowEmojiList] = useState(false)
	const [showFloatingTest, setShowFloatingTest] = useState(false)
	const [floatingTestType, setFloatingTestType] = useState<FloatingTestType>('animals')

	// 生成飘动的 emoji（模拟大型庆祝动画）
	const floatingEmojis = React.useMemo(() => {
		// 获取要测试的 emoji 列表
		const getTestEmojis = () => {
			if (floatingTestType === 'animals') {
				return animals.map((emoji, index) => ({ 
					emoji, 
					lineNumber: index, 
					type: 'animals' as const
				}))
			} else if (floatingTestType === 'trophies') {
				return trophyEmojis.map((emoji, index) => ({ 
					emoji, 
					lineNumber: index, 
					type: 'trophies' as const
				}))
			} else {
				return getEmojisByOperation(floatingTestType as OperationType)
			}
		}
		
		const testEmojis = getTestEmojis()
		// 动物和奖杯显示30个，其他emoji类型显示50个
		const displayCount = (floatingTestType === 'animals' || floatingTestType === 'trophies') 
			? 30 
			: Math.min(50, testEmojis.length * 2)
		
		return Array.from({ length: displayCount }, (_, idx) => {
			const emojiData = testEmojis[idx % testEmojis.length]
			const startX = (idx * 100) / displayCount // 均匀分布
			const endX = ((idx + 15) * 100) / displayCount
			const startY = 10 + (idx % 4) * 25
			const duration = 8 + (idx % 6) * 2 // 8-18秒
			const delay = (idx % 8) * 0.3 // 0-2.1秒延迟

			return { 
				emoji: emojiData.emoji,
				lineNumber: emojiData.lineNumber,
				type: floatingTestType,
				startX, 
				endX, 
				startY, 
				duration, 
				delay 
			}
		})
	}, [floatingTestType])

	// 获取当前类型的参考列表
	const referenceEmojis = React.useMemo(() => {
		if (floatingTestType === 'animals') {
			return animals.map((emoji, index) => ({ 
				emoji, 
				lineNumber: index, 
			}))
		} else if (floatingTestType === 'trophies') {
			return trophyEmojis.map((emoji, index) => ({ 
				emoji, 
				lineNumber: index, 
			}))
		} else {
			return getEmojisByOperation(floatingTestType as OperationType)
		}
	}, [floatingTestType])

	return (
		<div className={`emoji-debug-page ${pauseAll ? 'paused' : ''}`}>
			<div className='debug-header'>
				<h1>🔍 Emoji 动画测试（真实动画渲染）</h1>
				<p className='description'>
					<strong>
						🎯 这个页面使用与庆祝动画完全相同的组件和渲染方式来展示所有 emoji
					</strong>
					<br />
					每个 emoji 都会以 10 种不同的动画效果循环展示
					（爆炸、跳跃、旋转、放大、飘落、脉冲、波纹、摇摆、闪烁、组合效果）
					<br />
					<strong className='warning'>
						⚠️ 如果你看到方框 □ 或问号 �，说明该 emoji
						在你的浏览器/系统中不支持
					</strong>
					<br />
					这是真实的庆祝动画效果，能够发现实际使用中的渲染问题
				</p>
				<div className='controls'>
					<button
						className={`toggle-btn ${!pauseAll ? 'active' : ''}`}
						onClick={() => setPauseAll(!pauseAll)}
					>
						{pauseAll ? '▶️ 恢复动画' : '⏸️ 暂停所有动画'}
					</button>
					<button
						className='toggle-btn'
						onClick={() => setShowEmojiList(!showEmojiList)}
					>
						{showEmojiList ? '🎬 显示动画' : '📋 显示 Emoji 列表'}
					</button>
					<button
						className={`toggle-btn ${showFloatingTest ? 'active' : ''}`}
						onClick={() => setShowFloatingTest(!showFloatingTest)}
					>
						{showFloatingTest ? '🎬 隐藏飘动测试' : '🎆 测试飘动 Emoji'}
					</button>
					<div className='info-text'>
						💡 提示：{showEmojiList ? '列表模式显示所有原始emoji' : '点击暂停可以方便查看哪些 emoji 显示异常'}
					</div>
				</div>
			</div>

			{/* 飘动 Emoji 测试区域 */}
			{showFloatingTest && (
				<div className='floating-animals-test'>
					<div className='test-header'>
						<h2>🎆 飘动 Emoji 测试（大型庆祝动画效果）</h2>
						<p className='test-description'>
							这个测试区域模拟大型庆祝动画（GoalAchievedAnimation 和 MilestoneReward）中的飘动效果。
							<br />
							<strong>选择要测试的 emoji 类型</strong>，每个 emoji 都会显示其行号。
							<br />
							<strong className='warning'>
								⚠️ 如果你看到方框 □ 或问号 �，说明该 emoji 在大型庆祝动画中也会出现问题！
							</strong>
						</p>
						<div className='test-type-selector'>
							<label>选择测试类型：</label>
							<select 
								value={floatingTestType} 
								onChange={(e) => setFloatingTestType(e.target.value as FloatingTestType)}
								className='type-select'
							>
								<option value='animals'>🐰 小动物 (20种)</option>
								<option value='trophies'>🏆 大型奖杯 (12种)</option>
								<option value='+'>➕ 加法 Emoji (139种)</option>
								<option value='-'>➖ 减法 Emoji (25种)</option>
								<option value='×'>✖️ 乘法 Emoji (25种)</option>
								<option value='÷'>➗ 除法 Emoji (25种)</option>
							</select>
							<span className='type-info'>
								当前显示：{
									floatingTestType === 'animals' ? '30个飘动动物' : 
									floatingTestType === 'trophies' ? '30个飘动奖杯' :
									`50个飘动emoji（循环显示）`
								}
							</span>
						</div>
					</div>
					<div className='floating-test-container'>
						{floatingEmojis.map((item, index) => (
							<motion.div
								key={`test-emoji-${index}`}
								className='test-floating-animal'
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
									repeat: Infinity,
									repeatDelay: 1,
								}}
							>
								<span style={{ position: 'relative', display: 'inline-block' }}>
									{item.emoji}
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
										L{item.lineNumber}
									</span>
								</span>
							</motion.div>
						))}
					</div>
					<div className='animals-reference'>
						<h3>📋 {
							floatingTestType === 'animals' ? '小动物' : 
							floatingTestType === 'trophies' ? '大型奖杯' :
							`${floatingTestType} 运算 Emoji`
						} 索引参考</h3>
						<div className='animals-grid'>
							{referenceEmojis.map((item, index) => (
								<div key={`ref-${index}`} className='animal-ref-item'>
									<span className='animal-emoji'>{item.emoji}</span>
									<span className='animal-index'>L{item.lineNumber}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{showEmojiList ? (
				<>
					<div className='emoji-list-section'>
						<h2>📝 Emoji 源代码列表（可直接复制检查）</h2>
						<p>
							💡 提示：在列表模式下，你可以看到所有 emoji 的原始显示。
							如果某个 emoji 在这里显示正常，但在动画中显示异常，
							可能是该 emoji 在特定 CSS 变换或动画效果下有问题。
						</p>
						
						<div className='emoji-static-grid'>
							<div className='emoji-category-static'>
								<h3>➕ 加法 (139个)</h3>
								<div className='emoji-row'>
									<span>😊 🎉 🌟 ✨ 🎊 🎈 🎁 🏆 🌈 ⭐ 💫 🌸 🌺 🌻 🌼 🌷 🍀 🦋 🐝 🐞</span>
									<span>🎯 🎪 🎨 🦄 🐰 🎀 🍭 🧸 🎂 🍓 🦊 🐱 🎬 🌞 🌝 💖 💝 💗 💓 💕</span>
									<span>💞 💘 💌 🎵 🎶 🎼 🎤 🎧 🎸 🎹 🥁 🎺 🎷 🎻 🎸 🌹 🌺 🌴 🌵 🌾</span>
									<span>🌿 🍁 🍂 🍃 🐦 🐦 🐦 🦆 🐦 🦅 🦆 🐣 🐤 🐥 🐦 🐧 🦉 🐸 🐢 🦎</span>
									<span>🐙 🐙 🦀 🦀 🐠 🐟 🐡 🐬 🐳 🐋 🐟 🐅 🐆 🐴 🐵 🐵 🐘 🦏 🦏 🐪</span>
									<span>🐫 🐫 🐨 🦒 🐃 🐂 🐄 🐎 🐖 🐏 🐑 🐫 🐐 🐕 🐩 🐕 🐈 🐓 🦃 🐦</span>
									<span>🐦 🦆 🐦 🐦 🐇 🐻 🦔 🦔 🦔 🐻 🐁 🐀 🐹 🐭 🐰</span>
								</div>
							</div>

							<div className='emoji-category-static'>
								<h3>➖ 减法 (25个)</h3>
								<div className='emoji-row'>
									<span>🤔 🧠 💡 🔍 📚 ✏ 📝 🎓 🦉 🧩</span>
									<span>🎲 🔬 🔭 🧪 🧪 📊 📈 🔑 🔑 🎯</span>
									<span>🧮 💎 🏅 🌟 ⭐</span>
								</div>
							</div>

							<div className='emoji-category-static'>
								<h3>✖️ 乘法 (25个)</h3>
								<div className='emoji-row'>
									<span>🚀 ⚡ 💥 🔥 💪 💪 💪 🎸 🎵 🎶</span>
									<span>🎤 🥁 🎺 🎷 🎻 🏃 ⚽ 🏀 🎾 🏐</span>
									<span>🏈 ⚾ 🥊 🏋 🤸</span>
								</div>
							</div>

							<div className='emoji-category-static'>
								<h3>➗ 除法 (25个)</h3>
								<div className='emoji-row'>
									<span>🧘 🕉 ☯ 🎋 🍃 🌿 🌾 🌱 🪴 🐦</span>
									<span>🦆 🐦 🐬 🐳 🐋 🌊 🏝 🗻 🌄 🌅</span>
									<span>🌌 🌙 ⭐ 💫 ✨</span>
								</div>
							</div>
						</div>

						<div className='comparison-note'>
							<h4>🔍 检查方法</h4>
							<ul>
								<li>✅ <strong>所有 emoji 都显示正常</strong> - 说明你的系统支持很好！</li>
								<li>⚠️ <strong>某些显示为 □ 或 �</strong> - 记录这些 emoji，需要在源代码中替换</li>
								<li>💡 <strong>对比动画模式</strong> - 切换回动画模式，看是否有 emoji 只在动画中出问题</li>
								<li>📱 <strong>测试不同设备</strong> - 在手机、平板或其他浏览器上测试</li>
							</ul>
						</div>
					</div>
				</>
			) : (
				<>
					<AnimationSection 
						operation='+' 
						operationName='➕ 加法动画' 
						animationCount={139}
					/>

					<AnimationSection
						operation='-'
						operationName='➖ 减法动画'
						animationCount={25}
					/>

					<AnimationSection
						operation='×'
						operationName='✖️ 乘法动画'
						animationCount={25}
					/>

					<AnimationSection
						operation='÷'
						operationName='➗ 除法动画'
						animationCount={25}
					/>
				</>
			)}

			<div className='debug-footer'>
				<h3>📊 统计信息</h3>
				<ul>
					<li>加法: 139 个 emoji</li>
					<li>减法: 25 个 emoji</li>
					<li>乘法: 25 个 emoji</li>
					<li>除法: 25 个 emoji</li>
					<li>
						<strong>总计: 214 个 emoji</strong>
					</li>
				</ul>
				<div className='tips'>
					<h4>💡 使用提示</h4>
					<ol>
						<li>
							<strong>这是真实的庆祝动画！</strong>
							使用完全相同的代码和渲染逻辑
						</li>
						<li>每个 emoji 会以 10 种不同的动画效果展示</li>
						<li>仔细查看动画过程中是否有 emoji 显示为方框 □ 或问号 �</li>
						<li>
							记录下无法显示或显示异常的 emoji，在{' '}
							<code>src/utils/animationGenerator.tsx</code> 中进行替换
						</li>
						<li>
							建议使用更通用、兼容性更好的 emoji（Emoji 11.0 或更早版本）
						</li>
					</ol>
				</div>
			</div>
		</div>
	)
}
