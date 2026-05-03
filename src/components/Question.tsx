import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import {
	setUserAnswer,
	submitAnswer,
	resetResult,
	setCurrentQuestion,
} from '../store/questionsSlice'
import { translations } from '../utils/i18n'
import {
	generateNewQuestion,
	generateOptions,
} from '../utils/questionGenerator'
import { generateWordProblem } from '../utils/wordProblemGenerator'
import {
	incrementQuestionsAnswered,
	checkMilestone,
	getMilestoneCount,
} from '../utils/dailyStats'
import { setWordProblemMode } from '../store/settingsSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { OperationType } from '../App'
import { CelebrationAnimation } from './CelebrationAnimation'
import '../styles/Question.scss'

interface QuestionProps {
	operation: OperationType
	onGoalAchieved: () => void
	onMilestoneAchieved: (milestone: number, milestoneCount: number) => void
}

export const Question: React.FC<QuestionProps> = ({
	operation,
	onGoalAchieved,
	onMilestoneAchieved,
}) => {
	const dispatch = useDispatch()
	const { currentQuestion, showResult, isCorrect, wrongQuestions } =
		useSelector((state: RootState) => state.questions)
	const { language, dailyGoal, wordProblemMode, operationLimits, divisionDivisorMax } = useSelector(
		(state: RootState) => state.settings
	)
	const t = translations[language]

	// 获取当前运算类型的应用题模式状态
	const currentWordProblemMode = wordProblemMode[operation]
	// 获取当前运算类型的上下限
	const currentLimits = operationLimits[operation]

	const [options, setOptions] = useState<number[]>([])
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
	const [showCelebration, setShowCelebration] = useState(false)

	// 使用 ref 跟踪上一次的 operation (初始化为 null 表示首次加载)
	const prevOperationRef = useRef<OperationType | null>(null)

	// 使用 ref 保存最新的值，避免作为依赖触发 useEffect
	const wrongQuestionsRef = useRef(wrongQuestions)
	const currentQuestionRef = useRef(currentQuestion)
	const currentLimitsRef = useRef(currentLimits)
	const currentWordProblemModeRef = useRef(currentWordProblemMode)
	const divisionDivisorMaxRef = useRef(divisionDivisorMax)

	useEffect(() => {
		wrongQuestionsRef.current = wrongQuestions
	}, [wrongQuestions])

	useEffect(() => {
		currentQuestionRef.current = currentQuestion
	}, [currentQuestion])

	useEffect(() => {
		currentLimitsRef.current = currentLimits
	}, [currentLimits])

	useEffect(() => {
		currentWordProblemModeRef.current = currentWordProblemMode
	}, [currentWordProblemMode])

	useEffect(() => {
		divisionDivisorMaxRef.current = divisionDivisorMax
	}, [divisionDivisorMax])

	useEffect(() => {
		// 当运算类型改变时，生成新问题
		if (prevOperationRef.current !== operation) {
			prevOperationRef.current = operation

			// 检查是否从错题本来的（已经有匹配的题目）
			const hasMatchingQuestion =
				currentQuestionRef.current &&
				currentQuestionRef.current.operation === operation

			if (hasMatchingQuestion) {
				// 从错题本来的，保持题目，只重置状态
				setSelectedAnswer(null)
				setShowCelebration(false)
				// 不需要生成新题目，也不需要 dispatch，因为 WrongQuestions 已经设置了
			} else {
				// 正常切换，生成新题目
				const newQuestion = generateNewQuestion(
					currentLimitsRef.current.min,
					currentLimitsRef.current.max,
					operation,
					wrongQuestionsRef.current,
					currentQuestionRef.current || undefined,
					currentWordProblemModeRef.current,
					divisionDivisorMaxRef.current
				)
				dispatch(setCurrentQuestion(newQuestion))
				dispatch(resetResult())
				setSelectedAnswer(null)
				setShowCelebration(false)
			}
		}
	}, [operation, dispatch]) // 只依赖 operation 和 dispatch

	useEffect(() => {
		// 当题目改变时，生成新选项
		if (currentQuestion) {
			const newOptions = generateOptions(
				currentQuestion.answer,
				currentLimitsRef.current.max
			)
			setOptions(newOptions)
		}
	}, [currentQuestion]) // 只依赖 currentQuestion

	// 生成不含0的题目的辅助函数
	const generateQuestionWithoutZero = useCallback(() => {
		let newQuestion
		let attempts = 0
		const maxAttempts = 20

		// 循环生成新题目，直到找到不含0的题目
		do {
			newQuestion = generateNewQuestion(
				currentLimitsRef.current.min,
				currentLimitsRef.current.max,
				operation,
				wrongQuestionsRef.current,
				currentQuestionRef.current || undefined,
				true, // avoidZero = true
				divisionDivisorMaxRef.current
			)
			attempts++
		} while (
			(newQuestion.num1 === 0 || newQuestion.num2 === 0) &&
			attempts < maxAttempts
		)

		return newQuestion
	}, [operation]) // 只依赖 operation

	const handleOptionClick = (option: number) => {
		if (!showResult) {
			setSelectedAnswer(option)
			dispatch(setUserAnswer(option.toString()))
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (selectedAnswer !== null) {
			dispatch(submitAnswer())

			// 增加每日答题计数（按运算类型统计）
			incrementQuestionsAnswered(operation)

			const isAnswerCorrect =
				currentQuestion && selectedAnswer === currentQuestion.answer

			// 答对才检查里程碑
			if (isAnswerCorrect) {
				// 检查是否达到新的里程碑
				const newMilestone = checkMilestone(dailyGoal)
				if (newMilestone) {
					const milestoneCount = getMilestoneCount(newMilestone, dailyGoal)
					// 延迟触发里程碑动画，让普通庆祝动画先播放
					setTimeout(() => {
						onMilestoneAchieved(newMilestone, milestoneCount)
					}, 2000)
				}

				// 显示庆祝动画
				setShowCelebration(true)
			}
		}
	}

	const handleNext = useCallback(() => {
		dispatch(resetResult())
		const newQuestion = generateNewQuestion(
			currentLimitsRef.current.min,
			currentLimitsRef.current.max,
			operation,
			wrongQuestionsRef.current,
			currentQuestionRef.current || undefined,
			currentWordProblemModeRef.current,
			divisionDivisorMaxRef.current
		)
		dispatch(setCurrentQuestion(newQuestion))
		setSelectedAnswer(null)
		setShowCelebration(false)
	}, [dispatch, operation]) // 只依赖 dispatch 和 operation

	const handleCelebrationComplete = useCallback(() => {
		setShowCelebration(false)
		handleNext()
	}, [handleNext])

	// 使用 useMemo 生成应用题文本，只在题目或语言改变时重新生成
	// 这样可以避免在用户点击选项或提交时，应用题文本发生变化
	const wordProblemText = useMemo(() => {
		if (!currentQuestion || !currentWordProblemMode) return null
		return generateWordProblem(
			currentQuestion.num1,
			currentQuestion.num2,
			currentQuestion.operation,
			language
		)
	}, [currentQuestion, language, currentWordProblemMode])

	if (!currentQuestion) return null

	return (
		<>
			<CelebrationAnimation
				show={showCelebration}
				onComplete={handleCelebrationComplete}
				operation={operation}
			/>

			<div className='question-container'>
				{/* 应用题模式开关 */}
				<div className='word-problem-toggle'>
					<label className='toggle-switch'>
						<input
							type='checkbox'
							checked={currentWordProblemMode}
							onChange={(e) => {
								const enabled = e.target.checked
								dispatch(
									setWordProblemMode({
										operation,
										enabled,
									})
								)

								// 如果开启应用题模式，检查当前题目是否包含0
								if (enabled && currentQuestion) {
									if (
										currentQuestion.num1 === 0 ||
										currentQuestion.num2 === 0
									) {
										// 当前题目包含0，需要立即刷新题目
										const newQuestion = generateQuestionWithoutZero()
										dispatch(setCurrentQuestion(newQuestion))
										setSelectedAnswer(null)
										dispatch(resetResult())
									}
								}
							}}
						/>
						<span className='toggle-slider'></span>
					</label>
					<span className='toggle-label'>
						{currentWordProblemMode
							? t.wordProblemModeOn
							: t.wordProblemModeOff}
					</span>
				</div>

				<motion.div
					className='question-card'
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					{currentWordProblemMode ? (
						<div className='question-text word-problem'>{wordProblemText}</div>
					) : (
						<div className='question-text'>
							{currentQuestion.num1} {currentQuestion.operation}{' '}
							{currentQuestion.num2} = ?
						</div>
					)}

					<div className='options-container'>
						{options.map((option, index) => (
							<motion.button
								key={index}
								type='button'
								className={`option-btn ${
									selectedAnswer === option ? 'selected' : ''
								} ${
									showResult && option === currentQuestion.answer
										? 'correct-option'
										: ''
								} ${
									showResult &&
									selectedAnswer === option &&
									option !== currentQuestion.answer
										? 'wrong-option'
										: ''
								}`}
								onClick={() => handleOptionClick(option)}
								disabled={showResult}
								whileHover={{ scale: showResult ? 1 : 1.05 }}
								whileTap={{ scale: showResult ? 1 : 0.95 }}
							>
								{option}
							</motion.button>
						))}
					</div>

					<div className='submit-btn-container'>
						{selectedAnswer !== null && !showResult && (
							<motion.button
								onClick={handleSubmit}
								className='submit-btn'
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
							>
								{t.submit}
							</motion.button>
						)}
					</div>

					<AnimatePresence>
						{showResult && !isCorrect && (
							<motion.div
								className={`result ${isCorrect ? 'correct' : 'incorrect'}`}
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{ duration: 0.4, type: 'spring' }}
							>
								<div className='result-message'>
									{isCorrect ? '🎉 ' + t.correct : '❌ ' + t.incorrect}
								</div>
								{!isCorrect && (
									<div className='correct-answer'>
										{t.correctAnswer}: {currentQuestion.answer}
									</div>
								)}
								<button onClick={handleNext} className='next-btn'>
									{t.next}
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</>
	)
}
