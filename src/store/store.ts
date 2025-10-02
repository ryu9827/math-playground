import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './questionsSlice'
import settingsReducer from './settingsSlice'

export const store = configureStore({
	reducer: {
		questions: questionsReducer,
		settings: settingsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
