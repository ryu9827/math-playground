import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { Navigation } from './components/Navigation'
import { Question } from './components/Question'
import { WrongQuestions } from './components/WrongQuestions'
import { NumberSplit } from './components/NumberSplit'
import { EmojiDebugger } from './components/EmojiDebugger'
import { SettingsModal } from './components/SettingsModal'
import { DailyStats } from './components/DailyStats'
import { GoalAchievedAnimation } from './components/GoalAchievedAnimation'
import { MilestoneReward } from './components/MilestoneReward'
import './App.scss'

export type OperationType = '+' | '-' | '×' | '÷'
export type TabType = OperationType | 'wrong' | 'split' | 'emoji-debug'

const STORAGE_KEY = 'math-playground-current-tab'

// 从 localStorage 加载上次选择的 tab
const loadCurrentTab = (): TabType => {
	try {
		const saved = localStorage.getItem(STORAGE_KEY)
		if (
			saved &&
			(saved === '+' ||
				saved === '-' ||
				saved === '×' ||
				saved === '÷' ||
				saved === 'wrong' ||
				saved === 'split')
		) {
			return saved as TabType
		}
	} catch (error) {
		console.error('Failed to load current tab from localStorage:', error)
	}
	return '+' // 默认返回加法
}

// 保存当前 tab 到 localStorage
const saveCurrentTab = (tab: TabType) => {
	try {
		localStorage.setItem(STORAGE_KEY, tab)
	} catch (error) {
		console.error('Failed to save current tab to localStorage:', error)
	}
}

function App() {
	const { language } = useSelector((state: RootState) => state.settings)
	const [currentTab, setCurrentTab] = useState<TabType>(loadCurrentTab())
	const [currentOperation, setCurrentOperation] = useState<OperationType>(
		() => {
			const initialTab = loadCurrentTab()
			return initialTab === '+' ||
				initialTab === '-' ||
				initialTab === '×' ||
				initialTab === '÷'
				? initialTab
				: '+'
		}
	)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const [showGoalAnimation, setShowGoalAnimation] = useState(false)
	const [showMilestoneReward, setShowMilestoneReward] = useState(false)
	const [currentMilestone, setCurrentMilestone] = useState(0)
	const [currentMilestoneCount, setCurrentMilestoneCount] = useState(0)

	const handleTabChange = (tab: TabType) => {
		setCurrentTab(tab)
		saveCurrentTab(tab) // 保存到 localStorage
		if (tab === '+' || tab === '-' || tab === '×' || tab === '÷') {
			setCurrentOperation(tab)
		}
	}

	return (
		<div className='App'>
			<Navigation
				currentTab={currentTab}
				onTabChange={handleTabChange}
				onSettingsClick={() => setIsSettingsOpen(true)}
			/>

			<DailyStats />

			<main className='app-content'>
				{(currentTab === '+' ||
					currentTab === '-' ||
					currentTab === '×' ||
					currentTab === '÷') && (
					<Question
						operation={currentOperation}
						onGoalAchieved={() => setShowGoalAnimation(true)}
						onMilestoneAchieved={(milestone, milestoneCount) => {
							setCurrentMilestone(milestone)
							setCurrentMilestoneCount(milestoneCount)
							setShowMilestoneReward(true)
						}}
					/>
				)}
				{currentTab === 'split' && (
					<NumberSplit
						onGoalAchieved={() => setShowGoalAnimation(true)}
						onMilestoneAchieved={(milestone, milestoneCount) => {
							setCurrentMilestone(milestone)
							setCurrentMilestoneCount(milestoneCount)
							setShowMilestoneReward(true)
						}}
					/>
				)}
				{currentTab === 'wrong' && (
					<WrongQuestions onNavigateToQuestion={handleTabChange} />
				)}
				{currentTab === 'emoji-debug' && <EmojiDebugger />}
			</main>

			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>

			<GoalAchievedAnimation
				show={showGoalAnimation}
				onComplete={() => setShowGoalAnimation(false)}
			/>

			<MilestoneReward
				isOpen={showMilestoneReward}
				onClose={() => setShowMilestoneReward(false)}
				milestone={currentMilestone}
				milestoneCount={currentMilestoneCount}
				language={language}
			/>
		</div>
	)
}

export default App
