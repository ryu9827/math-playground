import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '../utils/i18n'

export interface SettingsState {
	language: Language
	minNumber: number
	maxNumber: number
	soundEnabled: boolean
}

// 从 localStorage 加载设置
const loadSettings = (): SettingsState => {
	try {
		const stored = localStorage.getItem('math-playground-settings')
		if (stored) {
			const settings = JSON.parse(stored) as SettingsState
			return {
				language: settings.language || 'zh',
				minNumber: settings.minNumber || 1,
				maxNumber: settings.maxNumber || 20,
				soundEnabled:
					settings.soundEnabled !== undefined ? settings.soundEnabled : true,
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
	},
})

export const { setLanguage, setMinNumber, setMaxNumber, setSoundEnabled } =
	settingsSlice.actions
export default settingsSlice.reducer
