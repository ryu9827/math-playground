import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { AnimatePresence } from 'framer-motion'
import {
	generateAnimations,
	getPraiseText,
	OperationType,
} from '../utils/animationGenerator'
import { soundEffects } from '../utils/soundEffects'
import '../styles/CelebrationAnimations.scss'

interface CelebrationAnimationProps {
	show: boolean
	onComplete: () => void
	operation: OperationType // 根据运算类型显示不同动画
}

export const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({
	show,
	onComplete,
	operation,
}) => {
	const { soundEnabled, language } = useSelector(
		(state: RootState) => state.settings
	)
	// 初始化为 -1，表示还未选择动画
	const [animationType, setAnimationType] = React.useState(-1)
	const animationsRef = React.useRef(generateAnimations(operation, language))

	// 使用 ref 来保存最新的 onComplete，避免依赖问题
	const onCompleteRef = React.useRef(onComplete)
	const operationRef = React.useRef(operation)

	React.useEffect(() => {
		onCompleteRef.current = onComplete
	}, [onComplete])

	React.useEffect(() => {
		operationRef.current = operation
	}, [operation])

	// 当运算类型或语言改变时，重新生成动画，并重置动画类型
	React.useEffect(() => {
		animationsRef.current = generateAnimations(operation, language)
		// 重置动画类型，避免显示旧的动画
		setAnimationType(-1)
	}, [operation, language])

	React.useEffect(() => {
		if (show) {
			// 每次显示时随机选择一个新动画（0-99）
			const newAnimationType = Math.floor(Math.random() * 100)
			setAnimationType(newAnimationType)
			console.log('CelebrationAnimation - 显示动画, 类型:', newAnimationType)

			// 根据设置播放庆祝音效
			if (soundEnabled) {
				console.log('CelebrationAnimation - 开始播放庆祝音效')
				soundEffects.playRandomCelebration()

				// 直接获取当前动画对应的庆祝文字
				const praiseText = getPraiseText(
					operationRef.current,
					newAnimationType,
					language
				)
				console.log('提取的庆祝文字:', praiseText)

				// 音效结束后播放语音（庆祝音效最长600ms）
				setTimeout(() => {
					console.log('准备播放语音:', praiseText)
					const currentLanguage = language === 'zh' ? 'zh-CN' : 'en-US'
					console.log('当前语言:', currentLanguage)

					// 检查浏览器是否支持语音合成
					if ('speechSynthesis' in window) {
						// 确保语音库已加载
						const loadVoicesAndSpeak = () => {
							// 取消当前正在播放的语音
							window.speechSynthesis.cancel()

							// 创建语音实例
							const utterance = new SpeechSynthesisUtterance(praiseText)
							utterance.lang = currentLanguage
							utterance.pitch = 1.3 // 音调偏高
							utterance.rate = 1.0 // 正常语速（改为1.0，避免太快）
							utterance.volume = 1.0 // 音量最大

							// 添加事件监听
							utterance.onstart = () => {
								console.log('语音开始播放')
							}
							utterance.onend = () => {
								console.log('语音播放完成')
							}
							utterance.onerror = (event) => {
								console.error('语音播放错误:', event)
							}

							// 获取可用的语音
							const voices = window.speechSynthesis.getVoices()
							console.log(
								'可用的语音列表:',
								voices.map((v) => `${v.name} (${v.lang})`)
							)

							if (voices.length === 0) {
								console.warn('语音库未加载，稍后重试...')
								// 如果语音库未加载，等待后重试
								setTimeout(loadVoicesAndSpeak, 100)
								return
							}

							// 查找合适的女声
							const femaleVoice = voices.find((voice) => {
								if (currentLanguage === 'zh-CN') {
									return (
										voice.lang.startsWith('zh') &&
										(voice.name.includes('Female') ||
											voice.name.includes('女') ||
											voice.name.includes('Huihui') ||
											voice.name.includes('Xiaoxiao'))
									)
								} else {
									return (
										voice.lang.startsWith('en') &&
										(voice.name.includes('Female') ||
											voice.name.includes('Samantha') ||
											voice.name.includes('Victoria') ||
											voice.name.includes('Zira'))
									)
								}
							})

							if (femaleVoice) {
								console.log('选择的女声:', femaleVoice.name)
								utterance.voice = femaleVoice
							} else {
								console.log('未找到合适的女声，使用默认语音')
							}

							// 播放语音
							console.log('开始播放语音...')
							window.speechSynthesis.speak(utterance)
						}

						// 开始加载并播放
						loadVoicesAndSpeak()
					} else {
						console.warn('浏览器不支持语音合成功能')
					}
				}, 600)
			}

			const timer = setTimeout(() => {
				console.log('CelebrationAnimation - 2秒后调用 onComplete')
				onCompleteRef.current()
			}, 2000)

			// 清理函数：当组件卸载或 show 变为 false 时清除定时器
			return () => {
				console.log('CelebrationAnimation - 清理定时器')
				clearTimeout(timer)
				// 注意：不要在这里取消语音播放，让语音播放完成
				// 语音播放是异步的，不应该被组件卸载打断
			}
		}
	}, [show, soundEnabled, language])

	return (
		<AnimatePresence>
			{show && animationType >= 0 && (
				<div className='celebration-overlay'>
					{animationsRef.current[animationType]}
				</div>
			)}
		</AnimatePresence>
	)
}
