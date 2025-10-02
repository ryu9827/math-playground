import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import {
	removeWrongQuestion,
	setCurrentQuestion,
} from '../store/questionsSlice'
import { translations } from '../utils/i18n'
import { motion } from 'framer-motion'
import '../styles/WrongQuestions.scss'

export const WrongQuestions: React.FC = () => {
	const dispatch = useDispatch()
	const { wrongQuestions } = useSelector((state: RootState) => state.questions)
	const { language } = useSelector((state: RootState) => state.settings)
	const t = translations[language]

	const handlePractice = (question: any) => {
		dispatch(
			setCurrentQuestion({
				id: question.id,
				num1: question.num1,
				num2: question.num2,
				operation: question.operation,
				answer: question.answer,
			})
		)
		// 切换到对应的运算类型标签页
		const tabMap: { [key: string]: string } = {
			'+': 'addition',
			'-': 'subtraction',
			'×': 'multiplication',
			'÷': 'division',
		}
		const targetTab = document.querySelector(
			`[data-tab="${tabMap[question.operation]}"]`
		) as HTMLElement
		if (targetTab) targetTab.click()
	}

	if (wrongQuestions.length === 0) {
		return (
			<div className='wrong-questions-container'>
				<div className='empty-state'>
					<div className='empty-icon'>📚</div>
					<p>{t.noWrongQuestions}</p>
				</div>
			</div>
		)
	}

	return (
		<div className='wrong-questions-container'>
			<div className='wrong-questions-list'>
				{wrongQuestions.map((question, index) => (
					<motion.div
						key={question.id}
						className='wrong-question-item'
						initial={{ x: -20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: index * 0.05 }}
					>
						<div className='question-info'>
							<div className='question-expression'>
								{question.num1} {question.operation} {question.num2} ={' '}
								{question.answer}
							</div>
							<div className='question-stats'>
								{t.consecutiveCorrect}: {question.consecutiveCorrect}/3{' '}
								{t.times}
							</div>
						</div>
						<div className='question-actions'>
							<button
								className='practice-btn'
								onClick={() => handlePractice(question)}
							>
								{t.practice}
							</button>
							<button
								className='remove-btn'
								onClick={() => dispatch(removeWrongQuestion(question.id))}
							>
								×
							</button>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
