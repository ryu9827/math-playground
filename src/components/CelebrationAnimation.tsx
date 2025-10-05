import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { AnimatePresence } from 'framer-motion'
import { generateAnimations, OperationType } from '../utils/animationGenerator'
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
	const { soundEnabled } = useSelector((state: RootState) => state.settings)
	const [animationType, setAnimationType] = React.useState(0)
	const animationsRef = React.useRef(generateAnimations(operation))

	// 使用 ref 来保存最新的 onComplete，避免依赖问题
	const onCompleteRef = React.useRef(onComplete)

	React.useEffect(() => {
		onCompleteRef.current = onComplete
	}, [onComplete])

	// 当运算类型改变时，重新生成动画
	React.useEffect(() => {
		animationsRef.current = generateAnimations(operation)
	}, [operation])

	React.useEffect(() => {
		if (show) {
			// 每次显示时随机选择一个新动画（0-99）
			const newAnimationType = Math.floor(Math.random() * 100)
			setAnimationType(newAnimationType)
			console.log('CelebrationAnimation - 显示动画, 类型:', newAnimationType)

			// 根据设置播放庆祝音效
			if (soundEnabled) {
				soundEffects.playRandomCelebration()
			}

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
	}, [show, soundEnabled])

	return (
		<AnimatePresence>
			{show && (
				<div className='celebration-overlay'>
					{animationsRef.current[animationType]}
				</div>
			)}
		</AnimatePresence>
	)
}
