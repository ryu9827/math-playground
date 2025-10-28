import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '../utils/i18n'
import { OperationType } from '../App'

export interface SettingsState {
	language: Language
	soundEnabled: boolean
	dailyGoal: number
	numberSplitMaxTarget: number
	wordProblemMode: {
		'+': boolean
		'-': boolean
		'×': boolean
		'÷': boolean
	}
	operationLimits: {
		'+': { min: number; max: number }
		'-': { min: number; max: number }
		'×': { min: number; max: number }
		'÷': { min: number; max: number }
	}
}

export interface WordProblemModePayload {
	operation: OperationType
	enabled: boolean
}

export interface OperationLimitsPayload {
	operation: OperationType
	min: number
	max: number
}

// 从 localStorage 加载设置
const loadSettings = (): SettingsState => {
	try {
		const stored = localStorage.getItem('math-playground-settings')
		if (stored) {
			const settings = JSON.parse(stored) as any

			// 处理 wordProblemMode 的向后兼容性
			let wordProblemModeValue: SettingsState['wordProblemMode']
			if (typeof settings.wordProblemMode === 'boolean') {
				// 旧版本是布尔值，转换为新格式（所有运算类型使用相同的值）
				const oldValue = settings.wordProblemMode
				wordProblemModeValue = {
					'+': oldValue,
					'-': oldValue,
					'×': oldValue,
					'÷': oldValue,
				}
			} else if (
				settings.wordProblemMode &&
				typeof settings.wordProblemMode === 'object'
			) {
				// 新版本是对象，确保所有键都存在
				wordProblemModeValue = {
					'+': settings.wordProblemMode['+'] || false,
					'-': settings.wordProblemMode['-'] || false,
					'×': settings.wordProblemMode['×'] || false,
					'÷': settings.wordProblemMode['÷'] || false,
				}
			} else {
				// 默认值
				wordProblemModeValue = {
					'+': false,
					'-': false,
					'×': false,
					'÷': false,
				}
			}

			return {
				language: settings.language || 'zh',
				soundEnabled:
					settings.soundEnabled !== undefined ? settings.soundEnabled : true,
				dailyGoal: settings.dailyGoal || 20,
				numberSplitMaxTarget: settings.numberSplitMaxTarget || 10,
				wordProblemMode: wordProblemModeValue,
				operationLimits: settings.operationLimits || {
					'+': { min: 1, max: 100 },
					'-': { min: 1, max: 100 },
					'×': { min: 1, max: 100 },
					'÷': { min: 1, max: 100 },
				},
			}
		}
	} catch (error) {
		console.error('Failed to load settings from localStorage:', error)
	}
	return {
		language: 'zh',
		soundEnabled: true,
		dailyGoal: 20,
		numberSplitMaxTarget: 10,
		wordProblemMode: {
			'+': false,
			'-': false,
			'×': false,
			'÷': false,
		},
		operationLimits: {
			'+': { min: 1, max: 100 },
			'-': { min: 1, max: 100 },
			'×': { min: 1, max: 100 },
			'÷': { min: 1, max: 100 },
		},
	}
}

// 保存设置到 localStorage
const saveSettings = (state: SettingsState): void => {
	try {
		localStorage.setItem('math-playground-settings', JSON.stringify(state))
	} catch (error) {
		console.error('Failed to save settings to localStorage:', error)
	}
}

const initialState: SettingsState = loadSettings()

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload
			saveSettings(state)
		},
		setSoundEnabled: (state, action: PayloadAction<boolean>) => {
			state.soundEnabled = action.payload
			saveSettings(state)
		},
		setDailyGoal: (state, action: PayloadAction<number>) => {
			state.dailyGoal = action.payload
			saveSettings(state)
		},
		setNumberSplitMaxTarget: (state, action: PayloadAction<number>) => {
			state.numberSplitMaxTarget = action.payload
			saveSettings(state)
		},
		setWordProblemMode: (
			state,
			action: PayloadAction<WordProblemModePayload>
		) => {
			state.wordProblemMode[action.payload.operation] = action.payload.enabled
			saveSettings(state)
		},
		setOperationLimits: (
			state,
			action: PayloadAction<OperationLimitsPayload>
		) => {
			state.operationLimits[action.payload.operation] = {
				min: action.payload.min,
				max: action.payload.max,
			}
			saveSettings(state)
		},
	},
})

export const {
	setLanguage,
	setSoundEnabled,
	setDailyGoal,
	setNumberSplitMaxTarget,
	setWordProblemMode,
	setOperationLimits,
} = settingsSlice.actions
export default settingsSlice.reducer
