import React, { useState, useEffect } from 'react'
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
import { motion, AnimatePresence } from 'framer-motion'
import { OperationType } from '../App'
import { CelebrationAnimation } from './CelebrationAnimation'
import '../styles/Question.scss'

interface QuestionProps {
	operation: OperationType
}

export const Question: React.FC<QuestionProps> = ({ operation }) => {
	const dispatch = useDispatch()
	const { currentQuestion, showResult, isCorrect, wrongQuestions } =
		useSelector((state: RootState) => state.questions)
	const { language, maxNumber } = useSelector(
		(state: RootState) => state.settings
	)
	const t = translations[language]

	const [options, setOptions] = useState<number[]>([])
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
	const [showCelebration, setShowCelebration] = useState(false)

	useEffect(() => {
		// 当运算类型改变时，生成新问题
		const newQuestion = generateNewQuestion(
			maxNumber,
			operation,
			wrongQuestions
		)
		dispatch(setCurrentQuestion(newQuestion))
		dispatch(resetResult())
		setSelectedAnswer(null)
		setShowCelebration(false)
	}, [operation, dispatch, maxNumber, wrongQuestions])

	useEffect(() => {
		// 当题目改变时，生成新选项
		if (currentQuestion) {
			const newOptions = generateOptions(currentQuestion.answer, maxNumber)
			setOptions(newOptions)
		}
	}, [currentQuestion, maxNumber])

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
			// 如果答对了，显示庆祝动画，2秒后自动下一题
			if (currentQuestion && selectedAnswer === currentQuestion.answer) {
				setShowCelebration(true)
				// 2秒后自动进入下一题
				setTimeout(() => {
					handleNext()
				}, 2000)
			}
			// 如果答错了，不自动跳转，需要用户点击"下一题"
		}
	}

	const handleNext = () => {
		dispatch(resetResult())
		const newQuestion = generateNewQuestion(
			maxNumber,
			operation,
			wrongQuestions
		)
		dispatch(setCurrentQuestion(newQuestion))
		setSelectedAnswer(null)
		setShowCelebration(false)
	}

	if (!currentQuestion) return null

	return (
		<>
			<CelebrationAnimation
				show={showCelebration}
				onComplete={() => setShowCelebration(false)}
			/>

			<div className='question-container'>
				<motion.div
					className='question-card'
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<div className='question-text'>
						{currentQuestion.num1} {currentQuestion.operation}{' '}
						{currentQuestion.num2} = ?
					</div>

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

					{selectedAnswer !== null && !showResult && (
						<button onClick={handleSubmit} className='submit-btn'>
							{t.submit}
						</button>
					)}

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
