import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import {
	setLanguage,
	setSoundEnabled,
	setOperationLimits,
	setNumberSplitMaxTarget,
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
	const { language, soundEnabled, operationLimits, numberSplitMaxTarget } =
		useSelector((state: RootState) => state.settings)
	const t = translations[language]

	const [localSound, setLocalSound] = React.useState(soundEnabled)
	const [localNumberSplitMax, setLocalNumberSplitMax] = React.useState<
		number | string
	>(numberSplitMaxTarget)

	// 加法状态
	const [additionMin, setAdditionMin] = React.useState<number | string>(
		operationLimits['+'].min
	)
	const [additionMax, setAdditionMax] = React.useState<number | string>(
		operationLimits['+'].max
	)
	const [additionError, setAdditionError] = React.useState('')

	// 减法状态
	const [subtractionMinuendMax, setSubtractionMinuendMax] = React.useState<
		number | string
	>(operationLimits['-'].max)
	const [subtractionSubtrahendMin, setSubtractionSubtrahendMin] =
		React.useState<number | string>(operationLimits['-'].min)
	const [subtractionError, setSubtractionError] = React.useState('')

	// 当弹窗打开或 Redux 状态变化时，同步到本地状态
	React.useEffect(() => {
		if (isOpen) {
			setLocalSound(soundEnabled)
			setLocalNumberSplitMax(numberSplitMaxTarget)
			setAdditionMin(operationLimits['+'].min)
			setAdditionMax(operationLimits['+'].max)
			setSubtractionMinuendMax(operationLimits['-'].max)
			setSubtractionSubtrahendMin(operationLimits['-'].min)
			setAdditionError('')
			setSubtractionError('')
		}
	}, [isOpen, soundEnabled, operationLimits, numberSplitMaxTarget])

	// 验证加法的上下限
	const validateAdditionLimits = (
		min: number | string,
		max: number | string
	): boolean => {
		const minNum = typeof min === 'string' ? parseInt(min) || 1 : min
		const maxNum = typeof max === 'string' ? parseInt(max) || 1 : max

		if (minNum >= maxNum) {
			setAdditionError(t.minMaxError)
			return false
		}
		setAdditionError('')
		return true
	}

	// onChange 时只更新值，不验证
	const handleAdditionMinChange = (value: string) => {
		setAdditionMin(value)
	}

	const handleAdditionMaxChange = (value: string) => {
		setAdditionMax(value)
	}

	// onBlur 时才验证并格式化
	const handleAdditionMinBlur = () => {
		const value =
			typeof additionMin === 'string' ? parseInt(additionMin) || 1 : additionMin
		setAdditionMin(value)
		validateAdditionLimits(value, additionMax)
	}

	const handleAdditionMaxBlur = () => {
		const value =
			typeof additionMax === 'string' ? parseInt(additionMax) || 1 : additionMax
		setAdditionMax(value)
		validateAdditionLimits(additionMin, value)
	}

	// 减法验证：减数下限必须小于被减数上限
	const validateSubtractionLimits = (
		subtrahendMin: number | string,
		minuendMax: number | string
	): boolean => {
		const subtrahendMinNum =
			typeof subtrahendMin === 'string'
				? parseInt(subtrahendMin) || 1
				: subtrahendMin
		const minuendMaxNum =
			typeof minuendMax === 'string' ? parseInt(minuendMax) || 1 : minuendMax

		if (subtrahendMinNum >= minuendMaxNum) {
			setSubtractionError(t.minMaxError)
			return false
		}
		setSubtractionError('')
		return true
	}

	// onChange 时只更新值，不验证
	const handleSubtractionMinuendMaxChange = (value: string) => {
		setSubtractionMinuendMax(value)
	}

	const handleSubtractionSubtrahendMinChange = (value: string) => {
		setSubtractionSubtrahendMin(value)
	}

	// onBlur 时才验证并格式化
	const handleSubtractionMinuendMaxBlur = () => {
		const value =
			typeof subtractionMinuendMax === 'string'
				? parseInt(subtractionMinuendMax) || 1
				: subtractionMinuendMax
		setSubtractionMinuendMax(value)
		validateSubtractionLimits(subtractionSubtrahendMin, value)
	}

	const handleSubtractionSubtrahendMinBlur = () => {
		const value =
			typeof subtractionSubtrahendMin === 'string'
				? parseInt(subtractionSubtrahendMin) || 1
				: subtractionSubtrahendMin
		setSubtractionSubtrahendMin(value)
		validateSubtractionLimits(value, subtractionMinuendMax)
	}

	const handleSave = () => {
		// 转换为数字 - 加法
		const additionMinNum =
			typeof additionMin === 'string' ? parseInt(additionMin) || 1 : additionMin
		const additionMaxNum =
			typeof additionMax === 'string' ? parseInt(additionMax) || 1 : additionMax

		// 转换为数字 - 减法
		const subtractionSubtrahendMinNum =
			typeof subtractionSubtrahendMin === 'string'
				? parseInt(subtractionSubtrahendMin) || 1
				: subtractionSubtrahendMin
		const subtractionMinuendMaxNum =
			typeof subtractionMinuendMax === 'string'
				? parseInt(subtractionMinuendMax) || 1
				: subtractionMinuendMax

		// 验证加法上下限
		if (!validateAdditionLimits(additionMinNum, additionMaxNum)) {
			return // 如果验证失败，不保存
		}

		// 验证减法限制
		if (
			!validateSubtractionLimits(
				subtractionSubtrahendMinNum,
				subtractionMinuendMaxNum
			)
		) {
			return // 如果验证失败，不保存
		}

		dispatch(setSoundEnabled(localSound))

		// 保存拆数字上限设置
		const numberSplitMaxNum =
			typeof localNumberSplitMax === 'string'
				? parseInt(localNumberSplitMax) || 10
				: localNumberSplitMax
		if (numberSplitMaxNum >= 3 && numberSplitMaxNum <= 100) {
			dispatch(setNumberSplitMaxTarget(numberSplitMaxNum))
		}

		// 保存加法设置
		dispatch(
			setOperationLimits({
				operation: '+',
				min: additionMinNum,
				max: additionMaxNum,
			})
		)

		// 保存减法设置（min是减数下限，max是被减数上限）
		dispatch(
			setOperationLimits({
				operation: '-',
				min: subtractionSubtrahendMinNum,
				max: subtractionMinuendMaxNum,
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
													handleAdditionMinChange(e.target.value)
												}
												onBlur={handleAdditionMinBlur}
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
													handleAdditionMaxChange(e.target.value)
												}
												onBlur={handleAdditionMaxBlur}
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

								{/* 减法限制 */}
								<div className='operation-limit-group'>
									<h4>➖ {t.subtraction}</h4>
									<div className='limit-inputs'>
										<div className='input-group'>
											<label>{t.subtractionMinuendMax}</label>
											<input
												type='number'
												value={subtractionMinuendMax}
												onChange={(e) =>
													handleSubtractionMinuendMaxChange(e.target.value)
												}
												onBlur={handleSubtractionMinuendMaxBlur}
												min='1'
												max='1000'
											/>
											<span className='input-hint'>
												{t.subtractionMinuendMaxHint}
											</span>
										</div>
										<div className='input-group'>
											<label>{t.subtractionSubtrahendMin}</label>
											<input
												type='number'
												value={subtractionSubtrahendMin}
												onChange={(e) =>
													handleSubtractionSubtrahendMinChange(e.target.value)
												}
												onBlur={handleSubtractionSubtrahendMinBlur}
												min='1'
												max='1000'
											/>
											<span className='input-hint'>
												{t.subtractionSubtrahendMinHint}
											</span>
										</div>
									</div>
									{subtractionError && (
										<div className='error-message'>{subtractionError}</div>
									)}
								</div>
							</div>

							<div className='setting-section'>
								<h3>🔢 {t.numberSplitSettings}</h3>
								<p className='setting-hint'>{t.numberSplitMaxTargetHint}</p>
								<div className='input-group'>
									<label>{t.numberSplitMaxTarget}</label>
									<input
										type='number'
										value={localNumberSplitMax}
										onChange={(e) => setLocalNumberSplitMax(e.target.value)}
										onBlur={() => {
											const value =
												typeof localNumberSplitMax === 'string'
													? parseInt(localNumberSplitMax) || 10
													: localNumberSplitMax
											const clampedValue = Math.min(100, Math.max(3, value))
											setLocalNumberSplitMax(clampedValue)
										}}
										min='3'
										max='100'
									/>
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
