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
	min: number,
	max: number,
	operationType: OperationType,
	wrongQuestions: WrongQuestion[],
	lastQuestion?: Question
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
		const question = {
			id: randomWrong.id,
			num1: randomWrong.num1,
			num2: randomWrong.num2,
			operation: randomWrong.operation,
			answer: randomWrong.answer,
		}
		// 如果和上一题相同，尝试生成新题
		if (lastQuestion && question.id === lastQuestion.id) {
			return generateNewQuestionInternal(min, max, operationType, lastQuestion)
		}
		return question
	}

	// 生成新题目，确保所有数字（包括结果）都在 min-max 范围内
	return generateNewQuestionInternal(min, max, operationType, lastQuestion)
}

const generateNewQuestionInternal = (
	min: number,
	max: number,
	operationType: OperationType,
	lastQuestion?: Question
): Question => {
	let num1: number
	let num2: number
	let answer: number
	let attempts = 0
	const maxAttempts = 20 // 最多尝试20次避免无限循环

	do {
		switch (operationType) {
			case '+':
				// 加法：确保 num1 + num2 在 [min, max] 范围内
				const addRange = max - min + 1
				num1 =
					Math.floor(Math.random() * Math.min(addRange, max - min + 1)) + min
				const maxNum2ForAdd = max - num1
				const minNum2ForAdd = Math.max(min - num1, 0)
				num2 =
					Math.floor(Math.random() * (maxNum2ForAdd - minNum2ForAdd + 1)) +
					minNum2ForAdd
				answer = num1 + num2
				break

			case '-':
				// 减法：确保结果在 [min, max] 范围内
				answer = Math.floor(Math.random() * (max - min + 1)) + min
				num2 =
					Math.floor(
						Math.random() * Math.min(answer - min + 1, max - min + 1)
					) + min
				num1 = answer + num2
				break

			case '×':
				// 乘法：确保 num1 * num2 在 [min, max] 范围内
				const maxMultiplier = Math.min(Math.floor(Math.sqrt(max)), 12)
				num1 = Math.floor(Math.random() * maxMultiplier) + 1
				const maxNum2 = Math.min(Math.floor(max / num1), 12)
				num2 = Math.floor(Math.random() * maxNum2) + 1
				answer = num1 * num2
				// 如果结果小于 min，重新调整
				if (answer < min) {
					num1 = Math.max(2, Math.floor(Math.sqrt(min)))
					num2 = Math.ceil(min / num1)
					answer = num1 * num2
				}
				break

			case '÷':
				// 除法：确保商在 [min, max] 范围内，被除数也在范围内
				const maxDivisor = Math.min(max, 12)
				num2 = Math.floor(Math.random() * maxDivisor) + 1 // 除数
				const quotientMax = Math.min(Math.floor(max / num2), 12)
				const quotientMin = Math.max(Math.ceil(min / num2), 1)
				answer =
					Math.floor(Math.random() * (quotientMax - quotientMin + 1)) +
					quotientMin // 商
				num1 = num2 * answer // 被除数
				break

			default:
				num1 = Math.floor(Math.random() * (max - min + 1)) + min
				num2 = Math.floor(Math.random() * (max - num1)) + 1
				answer = num1 + num2
		}

		attempts++

		// 如果和上一题相同，继续循环生成新题（除非尝试次数过多）
	} while (
		lastQuestion &&
		generateQuestionId(num1, num2, operationType) === lastQuestion.id &&
		attempts < maxAttempts
	)

	return {
		id: generateQuestionId(num1, num2, operationType),
		num1,
		num2,
		operation: operationType,
		answer,
	}
}
