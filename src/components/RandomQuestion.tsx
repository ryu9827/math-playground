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
import { motion, AnimatePresence } from 'framer-motion'
import { OperationType } from '../App'
import { CelebrationAnimation } from './CelebrationAnimation'
import '../styles/Question.scss'

const ALL_OPERATIONS: OperationType[] = ['+', '-', '×', '÷']

const pickRandomOp = (): OperationType =>
	ALL_OPERATIONS[Math.floor(Math.random() * ALL_OPERATIONS.length)]

interface RandomQuestionProps {
	onGoalAchieved: () => void
	onMilestoneAchieved: (milestone: number, milestoneCount: number) => void
}

export const RandomQuestion: React.FC<RandomQuestionProps> = ({
	onGoalAchieved,
	onMilestoneAchieved,
}) => {
	const dispatch = useDispatch()
	const { currentQuestion, showResult, isCorrect, wrongQuestions } =
		useSelector((state: RootState) => state.questions)
	const { language, dailyGoal, operationLimits, divisionDivisorMax } = useSelector(
		(state: RootState) => state.settings
	)
	const t = translations[language]

	// 当前随机运算类型（UI 展示用）
	const [currentOp, setCurrentOp] = useState<OperationType>(pickRandomOp)
	const currentOpRef = useRef<OperationType>(currentOp)

	// 随机 tab 独立的应用题开关（本地状态，不污染其他 tab 的设置）
	const [wordProblemMode, setWordProblemMode] = useState(false)
	const wordProblemModeRef = useRef(wordProblemMode)

	const [options, setOptions] = useState<number[]>([])
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
	const [showCelebration, setShowCelebration] = useState(false)

	const wrongQuestionsRef = useRef(wrongQuestions)
	const currentQuestionRef = useRef(currentQuestion)
	const operationLimitsRef = useRef(operationLimits)
	const divisionDivisorMaxRef = useRef(divisionDivisorMax)

	useEffect(() => { wrongQuestionsRef.current = wrongQuestions }, [wrongQuestions])
	useEffect(() => { currentQuestionRef.current = currentQuestion }, [currentQuestion])
	useEffect(() => { wordProblemModeRef.current = wordProblemMode }, [wordProblemMode])
	useEffect(() => { currentOpRef.current = currentOp }, [currentOp])
	useEffect(() => { operationLimitsRef.current = operationLimits }, [operationLimits])
	useEffect(() => { divisionDivisorMaxRef.current = divisionDivisorMax }, [divisionDivisorMax])

	// 生成一道题（封装公共逻辑）
	const generateQuestion = useCallback(
		(op: OperationType, avoidZero?: boolean) => {
			const limits = operationLimitsRef.current[op]
			return generateNewQuestion(
				limits.min,
				limits.max,
				op,
				wrongQuestionsRef.current,
				currentQuestionRef.current || undefined,
				avoidZero,
				divisionDivisorMaxRef.current
			)
		},
		[]
	)

	// 组件挂载时生成第一道题
	useEffect(() => {
		const op = currentOpRef.current
		const q = generateQuestion(op, wordProblemModeRef.current)
		dispatch(setCurrentQuestion(q))
		dispatch(resetResult())
		setSelectedAnswer(null)
		setShowCelebration(false)
	}, [dispatch, generateQuestion])

	// 题目变化时更新选项
	useEffect(() => {
		if (currentQuestion) {
			const limits = operationLimitsRef.current[currentQuestion.operation]
			setOptions(generateOptions(currentQuestion.answer, limits.max))
		}
	}, [currentQuestion])

	const handleOptionClick = (option: number) => {
		if (!showResult) {
			setSelectedAnswer(option)
			dispatch(setUserAnswer(option.toString()))
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (selectedAnswer === null) return

		dispatch(submitAnswer())
		// 按实际运算类型计入统计
		incrementQuestionsAnswered(currentOpRef.current)

		const isAnswerCorrect =
			currentQuestion && selectedAnswer === currentQuestion.answer

		if (isAnswerCorrect) {
			const newMilestone = checkMilestone(dailyGoal)
			if (newMilestone) {
				const milestoneCount = getMilestoneCount(newMilestone, dailyGoal)
				setTimeout(() => {
					onMilestoneAchieved(newMilestone, milestoneCount)
				}, 2000)
			}
			setShowCelebration(true)
		}
	}

	const handleNext = useCallback(() => {
		// 每次下一题都重新随机运算类型
		const newOp = pickRandomOp()
		currentOpRef.current = newOp
		setCurrentOp(newOp)

		dispatch(resetResult())
		const q = generateQuestion(newOp, wordProblemModeRef.current)
		dispatch(setCurrentQuestion(q))
		setSelectedAnswer(null)
		setShowCelebration(false)
	}, [dispatch, generateQuestion])

	const handleCelebrationComplete = useCallback(() => {
		setShowCelebration(false)
		handleNext()
	}, [handleNext])

	// 切换应用题模式：若开启时当前题含 0，立刻换题
	const handleWordProblemToggle = (enabled: boolean) => {
		setWordProblemMode(enabled)
		if (enabled && currentQuestion) {
			if (currentQuestion.num1 === 0 || currentQuestion.num2 === 0) {
				const q = generateQuestion(currentOpRef.current, true)
				dispatch(setCurrentQuestion(q))
				setSelectedAnswer(null)
				dispatch(resetResult())
			}
		}
	}

	// 只在题目或语言变化时重新生成应用题文本，避免点击选项时文本抖动
	const wordProblemText = useMemo(() => {
		if (!currentQuestion || !wordProblemMode) return null
		return generateWordProblem(
			currentQuestion.num1,
			currentQuestion.num2,
			currentQuestion.operation,
			language
		)
	}, [currentQuestion, language, wordProblemMode])

	if (!currentQuestion) return null

	return (
		<>
			<CelebrationAnimation
				show={showCelebration}
				onComplete={handleCelebrationComplete}
				operation={currentOp}
			/>

			<div className='question-container'>
				{/* 应用题模式开关 */}
				<div className='word-problem-toggle'>
					<label className='toggle-switch'>
						<input
							type='checkbox'
							checked={wordProblemMode}
							onChange={(e) => handleWordProblemToggle(e.target.checked)}
						/>
						<span className='toggle-slider'></span>
					</label>
					<span className='toggle-label'>
						{wordProblemMode ? t.wordProblemModeOn : t.wordProblemModeOff}
					</span>
				</div>

				<motion.div
					className='question-card'
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					{wordProblemMode ? (
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
