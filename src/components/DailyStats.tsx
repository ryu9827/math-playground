import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { getTodayQuestionsCount } from '../utils/dailyStats'
import { DailyGoalModal } from './DailyGoalModal'
import { motion } from 'framer-motion'
import '../styles/DailyStats.scss'

export const DailyStats: React.FC = () => {
	const { language, dailyGoal } = useSelector(
		(state: RootState) => state.settings
	)
	const { showResult } = useSelector((state: RootState) => state.questions)

	const [count, setCount] = useState(getTodayQuestionsCount())
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentDate, setCurrentDate] = useState(new Date().toDateString())

	// 检查日期变化，重置计数
	useEffect(() => {
		const checkDateChange = () => {
			const today = new Date().toDateString()
			if (today !== currentDate) {
				// 新的一天，更新日期和计数
				setCurrentDate(today)
				setCount(getTodayQuestionsCount())
			}
		}

		// 每分钟检查一次日期是否改变
		const interval = setInterval(checkDateChange, 60000)

		// 组件挂载时也检查一次
		checkDateChange()

		return () => clearInterval(interval)
	}, [currentDate])

	// 当答题结果显示时，更新计数
	useEffect(() => {
		setCount(getTodayQuestionsCount())
	}, [showResult])

	// 监听拆数字组件的更新事件
	useEffect(() => {
		const handleDailyStatsUpdate = () => {
			setCount(getTodayQuestionsCount())
		}

		window.addEventListener('dailyStatsUpdated', handleDailyStatsUpdate)

		return () => {
			window.removeEventListener('dailyStatsUpdated', handleDailyStatsUpdate)
		}
	}, [])

	return (
		<>
			<motion.div
				className='daily-stats'
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3 }}
				onClick={() => setIsModalOpen(true)}
				style={{ cursor: 'pointer' }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
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
						<span className='stats-goal'>/{dailyGoal}</span>
					</motion.div>
					<div className='stats-unit'>
						{language === 'zh' ? '题' : 'questions'}
					</div>
				</div>
			</motion.div>

			<DailyGoalModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	)
}
