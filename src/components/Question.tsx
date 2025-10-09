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
	hasGoalBeenAchieved,
	markGoalAchieved,
} from '../utils/dailyStats'
import { setWordProblemMode } from '../store/settingsSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { OperationType } from '../App'
import { CelebrationAnimation } from './CelebrationAnimation'
import '../styles/Question.scss'

interface QuestionProps {
	operation: OperationType
	onGoalAchieved: () => void
}

export const Question: React.FC<QuestionProps> = ({
	operation,
	onGoalAchieved,
}) => {
	const dispatch = useDispatch()
	const { currentQuestion, showResult, isCorrect, wrongQuestions } =
		useSelector((state: RootState) => state.questions)
	const { language, minNumber, maxNumber, dailyGoal, wordProblemMode } =
		useSelector((state: RootState) => state.settings)
	const t = translations[language]

	// 获取当前运算类型的应用题模式状态
	const currentWordProblemMode = wordProblemMode[operation]

	const [options, setOptions] = useState<number[]>([])
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
	const [showCelebration, setShowCelebration] = useState(false)

	// 使用 ref 跟踪上一次的 operation (初始化为 null 表示首次加载)
	const prevOperationRef = useRef<OperationType | null>(null)

	// 使用 ref 保存最新的 wrongQuestions，避免作为依赖触发 useEffect
	const wrongQuestionsRef = useRef(wrongQuestions)
	useEffect(() => {
		wrongQuestionsRef.current = wrongQuestions
	}, [wrongQuestions])

	useEffect(() => {
		// 如果 operation 改变了，但 currentQuestion 已经匹配这个 operation
		// 说明是从错题本点击"练习"进来的，不需要生成新题目
		if (
			currentQuestion &&
			currentQuestion.operation === operation &&
			prevOperationRef.current !== null &&
			prevOperationRef.current !== operation
		) {
			prevOperationRef.current = operation
			// 不生成新题目，但需要重置状态
			setSelectedAnswer(null)
			setShowCelebration(false)
			// 不生成新题目，保持 currentQuestion
			return
		}

		// 正常情况：首次加载或当运算类型改变时，生成新问题
		if (prevOperationRef.current !== operation) {
			prevOperationRef.current = operation
			const newQuestion = generateNewQuestion(
				minNumber,
				maxNumber,
				operation,
				wrongQuestionsRef.current,
				currentQuestion || undefined,
				currentWordProblemMode
			)
			dispatch(setCurrentQuestion(newQuestion))
			dispatch(resetResult())
			setSelectedAnswer(null)
			setShowCelebration(false)
		}
	}, [operation, dispatch, minNumber, maxNumber, currentQuestion, currentWordProblemMode])

	useEffect(() => {
		// 当题目改变时，生成新选项
		if (currentQuestion) {
			const newOptions = generateOptions(currentQuestion.answer, maxNumber)
			setOptions(newOptions)
		}
	}, [currentQuestion, maxNumber])

	useEffect(() => {
		console.log(
			'Redux状态变化 - showResult:',
			showResult,
			', isCorrect:',
			isCorrect
		)
	}, [showResult, isCorrect])

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

			// 增加每日答题计数
			const newCount = incrementQuestionsAnswered()

			const isAnswerCorrect =
				currentQuestion && selectedAnswer === currentQuestion.answer
			console.log(
				'handleSubmit - 答案是否正确:',
				isAnswerCorrect,
				'选择的答案:',
				selectedAnswer,
				'正确答案:',
				currentQuestion?.answer
			)
			console.log(
				'handleSubmit - Redux状态: showResult =',
				showResult,
				', isCorrect =',
				isCorrect
			)

			// 检查是否达到目标
			if (newCount >= dailyGoal && !hasGoalBeenAchieved() && isAnswerCorrect) {
				// 标记目标已达成
				markGoalAchieved()
				// 延迟触发目标动画，让普通庆祝动画先播放
				setTimeout(() => {
					onGoalAchieved()
				}, 2000)
			}

			// 如果答对了，显示庆祝动画
			// 庆祝动画完成后会自动调用 onComplete，然后触发 handleNext
			if (isAnswerCorrect) {
				console.log('答对了！显示庆祝动画')
				setShowCelebration(true)
			} else {
				console.log('答错了！应该显示错误提示，等待用户点击下一题')
			}
		}
	}

	const handleNext = useCallback(() => {
		console.log('handleNext 被调用')
		dispatch(resetResult())
		const newQuestion = generateNewQuestion(
			minNumber,
			maxNumber,
			operation,
			wrongQuestionsRef.current,
			currentQuestion || undefined,
			currentWordProblemMode
		)
		dispatch(setCurrentQuestion(newQuestion))
		setSelectedAnswer(null)
		setShowCelebration(false)
	}, [dispatch, minNumber, maxNumber, operation, currentQuestion, currentWordProblemMode])

	const handleCelebrationComplete = useCallback(() => {
		console.log('庆祝动画完成，准备进入下一题')
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
							onChange={(e) =>
								dispatch(
									setWordProblemMode({
										operation,
										enabled: e.target.checked,
									})
								)
							}
						/>
						<span className='toggle-slider'></span>
					</label>
					<span className='toggle-label'>
						{currentWordProblemMode ? t.wordProblemModeOn : t.wordProblemModeOff}
					</span>
				</div>

				<motion.div
					className='question-card'
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					{currentWordProblemMode ? (
						<div className='question-text word-problem'>
							{wordProblemText}
						</div>
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
