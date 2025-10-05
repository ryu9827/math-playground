// 每日统计工具
const DAILY_STATS_KEY = 'math-playground-daily-stats'

interface DailyStats {
	date: string // YYYY-MM-DD format
	questionsAnswered: number
	goalAchieved: boolean // 今天是否已达成目标并播放过动画
}

// 获取今天的日期字符串
const getTodayString = (): string => {
	const today = new Date()
	return today.toISOString().split('T')[0] // YYYY-MM-DD
}

// 加载每日统计
export const loadDailyStats = (): DailyStats => {
	try {
		const saved = localStorage.getItem(DAILY_STATS_KEY)
		if (saved) {
			const stats: DailyStats = JSON.parse(saved)
			const today = getTodayString()

			// 如果是新的一天，重置计数
			if (stats.date !== today) {
				const newStats = { date: today, questionsAnswered: 0, goalAchieved: false }
				saveDailyStats(newStats)
				return newStats
			}

			return stats
		}
	} catch (error) {
		console.error('Failed to load daily stats:', error)
	}

	// 默认返回今天的初始统计
	const newStats = { date: getTodayString(), questionsAnswered: 0, goalAchieved: false }
	saveDailyStats(newStats)
	return newStats
}

// 保存每日统计
export const saveDailyStats = (stats: DailyStats): void => {
	try {
		localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(stats))
	} catch (error) {
		console.error('Failed to save daily stats:', error)
	}
}

// 增加题目计数
export const incrementQuestionsAnswered = (): number => {
	const stats = loadDailyStats()
	stats.questionsAnswered += 1
	saveDailyStats(stats)
	return stats.questionsAnswered
}

// 获取今天答题数量
export const getTodayQuestionsCount = (): number => {
	const stats = loadDailyStats()
	return stats.questionsAnswered
}

// 标记今天目标已达成
export const markGoalAchieved = (): void => {
	const stats = loadDailyStats()
	stats.goalAchieved = true
	saveDailyStats(stats)
}

// 检查今天是否已达成目标
export const hasGoalBeenAchieved = (): boolean => {
	const stats = loadDailyStats()
	return stats.goalAchieved
}
