import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { getTodayQuestionsCount, getOperationCounts } from '../utils/dailyStats'
import { DailyGoalModal } from './DailyGoalModal'
import { motion } from 'framer-motion'
import '../styles/DailyStats.scss'

export const DailyStats: React.FC = () => {
	const { language, dailyGoal } = useSelector(
		(state: RootState) => state.settings
	)
	const { showResult } = useSelector((state: RootState) => state.questions)

	const [count, setCount] = useState(getTodayQuestionsCount())
	const [opCounts, setOpCounts] = useState(getOperationCounts())
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentDate, setCurrentDate] = useState(new Date().toDateString())

	const refreshStats = () => {
		setCount(getTodayQuestionsCount())
		setOpCounts(getOperationCounts())
	}

	// 检查日期变化，重置计数
	useEffect(() => {
		const checkDateChange = () => {
			const today = new Date().toDateString()
			if (today !== currentDate) {
				setCurrentDate(today)
				refreshStats()
			}
		}
		const interval = setInterval(checkDateChange, 60000)
		checkDateChange()
		return () => clearInterval(interval)
	}, [currentDate])

	// 当答题结果显示时，更新计数
	useEffect(() => {
		refreshStats()
	}, [showResult])

	// 监听拆数字组件的更新事件
	useEffect(() => {
		const handleDailyStatsUpdate = () => refreshStats()
		window.addEventListener('dailyStatsUpdated', handleDailyStatsUpdate)
		return () => window.removeEventListener('dailyStatsUpdated', handleDailyStatsUpdate)
	}, [])

	const opItems: { symbol: string; key: '+' | '-' | '×' | '÷' }[] = [
		{ symbol: '+', key: '+' },
		{ symbol: '-', key: '-' },
		{ symbol: '×', key: '×' },
		{ symbol: '÷', key: '÷' },
	]

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
					{/* 运算类型分类统计 */}
					<div className='stats-op-row'>
						{opItems.map(({ symbol, key }) => (
							<div key={key} className='stats-op-item'>
								<span className='stats-op-symbol'>{symbol}</span>
								<span className='stats-op-count'>{opCounts[key]}</span>
							</div>
						))}
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
