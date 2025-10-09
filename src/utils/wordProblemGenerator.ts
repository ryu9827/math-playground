import { OperationType } from '../App'
import { Language } from './i18n'

interface WordProblemTemplate {
	question: (num1: number, num2: number) => string
	scenarios: string[]
}

// 中文应用题模板
const chineseTemplates: Record<OperationType, WordProblemTemplate[]> = {
	'+': [
		{
			question: (num1, num2) =>
				`小明有${num1}个苹果，姐姐又给了小明${num2}个苹果，请问小明现在一共有几个苹果？`,
			scenarios: ['苹果', '糖果', '玩具'],
		},
		{
			question: (num1, num2) =>
				`书架上有${num1}本书，妈妈又买了${num2}本书放上去，请问书架上现在一共有几本书？`,
			scenarios: ['书', '本子', '铅笔'],
		},
		{
			question: (num1, num2) =>
				`公园里有${num1}只小鸟，又飞来了${num2}只小鸟，请问现在一共有几只小鸟？`,
			scenarios: ['小鸟', '蝴蝶', '兔子'],
		},
		{
			question: (num1, num2) =>
				`停车场有${num1}辆车，又开进来${num2}辆车，请问现在一共有几辆车？`,
			scenarios: ['车', '自行车', '公交车'],
		},
		{
			question: (num1, num2) =>
				`花园里开了${num1}朵花，第二天又开了${num2}朵花，请问一共开了几朵花？`,
			scenarios: ['花', '玫瑰', '向日葵'],
		},
	],
	'-': [
		{
			question: (num1, num2) =>
				`小红有${num1}颗糖，吃掉了${num2}颗糖，请问小红还剩几颗糖？`,
			scenarios: ['糖', '饼干', '巧克力'],
		},
		{
			question: (num1, num2) =>
				`树上有${num1}个桃子，被小猴摘走了${num2}个，请问树上还剩几个桃子？`,
			scenarios: ['桃子', '苹果', '梨'],
		},
		{
			question: (num1, num2) =>
				`教室里有${num1}个同学，走了${num2}个同学，请问还剩几个同学？`,
			scenarios: ['同学', '小朋友', '学生'],
		},
		{
			question: (num1, num2) =>
				`盒子里有${num1}支铅笔，用掉了${num2}支，请问还剩几支铅笔？`,
			scenarios: ['铅笔', '蜡笔', '钢笔'],
		},
		{
			question: (num1, num2) =>
				`水池里有${num1}条小鱼，游走了${num2}条，请问还剩几条小鱼？`,
			scenarios: ['小鱼', '金鱼', '小虾'],
		},
	],
	'×': [
		{
			question: (num1, num2) =>
				`每个盘子里有${num1}个橘子，有${num2}个盘子，请问一共有几个橘子？`,
			scenarios: ['橘子', '苹果', '梨'],
		},
		{
			question: (num1, num2) =>
				`每束花有${num1}朵，买了${num2}束花，请问一共有几朵花？`,
			scenarios: ['花', '玫瑰', '郁金香'],
		},
		{
			question: (num1, num2) =>
				`每个文具盒有${num1}支笔，有${num2}个文具盒，请问一共有几支笔？`,
			scenarios: ['笔', '铅笔', '钢笔'],
		},
		{
			question: (num1, num2) =>
				`每排有${num1}个座位，有${num2}排，请问一共有几个座位？`,
			scenarios: ['座位', '椅子', '凳子'],
		},
		{
			question: (num1, num2) =>
				`每盒有${num1}块巧克力，买了${num2}盒，请问一共有几块巧克力？`,
			scenarios: ['巧克力', '糖果', '饼干'],
		},
	],
	'÷': [
		{
			question: (num1, num2) =>
				`有${num1}个苹果，平均分给${num2}个小朋友，每个小朋友能分到几个苹果？`,
			scenarios: ['苹果', '橘子', '糖果'],
		},
		{
			question: (num1, num2) =>
				`有${num1}本书，平均放到${num2}个书架上，每个书架放几本书？`,
			scenarios: ['书', '本子', '铅笔'],
		},
		{
			question: (num1, num2) =>
				`有${num1}朵花，平均插入${num2}个花瓶，每个花瓶插几朵花？`,
			scenarios: ['花', '玫瑰', '百合'],
		},
		{
			question: (num1, num2) =>
				`有${num1}块巧克力，平均分成${num2}份，每份有几块巧克力？`,
			scenarios: ['巧克力', '糖果', '饼干'],
		},
		{
			question: (num1, num2) =>
				`有${num1}支铅笔，平均分给${num2}个同学，每个同学分到几支铅笔？`,
			scenarios: ['铅笔', '钢笔', '蜡笔'],
		},
	],
}

