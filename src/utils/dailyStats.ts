// 每日统计工具
const DAILY_STATS_KEY = 'math-playground-daily-stats'

interface DailyStats {
	date: string // YYYY-MM-DD format
	questionsAnswered: number
	goalAchieved: boolean // 今天是否已达成目标并播放过动画
	milestonesAchieved: number[] // 已经触发过奖励的里程碑，例如 [20, 40, 60]
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
				const newStats = {
					date: today,
					questionsAnswered: 0,
					goalAchieved: false,
					milestonesAchieved: [],
				}
				saveDailyStats(newStats)
				return newStats
			}

			// 向后兼容：如果旧数据没有 milestonesAchieved，添加它
			if (!stats.milestonesAchieved) {
				stats.milestonesAchieved = []
			}

			return stats
		}
	} catch (error) {
		console.error('Failed to load daily stats:', error)
	}

	// 默认返回今天的初始统计
	const newStats = {
		date: getTodayString(),
		questionsAnswered: 0,
		goalAchieved: false,
		milestonesAchieved: [],
	}
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

// 检查是否达到新的里程碑（每日目标的倍数）
// 返回新达到的里程碑数值，如果没有则返回 null
export const checkMilestone = (dailyGoal: number): number | null => {
	const stats = loadDailyStats()
	const count = stats.questionsAnswered

	// 计算当前应该在哪个里程碑（向下取整）
	const currentMilestone = Math.floor(count / dailyGoal) * dailyGoal

	// 如果当前里程碑大于0且不在已达成列表中，说明是新里程碑
	if (
		currentMilestone > 0 &&
		!stats.milestonesAchieved.includes(currentMilestone)
	) {
		// 记录这个里程碑
		stats.milestonesAchieved.push(currentMilestone)
		saveDailyStats(stats)
		return currentMilestone
	}

	return null
}

// 获取里程碑次数（第几次达成目标）
export const getMilestoneCount = (
	milestone: number,
	dailyGoal: number
): number => {
	return milestone / dailyGoal
}
