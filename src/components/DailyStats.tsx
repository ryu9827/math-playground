import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { getTodayQuestionsCount } from '../utils/dailyStats'
import { motion } from 'framer-motion'
import '../styles/DailyStats.scss'

export const DailyStats: React.FC = () => {
	const { language } = useSelector((state: RootState) => state.settings)
	const { showResult } = useSelector((state: RootState) => state.questions)

	const [count, setCount] = useState(getTodayQuestionsCount())

	// 当答题结果显示时，更新计数
	useEffect(() => {
		setCount(getTodayQuestionsCount())
	}, [showResult])

	return (
		<motion.div
			className='daily-stats'
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 0.3 }}
		>
			<div className='stats-icon'>📊</div>
			<div className='stats-content'>
				<div className='stats-label'>
					{language === 'zh' ? '今日练习' : 'Today'}
				</div>
				<motion.div
					className='stats-count'
					key={count}
					initial={{ scale: 1.5, color: '#FFD700' }}
					animate={{ scale: 1, color: '#FFFFFF' }}
					transition={{ duration: 0.3 }}
				>
					{count}
				</motion.div>
				<div className='stats-unit'>
					{language === 'zh' ? '题' : 'questions'}
				</div>
			</div>
		</motion.div>
	)
}