// 英文应用题模板
const englishTemplates: Record<OperationType, WordProblemTemplate[]> = {
	'+': [
		{
			question: (num1, num2) =>
				`Tom has ${num1} apples. His sister gave him ${num2} more apples. How many apples does Tom have now?`,
			scenarios: ['apples', 'candies', 'toys'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} books on the shelf. Mom bought ${num2} more books. How many books are there now?`,
			scenarios: ['books', 'notebooks', 'pencils'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} birds in the park. ${num2} more birds flew in. How many birds are there now?`,
			scenarios: ['birds', 'butterflies', 'rabbits'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} cars in the parking lot. ${num2} more cars drove in. How many cars are there now?`,
			scenarios: ['cars', 'bikes', 'buses'],
		},
		{
			question: (num1, num2) =>
				`${num1} flowers bloomed in the garden. ${num2} more flowers bloomed the next day. How many flowers bloomed in total?`,
			scenarios: ['flowers', 'roses', 'sunflowers'],
		},
	],
	'-': [
		{
			question: (num1, num2) =>
				`Amy has ${num1} candies. She ate ${num2} candies. How many candies does Amy have left?`,
			scenarios: ['candies', 'cookies', 'chocolates'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} peaches on the tree. A monkey picked ${num2} peaches. How many peaches are left?`,
			scenarios: ['peaches', 'apples', 'pears'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} students in the classroom. ${num2} students left. How many students are left?`,
			scenarios: ['students', 'children', 'pupils'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} pencils in the box. ${num2} pencils were used. How many pencils are left?`,
			scenarios: ['pencils', 'crayons', 'pens'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} fish in the pond. ${num2} fish swam away. How many fish are left?`,
			scenarios: ['fish', 'goldfish', 'shrimp'],
		},
	],
	'×': [
		{
			question: (num1, num2) =>
				`There are ${num1} oranges on each plate. There are ${num2} plates. How many oranges are there in total?`,
			scenarios: ['oranges', 'apples', 'pears'],
		},
		{
			question: (num1, num2) =>
				`Each bouquet has ${num1} flowers. There are ${num2} bouquets. How many flowers are there in total?`,
			scenarios: ['flowers', 'roses', 'tulips'],
		},
		{
			question: (num1, num2) =>
				`Each pencil case has ${num1} pens. There are ${num2} pencil cases. How many pens are there in total?`,
			scenarios: ['pens', 'pencils', 'markers'],
		},
		{
			question: (num1, num2) =>
				`Each row has ${num1} seats. There are ${num2} rows. How many seats are there in total?`,
			scenarios: ['seats', 'chairs', 'stools'],
		},
		{
			question: (num1, num2) =>
				`Each box has ${num1} chocolates. There are ${num2} boxes. How many chocolates are there in total?`,
			scenarios: ['chocolates', 'candies', 'cookies'],
		},
	],
	'÷': [
		{
			question: (num1, num2) =>
				`There are ${num1} apples to share equally among ${num2} children. How many apples does each child get?`,
			scenarios: ['apples', 'oranges', 'candies'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} books to place equally on ${num2} shelves. How many books go on each shelf?`,
			scenarios: ['books', 'notebooks', 'pencils'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} flowers to put equally into ${num2} vases. How many flowers go in each vase?`,
			scenarios: ['flowers', 'roses', 'lilies'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} chocolates to divide equally into ${num2} portions. How many chocolates in each portion?`,
			scenarios: ['chocolates', 'candies', 'cookies'],
		},
		{
			question: (num1, num2) =>
				`There are ${num1} pencils to share equally among ${num2} students. How many pencils does each student get?`,
			scenarios: ['pencils', 'pens', 'crayons'],
		},
	],
}

export const generateWordProblem = (
	num1: number,
	num2: number,
	operation: OperationType,
	language: Language
): string => {
	const templates =
		language === 'zh' ? chineseTemplates : englishTemplates
	const operationTemplates = templates[operation]
	
	// 随机选择一个模板
	const randomTemplate =
		operationTemplates[Math.floor(Math.random() * operationTemplates.length)]
	
	return randomTemplate.question(num1, num2)
}
