import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '../utils/i18n'
import { OperationType } from '../App'

export interface SettingsState {
	language: Language
	minNumber: number
	maxNumber: number
	soundEnabled: boolean
	dailyGoal: number
	wordProblemMode: {
		'+': boolean
		'-': boolean
		'×': boolean
		'÷': boolean
	}
}

export interface WordProblemModePayload {
	operation: OperationType
	enabled: boolean
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
			} else if (settings.wordProblemMode && typeof settings.wordProblemMode === 'object') {
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
				minNumber: settings.minNumber || 1,
				maxNumber: settings.maxNumber || 20,
				soundEnabled:
					settings.soundEnabled !== undefined ? settings.soundEnabled : true,
				dailyGoal: settings.dailyGoal || 20,
				wordProblemMode: wordProblemModeValue,
			}
		}
	} catch (error) {
		console.error('Failed to load settings from localStorage:', error)
	}
	return {
		language: 'zh',
		minNumber: 1,
		maxNumber: 20,
		soundEnabled: true,
		dailyGoal: 20,
		wordProblemMode: {
			'+': false,
			'-': false,
			'×': false,
			'÷': false,
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
		setMinNumber: (state, action: PayloadAction<number>) => {
			state.minNumber = action.payload
			saveSettings(state)
		},
		setMaxNumber: (state, action: PayloadAction<number>) => {
			state.maxNumber = action.payload
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
		setWordProblemMode: (
			state,
			action: PayloadAction<WordProblemModePayload>
		) => {
			state.wordProblemMode[action.payload.operation] = action.payload.enabled
			saveSettings(state)
		},
	},
})

export const {
	setLanguage,
	setMinNumber,
	setMaxNumber,
	setSoundEnabled,
	setDailyGoal,
	setWordProblemMode,
} = settingsSlice.actions
export default settingsSlice.reducer
