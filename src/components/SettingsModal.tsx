import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import {
	setLanguage,
	setSoundEnabled,
	setOperationLimits,
} from '../store/settingsSlice'
import { translations } from '../utils/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { ChinaFlag } from './flags/ChinaFlag'
import { USAFlag } from './flags/USAFlag'
import '../styles/SettingsModal.scss'

interface SettingsModalProps {
	isOpen: boolean
	onClose: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
	isOpen,
	onClose,
}) => {
	const dispatch = useDispatch()
	const { language, soundEnabled, operationLimits } = useSelector(
		(state: RootState) => state.settings
	)
	const t = translations[language]

	const [localSound, setLocalSound] = React.useState(soundEnabled)
	const [additionMin, setAdditionMin] = React.useState(operationLimits['+'].min)
	const [additionMax, setAdditionMax] = React.useState(operationLimits['+'].max)
	const [additionError, setAdditionError] = React.useState('')

	// 验证加法的上下限
	const validateAdditionLimits = (min: number, max: number): boolean => {
		if (min >= max) {
			setAdditionError(t.minMaxError)
			return false
		}
		setAdditionError('')
		return true
	}

	const handleAdditionMinChange = (value: number) => {
		setAdditionMin(value)
		validateAdditionLimits(value, additionMax)
	}

	const handleAdditionMaxChange = (value: number) => {
		setAdditionMax(value)
		validateAdditionLimits(additionMin, value)
	}

	const handleSave = () => {
		// 验证加法上下限
		if (!validateAdditionLimits(additionMin, additionMax)) {
			return // 如果验证失败，不保存
		}

		dispatch(setSoundEnabled(localSound))
		dispatch(
			setOperationLimits({
				operation: '+',
				min: additionMin,
				max: additionMax,
			})
		)
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
								<h3>{t.operationLimits}</h3>

								{/* 加法限制 */}
								<div className='operation-limit-group'>
									<h4>➕ {t.addition}</h4>
									<div className='limit-inputs'>
										<div className='input-group'>
											<label>{t.minNumber}</label>
											<input
												type='number'
												value={additionMin}
												onChange={(e) =>
													handleAdditionMinChange(parseInt(e.target.value) || 1)
												}
												min='1'
												max='1000'
											/>
											<span className='input-hint'>{t.additionMinHint}</span>
										</div>
										<div className='input-group'>
											<label>{t.maxNumber}</label>
											<input
												type='number'
												value={additionMax}
												onChange={(e) =>
													handleAdditionMaxChange(parseInt(e.target.value) || 1)
												}
												min='1'
												max='1000'
											/>
											<span className='input-hint'>{t.additionMaxHint}</span>
										</div>
									</div>
									{additionError && (
										<div className='error-message'>{additionError}</div>
									)}
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
