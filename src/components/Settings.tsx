import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { setLanguage, setMaxNumber } from '../store/settingsSlice'
import { translations } from '../utils/i18n'
import { motion } from 'framer-motion'
import '../styles/Settings.scss'

export const Settings: React.FC = () => {
	const dispatch = useDispatch()
	const { language, maxNumber } = useSelector(
		(state: RootState) => state.settings
	)
	const t = translations[language]

	const [localMax, setLocalMax] = useState(maxNumber)

	const handleSaveRange = () => {
		if (localMax > 0) {
			dispatch(setMaxNumber(localMax))
		}
	}

	return (
		<div className='settings-container'>
			<motion.div
				className='settings-content'
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.3 }}
			>
				<div className='setting-section'>
					<h3>{t.language}</h3>
					<div className='language-buttons'>
						<button
							className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
							onClick={() => dispatch(setLanguage('zh'))}
						>
							{t.chinese}
						</button>
						<button
							className={`lang-btn ${language === 'en' ? 'active' : ''}`}
							onClick={() => dispatch(setLanguage('en'))}
						>
							{t.english}
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
								onChange={(e) => setLocalMax(parseInt(e.target.value) || 1)}
								min='1'
								max='100'
							/>
						</div>
					</div>
					<button className='save-btn' onClick={handleSaveRange}>
						{t.save}
					</button>
				</div>
			</motion.div>
		</div>
	)
}
