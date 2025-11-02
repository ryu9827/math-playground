import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { motion, AnimatePresence } from 'framer-motion'
import { CelebrationAnimation } from './CelebrationAnimation'
import {
	incrementQuestionsAnswered,
	checkMilestone,
	getMilestoneCount,
	hasGoalBeenAchieved,
	markGoalAchieved,
} from '../utils/dailyStats'
import '../styles/NumberSplit.scss'

interface SplitPair {
	num1: number
	num2: number
}

interface InputStatus {
	isCorrect: boolean
	isDuplicate: boolean
	isWrongSum: boolean
}

interface NumberSplitProps {
	onGoalAchieved?: () => void
	onMilestoneAchieved?: (milestone: number, milestoneCount: number) => void
}

export const NumberSplit: React.FC<NumberSplitProps> = ({
	onGoalAchieved,
	onMilestoneAchieved,
}) => {
	const { language, numberSplitMaxTarget, dailyGoal } = useSelector(
		(state: RootState) => state.settings
	)

	const [targetNumber, setTargetNumber] = useState(7)
	const previousTargetNumberRef = useRef<number | null>(null)
	const [allPairs, setAllPairs] = useState<SplitPair[]>([])
	const [userInputs, setUserInputs] = useState<
		{ num1: string; num2: string }[]
	>([])
	const [correctPairs, setCorrectPairs] = useState<Set<string>>(new Set())
	const [inputStatuses, setInputStatuses] = useState<InputStatus[]>([])
	const [showCelebration, setShowCelebration] = useState(false)
	const [allCompleted, setAllCompleted] = useState(false)

	// 生成新题目
	const generateNewQuestion = useCallback(() => {
		// 使用设置中的上限，随机生成 3 到 numberSplitMaxTarget 之间的数字
		const maxTarget = Math.max(3, Math.min(100, numberSplitMaxTarget)) // 确保在有效范围内

		let num: number
		// 如果有上一次的目标数字，确保新数字不同
		if (previousTargetNumberRef.current !== null) {
			do {
				num = Math.floor(Math.random() * (maxTarget - 2)) + 3
			} while (num === previousTargetNumberRef.current && maxTarget - 2 > 1) // 只要有多个选择，就避免重复
		} else {
			num = Math.floor(Math.random() * (maxTarget - 2)) + 3
		}

		previousTargetNumberRef.current = num
		setTargetNumber(num)

		// 生成所有可能的拆分组合（不考虑顺序，只取 a <= b 的组合）
		const pairs: SplitPair[] = []
		for (let i = 1; i < num; i++) {
			const j = num - i
			if (i <= j) {
				pairs.push({ num1: i, num2: j })
			}
		}
		setAllPairs(pairs)

		// 初始化输入框（根据组合数量）
		setUserInputs(pairs.map(() => ({ num1: '', num2: '' })))
		setInputStatuses(
			pairs.map(() => ({
				isCorrect: false,
				isDuplicate: false,
				isWrongSum: false,
			}))
		)
		setCorrectPairs(new Set())
		setShowCelebration(false)
		setAllCompleted(false)
	}, [numberSplitMaxTarget])

	useEffect(() => {
		generateNewQuestion()
	}, [generateNewQuestion])

	// 检查用户输入是否正确
	const checkInput = (index: number, num1: string, num2: string) => {
		if (!num1 || !num2) return false

		const n1 = parseInt(num1)
		const n2 = parseInt(num2)

		if (isNaN(n1) || isNaN(n2)) return false

		// 检查是否和为目标数字
		if (n1 + n2 !== targetNumber) return false

		// 检查是否是有效的拆分（都是正整数）
		if (n1 < 1 || n2 < 1) return false

		// 标准化（小的数字在前）
		const [small, large] = n1 <= n2 ? [n1, n2] : [n2, n1]
		const key = `${small}+${large}`

		// 检查是否已经输入过这个组合
		if (correctPairs.has(key)) return false

		return true
	}

	// 处理输入变化
	const handleInputChange = (
		index: number,
		field: 'num1' | 'num2',
		value: string
	) => {
		const newInputs = [...userInputs]
		const oldInput = { ...newInputs[index] }
		newInputs[index][field] = value
		setUserInputs(newInputs)

		const newStatuses = [...inputStatuses]

		// 如果当前行之前是正确的，并且用户正在修改它，需要从 correctPairs 中移除旧的组合
		if (inputStatuses[index].isCorrect) {
			const oldN1 = parseInt(oldInput.num1)
			const oldN2 = parseInt(oldInput.num2)
			if (!isNaN(oldN1) && !isNaN(oldN2)) {
				const [oldSmall, oldLarge] =
					oldN1 <= oldN2 ? [oldN1, oldN2] : [oldN2, oldN1]
				const oldKey = `${oldSmall}+${oldLarge}`

				// 从 correctPairs 中移除旧的组合
				const newCorrectPairs = new Set(correctPairs)
				newCorrectPairs.delete(oldKey)
				setCorrectPairs(newCorrectPairs)

				// 更新完成状态
				setAllCompleted(false)
			}
		}

		// 如果两个输入框都有值，检查是否正确
		const { num1, num2 } = newInputs[index]
		if (num1 && num2) {
			const n1 = parseInt(num1)
			const n2 = parseInt(num2)

			if (!isNaN(n1) && !isNaN(n2) && n1 > 0 && n2 > 0) {
				// 检查和是否正确
				if (n1 + n2 !== targetNumber) {
					newStatuses[index] = {
						isCorrect: false,
						isDuplicate: false,
						isWrongSum: true,
					}
					setInputStatuses(newStatuses)
					return
				}

				// 标准化（小的数字在前）
				const [small, large] = n1 <= n2 ? [n1, n2] : [n2, n1]
				const key = `${small}+${large}`

				// 检查是否重复
				if (correctPairs.has(key)) {
					newStatuses[index] = {
						isCorrect: false,
						isDuplicate: true,
						isWrongSum: false,
					}
					setInputStatuses(newStatuses)
					return
				}

				// 正确且不重复
				if (checkInput(index, num1, num2)) {
					const newCorrectPairs = new Set(correctPairs)
					newCorrectPairs.add(key)
					setCorrectPairs(newCorrectPairs)

					newStatuses[index] = {
						isCorrect: true,
						isDuplicate: false,
						isWrongSum: false,
					}
					setInputStatuses(newStatuses)

					// 检查是否全部完成
					if (newCorrectPairs.size === allPairs.length) {
						setAllCompleted(true)
					}
				}
			} else {
				newStatuses[index] = {
					isCorrect: false,
					isDuplicate: false,
					isWrongSum: false,
				}
				setInputStatuses(newStatuses)
			}
		} else {
			newStatuses[index] = {
				isCorrect: false,
				isDuplicate: false,
				isWrongSum: false,
			}
			setInputStatuses(newStatuses)
		}
	}

	// 处理提交（全部答对后）
	const handleSubmit = () => {
		// 批量增加每日答题计数（所有正确的组合一起算）
		const correctCount = correctPairs.size
		let finalCount = 0
		for (let i = 0; i < correctCount; i++) {
			finalCount = incrementQuestionsAnswered()
		}

		// 触发一个自定义事件，通知 DailyStats 组件更新
		window.dispatchEvent(new Event('dailyStatsUpdated'))

		// 检查是否达到每日目标
		if (finalCount >= dailyGoal && !hasGoalBeenAchieved()) {
			markGoalAchieved()
			if (onGoalAchieved) {
				// 延迟触发目标动画
				setTimeout(() => {
					onGoalAchieved()
				}, 1000)
			}
		}

		// 检查是否达到新的里程碑
		const newMilestone = checkMilestone(dailyGoal)
		if (newMilestone && onMilestoneAchieved) {
			const milestoneCount = getMilestoneCount(newMilestone, dailyGoal)
			// 延迟触发里程碑动画
			setTimeout(() => {
				onMilestoneAchieved(newMilestone, milestoneCount)
			}, 1500)
		}

		// 显示全屏庆祝动画
		setShowCelebration(true)
	}

	// 庆祝动画完成后的回调
	const handleCelebrationComplete = useCallback(() => {
		setShowCelebration(false)
		// 自动进入下一题
		generateNewQuestion()
	}, [generateNewQuestion])

	return (
		<div className='number-split'>
			<motion.div
				className='split-card'
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
			>
				<h2 className='split-title'>
					{language === 'zh' ? '拆数字' : 'Number Split'}
				</h2>

				<div className='target-number'>
					<span className='target-label'>
						{language === 'zh' ? '目标数字：' : 'Target Number: '}
					</span>
					<span className='target-value'>{targetNumber}</span>
				</div>

				<p className='split-instruction'>
					{language === 'zh'
						? `请找出所有可以拆分 ${targetNumber} 的两个正整数组合：`
						: `Find all pairs of positive integers that sum to ${targetNumber}:`}
				</p>

				<div className='split-inputs'>
					{allPairs.map((pair, index) => (
						<motion.div
							key={index}
							className='input-row'
							initial={{ x: -20, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: index * 0.1 }}
						>
							<input
								type='number'
								min='1'
								className='split-input'
								value={userInputs[index]?.num1 || ''}
								onChange={(e) =>
									handleInputChange(index, 'num1', e.target.value)
								}
							/>
							<span className='plus-sign'>+</span>
							<input
								type='number'
								min='1'
								className='split-input'
								value={userInputs[index]?.num2 || ''}
								onChange={(e) =>
									handleInputChange(index, 'num2', e.target.value)
								}
							/>
							<span className='equals-sign'>=</span>
							<span className='result-number'>{targetNumber}</span>

							<AnimatePresence>
								{inputStatuses[index]?.isCorrect && (
									<motion.div
										className='check-mark'
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										exit={{ scale: 0 }}
										transition={{ type: 'spring', stiffness: 500 }}
									>
										✓
									</motion.div>
								)}
								{inputStatuses[index]?.isDuplicate && (
									<motion.div
										className='duplicate-mark'
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										exit={{ scale: 0 }}
										transition={{ type: 'spring', stiffness: 500 }}
									>
										{language === 'zh' ? '重复' : 'Duplicate'}
									</motion.div>
								)}
								{inputStatuses[index]?.isWrongSum && (
									<motion.div
										className='wrong-mark'
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										exit={{ scale: 0 }}
										transition={{ type: 'spring', stiffness: 500 }}
									>
										✗
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>

				<div className='progress-info'>
					<span>
						{language === 'zh' ? '已找到：' : 'Found: '}
						<strong>
							{correctPairs.size} / {allPairs.length}
						</strong>
					</span>
					{allCompleted && !showCelebration && (
						<motion.button
							className='submit-button'
							onClick={handleSubmit}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{language === 'zh' ? '下一题' : 'Next'}
						</motion.button>
					)}
				</div>
			</motion.div>

			<CelebrationAnimation
				show={showCelebration}
				onComplete={handleCelebrationComplete}
				operation='+'
			/>
		</div>
	)
}
