import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { setLanguage, setMaxNumber } from '../store/settingsSlice'
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
	const { language, maxNumber } = useSelector(
		(state: RootState) => state.settings
	)
	const t = translations[language]

	const [localMax, setLocalMax] = React.useState(maxNumber)

	const handleSave = () => {
		if (localMax > 0) {
			dispatch(setMaxNumber(localMax))
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
