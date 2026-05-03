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
	const animationsRef = React.useRef(
		generateAnimations(operation, language, true)
	)

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
		animationsRef.current = generateAnimations(operation, language, true)
		// 重置动画类型，避免显示旧的动画
		setAnimationType(-1)
	}, [operation, language])

	React.useEffect(() => {
		if (show) {
			// 每次显示时随机选择一个新动画
			// 加法有200种动画（0-199），其他运算有100种（0-99）
			const maxAnimations = operation === '+' ? 200 : 100
			const newAnimationType = Math.floor(Math.random() * maxAnimations)
			setAnimationType(newAnimationType)

			// 根据设置播放庆祝音效
			if (soundEnabled) {
				soundEffects.playRandomCelebration()

				// 直接获取当前动画对应的庆祝文字
				const praiseText = getPraiseText(
					operationRef.current,
					newAnimationType,
					language
				)

				// 音效结束后播放语音（庆祝音效最长600ms）
				setTimeout(() => {
					const currentLanguage = language === 'zh' ? 'zh-CN' : 'en-US'

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
							utterance.rate = 1.0 // 正常语速
							utterance.volume = 1.0 // 音量最大

							// 添加错误监听
							utterance.onerror = (event) => {
								console.error('语音播放错误:', event)
							}

							// 获取可用的语音
							const voices = window.speechSynthesis.getVoices()

							if (voices.length === 0) {
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
								utterance.voice = femaleVoice
							}

							window.speechSynthesis.speak(utterance)
						}

						// 开始加载并播放
						loadVoicesAndSpeak()
					}
				}, 600)
			}

			const timer = setTimeout(() => {
				onCompleteRef.current()
			}, 2000)

			// 清理函数：当组件卸载或 show 变为 false 时清除定时器
			return () => {
				clearTimeout(timer)
				// 注意：不要在这里取消语音播放，让语音播放完成
			}
		}
	}, [show, soundEnabled, language, operation])

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
