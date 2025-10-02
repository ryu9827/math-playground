import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Question {
	id: string
	num1: number
	num2: number
	operation: '+' | '-' | '×' | '÷'
	answer: number
}

export interface WrongQuestion extends Question {
	consecutiveCorrect: number
	lastAttempt: number
}

export interface QuestionsState {
	currentQuestion: Question | null
	userAnswer: string
	showResult: boolean
	isCorrect: boolean
	wrongQuestions: WrongQuestion[]
}

const loadWrongQuestions = (): WrongQuestion[] => {
	try {
		const stored = localStorage.getItem('wrongQuestions')
		return stored ? JSON.parse(stored) : []
	} catch {
		return []
	}
}

const saveWrongQuestions = (questions: WrongQuestion[]) => {
	localStorage.setItem('wrongQuestions', JSON.stringify(questions))
}

const initialState: QuestionsState = {
	currentQuestion: null,
	userAnswer: '',
	showResult: false,
	isCorrect: false,
	wrongQuestions: loadWrongQuestions(),
}

const questionsSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		setCurrentQuestion: (state, action: PayloadAction<Question>) => {
			state.currentQuestion = action.payload
			state.userAnswer = ''
			state.showResult = false
			state.isCorrect = false
		},
		setUserAnswer: (state, action: PayloadAction<string>) => {
			state.userAnswer = action.payload
		},
		submitAnswer: (state) => {
			if (!state.currentQuestion) return

			const userNum = parseInt(state.userAnswer)
			state.isCorrect = userNum === state.currentQuestion.answer
			state.showResult = true

			if (!state.isCorrect) {
				// 添加到错题本
				const questionId = state.currentQuestion.id
				const existingIndex = state.wrongQuestions.findIndex(
					(q) => q.id === questionId
				)

				if (existingIndex >= 0) {
					// 重置连续答对次数
					state.wrongQuestions[existingIndex].consecutiveCorrect = 0
					state.wrongQuestions[existingIndex].lastAttempt = Date.now()
				} else {
					// 新增错题
					state.wrongQuestions.push({
						...state.currentQuestion,
						consecutiveCorrect: 0,
						lastAttempt: Date.now(),
					})
				}
				saveWrongQuestions(state.wrongQuestions)
			} else {
				// 如果答对了，检查是否是错题本中的题目
				const questionId = state.currentQuestion.id
				const existingIndex = state.wrongQuestions.findIndex(
					(q) => q.id === questionId
				)

				if (existingIndex >= 0) {
					state.wrongQuestions[existingIndex].consecutiveCorrect += 1
					state.wrongQuestions[existingIndex].lastAttempt = Date.now()

					// 如果连续答对3次，从错题本移除
					if (state.wrongQuestions[existingIndex].consecutiveCorrect >= 3) {
						state.wrongQuestions.splice(existingIndex, 1)
					}
					saveWrongQuestions(state.wrongQuestions)
				}
			}
		},
		removeWrongQuestion: (state, action: PayloadAction<string>) => {
			state.wrongQuestions = state.wrongQuestions.filter(
				(q) => q.id !== action.payload
			)
			saveWrongQuestions(state.wrongQuestions)
		},
		resetResult: (state) => {
			state.showResult = false
			state.userAnswer = ''
		},
	},
})

export const {
	setCurrentQuestion,
	setUserAnswer,
	submitAnswer,
	removeWrongQuestion,
	resetResult,
} = questionsSlice.actions

export default questionsSlice.reducer
