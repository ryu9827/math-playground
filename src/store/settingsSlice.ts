import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '../utils/i18n'

export interface SettingsState {
	language: Language
	maxNumber: number
}

const initialState: SettingsState = {
	language: 'zh',
	maxNumber: 20,
}

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload
		},
		setMaxNumber: (state, action: PayloadAction<number>) => {
			state.maxNumber = action.payload
		},
	},
})

export const { setLanguage, setMaxNumber } = settingsSlice.actions
export default settingsSlice.reducer
