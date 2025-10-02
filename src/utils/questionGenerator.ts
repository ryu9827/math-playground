import { Question, WrongQuestion } from '../store/questionsSlice'
import { OperationType } from '../App'

export const generateQuestionId = (
	num1: number,
	num2: number,
	operation: OperationType
): string => {
	return `${num1}${operation}${num2}`
}

// 生成4个选项，包括正确答案
export const generateOptions = (
	correctAnswer: number,
	max: number
): number[] => {
	const options = new Set<number>()
	options.add(correctAnswer)

	// 生成3个错误答案
	while (options.size < 4) {
		let wrongAnswer: number
		const offset = Math.floor(Math.random() * 5) + 1 // 1-5的偏移量

		if (Math.random() < 0.5) {
			wrongAnswer = correctAnswer + offset
		} else {
			wrongAnswer = correctAnswer - offset
		}

		// 确保错误答案在合理范围内
		if (
			wrongAnswer >= 0 &&
			wrongAnswer <= max * 2 &&
			wrongAnswer !== correctAnswer
		) {
			options.add(wrongAnswer)
		}
	}

	// 随机打乱选项顺序
	return Array.from(options).sort(() => Math.random() - 0.5)
}

export const generateNewQuestion = (
	max: number,
	operationType: OperationType,
	wrongQuestions: WrongQuestion[]
): Question => {
	// 30% 概率从错题本中选择（且运算类型相同）
	const matchingWrongQuestions = wrongQuestions.filter(
		(q) => q.operation === operationType
	)
	const useWrongQuestion =
		matchingWrongQuestions.length > 0 && Math.random() < 0.3

	if (useWrongQuestion) {
		const randomWrong =
			matchingWrongQuestions[
				Math.floor(Math.random() * matchingWrongQuestions.length)
			]
		return {
			id: randomWrong.id,
			num1: randomWrong.num1,
			num2: randomWrong.num2,
			operation: randomWrong.operation,
			answer: randomWrong.answer,
		}
	}

	// 生成新题目，确保所有数字（包括结果）都在max范围内
	let num1: number
	let num2: number
	let answer: number

	switch (operationType) {
		case '+':
			// 加法：确保 num1 + num2 <= max
			num1 = Math.floor(Math.random() * max) + 1
			num2 = Math.floor(Math.random() * (max - num1)) + 1
			answer = num1 + num2
			break

		case '-':
			// 减法：确保结果 >= 0 且被减数 <= max
			answer = Math.floor(Math.random() * max)
			num2 = Math.floor(Math.random() * (max - answer)) + 1
			num1 = answer + num2
			break

		case '×':
			// 乘法：确保 num1 * num2 <= max
			const maxMultiplier = Math.min(Math.floor(Math.sqrt(max)), 12)
			num1 = Math.floor(Math.random() * maxMultiplier) + 1
			const maxNum2 = Math.min(Math.floor(max / num1), 12)
			num2 = Math.floor(Math.random() * maxNum2) + 1
			answer = num1 * num2
			break

		case '÷':
			// 除法：确保商 <= max，被除数 <= max
			const maxDivisor = Math.min(max, 12)
			num2 = Math.floor(Math.random() * maxDivisor) + 1 // 除数
			answer =
				Math.floor(Math.random() * Math.min(Math.floor(max / num2), 12)) + 1 // 商
			num1 = num2 * answer // 被除数
			break

		default:
			num1 = Math.floor(Math.random() * max) + 1
			num2 = Math.floor(Math.random() * (max - num1)) + 1
			answer = num1 + num2
	}

	return {
		id: generateQuestionId(num1, num2, operationType),
		num1,
		num2,
		operation: operationType,
		answer,
	}
}
