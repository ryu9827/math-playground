import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { setDailyGoal } from '../store/settingsSlice'
import { translations } from '../utils/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/DailyGoalModal.scss'

interface DailyGoalModalProps {
	isOpen: boolean
	onClose: () => void
}

export const DailyGoalModal: React.FC<DailyGoalModalProps> = ({
	isOpen,
	onClose,
}) => {
	const dispatch = useDispatch()
	const { language, dailyGoal } = useSelector(
		(state: RootState) => state.settings
	)
	const t = translations[language]

	const [localGoal, setLocalGoal] = useState(dailyGoal)

	const handleSave = () => {
		const validGoal = Math.max(1, Math.min(localGoal, 200))
		dispatch(setDailyGoal(validGoal))
		onClose()
	}

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='daily-goal-modal-backdrop'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={handleBackdropClick}
				>
					<motion.div
						className='daily-goal-modal-content'
						initial={{ scale: 0.8, opacity: 0, y: 50 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.8, opacity: 0, y: 50 }}
						transition={{ type: 'spring', damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className='modal-header'>
							<h2>{language === 'zh' ? '每日目标设置' : 'Daily Goal'}</h2>
							<button className='close-btn' onClick={onClose}>
								×
							</button>
						</div>

						<div className='modal-body'>
							<div className='goal-icon'>🎯</div>
							<p className='goal-description'>
								{language === 'zh'
									? '设置你每天想要完成的练习题数量'
									: 'Set your daily practice goal'}
							</p>
							<div className='goal-input-group'>
								<input
									type='number'
									value={localGoal}
									onChange={(e) => setLocalGoal(parseInt(e.target.value) || 1)}
									min='1'
									max='200'
									className='goal-input'
								/>
								<span className='goal-unit'>
									{language === 'zh' ? '题' : 'questions'}
								</span>
							</div>
							<p className='goal-hint'>
								{language === 'zh'
									? '达到目标后将播放特殊庆祝动画 🎉'
									: 'Special celebration animation when goal reached 🎉'}
							</p>
						</div>

						<div className='modal-footer'>
							<button className='cancel-btn' onClick={onClose}>
								{t.cancel}
							</button>
							<button className='save-btn' onClick={handleSave}>
								{t.save}
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
