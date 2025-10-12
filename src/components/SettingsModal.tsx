import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import {
	setLanguage,
	setMinNumber,
	setMaxNumber,
	setSoundEnabled,
} from '../store/settingsSlice'
import { translations } from '../utils/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { ChinaFlag } from './flags/ChinaFlag'
import { USAFlag } from './flags/USAFlag'
import '../styles/SettingsModal.scss'

interface SettingsModalProps {
	isOpen: boolean
	onClose: () => void
	onSettingsSaved?: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
	isOpen,
	onClose,
	onSettingsSaved,
}) => {
	const dispatch = useDispatch()
	const { language, minNumber, maxNumber, soundEnabled } = useSelector(
		(state: RootState) => state.settings
	)
	const t = translations[language]

	const [localMin, setLocalMin] = React.useState(minNumber)
	const [localMax, setLocalMax] = React.useState(maxNumber)
	const [localSound, setLocalSound] = React.useState(soundEnabled)

	const handleSave = () => {
		// 确保下限不大于上限
		const finalMin = Math.max(1, Math.min(localMin, localMax))
		const finalMax = Math.max(finalMin, localMax)

		dispatch(setMinNumber(finalMin))
		dispatch(setMaxNumber(finalMax))
		dispatch(setSoundEnabled(localSound))

		// 通知外部设置已保存，需要刷新题目
		if (onSettingsSaved) {
			onSettingsSaved()
		}

		onClose() // 保存后自动关闭
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
					className='settings-modal-backdrop'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={handleBackdropClick}
				>
					<motion.div
						className='settings-modal-content'
						initial={{ scale: 0.8, opacity: 0, y: 50 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.8, opacity: 0, y: 50 }}
						transition={{ type: 'spring', damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className='modal-header'>
							<h2>{t.settings}</h2>
							<button className='close-btn' onClick={onClose}>
								×
							</button>
						</div>

						<div className='modal-body'>
							<div className='setting-section'>
								<h3>{t.language}</h3>
								<div className='language-buttons'>
									<button
										className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
										onClick={() => dispatch(setLanguage('zh'))}
										title={t.chinese}
									>
										<ChinaFlag width={48} height={36} />
									</button>
									<button
										className={`lang-btn ${language === 'en' ? 'active' : ''}`}
										onClick={() => dispatch(setLanguage('en'))}
										title={t.english}
									>
										<USAFlag width={48} height={36} />
									</button>
								</div>
							</div>

							<div className='setting-section'>
								<h3>{t.rangeSettings}</h3>
								<p className='setting-hint'>{t.maxNumberHint}</p>
								<div className='range-inputs'>
									<div className='input-group'>
										<label>{t.minNumber}</label>
										<input
											type='number'
											value={localMin}
											onChange={(e) =>
												setLocalMin(parseInt(e.target.value) || 1)
											}
											min='1'
											max='100'
										/>
									</div>
									<div className='input-group'>
										<label>{t.maxNumber}</label>
										<input
											type='number'
											value={localMax}
											onChange={(e) =>
												setLocalMax(parseInt(e.target.value) || 1)
											}
											min='1'
											max='100'
										/>
									</div>
								</div>
							</div>

							<div className='setting-section'>
								<h3>{t.soundSettings}</h3>
								<p className='setting-hint'>{t.soundHint}</p>
								<div className='sound-toggle'>
									<button
										className={`toggle-btn ${localSound ? 'active' : ''}`}
										onClick={() => setLocalSound(!localSound)}
									>
										<span className='toggle-icon'>
											{localSound ? '🔊' : '🔇'}
										</span>
										<span className='toggle-text'>
											{localSound ? t.soundEnabled : t.soundDisabled}
										</span>
									</button>
								</div>
							</div>
						</div>

						<div className='modal-footer'>
							<button className='cancel-btn' onClick={onClose}>
								{t.cancel || '取消'}
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
