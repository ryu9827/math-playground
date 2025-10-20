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
	lastQuestion?: Question,
	avoidZero?: boolean
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
		// 如果应用题模式且题目包含0，则重新生成
		if (avoidZero && (randomWrong.num1 === 0 || randomWrong.num2 === 0)) {
			return generateNewQuestionInternal(
				min,
				max,
				operationType,
				lastQuestion,
				avoidZero
			)
		}
		const question = {
			id: randomWrong.id,
			num1: randomWrong.num1,
			num2: randomWrong.num2,
			operation: randomWrong.operation,
			answer: randomWrong.answer,
		}
		// 如果和上一题相同，尝试生成新题
		if (lastQuestion && question.id === lastQuestion.id) {
			return generateNewQuestionInternal(
				min,
				max,
				operationType,
				lastQuestion,
				avoidZero
			)
		}
		return question
	}

	// 生成新题目，确保所有数字（包括结果）都在 min-max 范围内
	return generateNewQuestionInternal(
		min,
		max,
		operationType,
		lastQuestion,
		avoidZero
	)
}

const generateNewQuestionInternal = (
	min: number,
	max: number,
	operationType: OperationType,
	lastQuestion?: Question,
	avoidZero?: boolean
): Question => {
	let num1: number
	let num2: number
	let answer: number
	let attempts = 0
	const maxAttempts = 20 // 最多尝试20次避免无限循环

	// 如果需要避免0，调整 min 的值
	const effectiveMin = avoidZero ? Math.max(min, 1) : min

	do {
		switch (operationType) {
			case '+':
				// 加法：num1 >= min, num2 >= min, num1 + num2 <= max
				// 首先确保 max >= 2 * min，否则无法生成有效题目
				if (max < 2 * min) {
					// 如果上限小于2倍下限，无法生成符合条件的题目
					// 回退到使用更宽松的条件
					num1 = min
					num2 = min
					answer = num1 + num2
				} else {
					// num1 范围：[min, max - min]（确保至少留给 num2 一个 min 的空间）
					const maxNum1 = max - min
					num1 = Math.floor(Math.random() * (maxNum1 - min + 1)) + min

					// num2 范围：[min, max - num1]（确保 num2 >= min 且结果 <= max）
					const maxNum2ForAdd = max - num1
					num2 = Math.floor(Math.random() * (maxNum2ForAdd - min + 1)) + min
					answer = num1 + num2
				}
				break

			case '-':
				// 减法：min=减数下限，max=被减数上限
				// num1（被减数）<= max，num2（减数）>= min，且 num1 > num2
				// 先确保 min < max，否则使用默认值
				if (effectiveMin >= max) {
					// 如果减数下限 >= 被减数上限，无法生成有效题目，使用默认逻辑
					num1 = Math.floor(Math.random() * (max - 1)) + 2 // 被减数至少为2
					num2 = Math.floor(Math.random() * (num1 - 1)) + 1 // 减数至少为1，且小于被减数
				} else {
					// 生成被减数：在 [min+1, max] 范围内（确保至少比减数大1）
					num1 = Math.floor(Math.random() * (max - effectiveMin)) + effectiveMin + 1
					// 生成减数：在 [min, num1-1] 范围内
					num2 = Math.floor(Math.random() * (num1 - effectiveMin)) + effectiveMin
				}
				answer = num1 - num2
				break

			case '×':
				// 乘法：确保 num1 * num2 在 [min, max] 范围内
				const maxMultiplier = Math.min(Math.floor(Math.sqrt(max)), 12)
				const minMultiplier = avoidZero ? 1 : 0
				num1 =
					Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) +
					minMultiplier
				// 如果 num1 为 0，则强制 num1 至少为 1（避免除以0）
				if (num1 === 0) num1 = 1
				const maxNum2 = Math.min(Math.floor(max / num1), 12)
				num2 =
					Math.floor(Math.random() * (maxNum2 - minMultiplier + 1)) +
					minMultiplier
				answer = num1 * num2
				// 如果结果小于 min，重新调整
				if (answer < effectiveMin) {
					num1 = Math.max(2, Math.floor(Math.sqrt(effectiveMin)))
					num2 = Math.ceil(effectiveMin / num1)
					answer = num1 * num2
				}
				break

			case '÷':
				// 除法：确保商在 [min, max] 范围内，被除数也在范围内
				// 除数永远不能为0（数学规则）
				// 优化：除数范围设为 2-12，减少1的出现
				const minDivisor = avoidZero ? 2 : 1
				const maxDivisor = Math.min(12, Math.floor(max / 2))
				num2 =
					Math.floor(Math.random() * (maxDivisor - minDivisor + 1)) + minDivisor

				// 商（答案）的范围
				const quotientMax = Math.min(Math.floor(max / num2), 12)
				const quotientMin = Math.max(Math.ceil(effectiveMin / num2), 1)
				answer =
					Math.floor(Math.random() * (quotientMax - quotientMin + 1)) +
					quotientMin // 商
				num1 = num2 * answer // 被除数
				break

			default:
				num1 =
					Math.floor(Math.random() * (max - effectiveMin + 1)) + effectiveMin
				num2 = Math.floor(Math.random() * (max - num1)) + (avoidZero ? 1 : 0)
				answer = num1 + num2
		}

		attempts++

		// 如果和上一题相同，或在应用题模式下包含0，继续循环生成新题（除非尝试次数过多）
	} while (
		((lastQuestion &&
			generateQuestionId(num1, num2, operationType) === lastQuestion.id) ||
			(avoidZero && (num1 === 0 || num2 === 0))) &&
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
