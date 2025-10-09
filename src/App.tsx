import React, { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Question } from './components/Question'
import { WrongQuestions } from './components/WrongQuestions'
import { SettingsModal } from './components/SettingsModal'
import { DailyStats } from './components/DailyStats'
import { GoalAchievedAnimation } from './components/GoalAchievedAnimation'
import './App.scss'

export type OperationType = '+' | '-' | '×' | '÷'
export type TabType = OperationType | 'wrong'

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
				saved === 'wrong')
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
	const [questionKey, setQuestionKey] = useState(0) // 用于刷新题目

	const handleTabChange = (tab: TabType) => {
		setCurrentTab(tab)
		saveCurrentTab(tab) // 保存到 localStorage
		if (tab === '+' || tab === '-' || tab === '×' || tab === '÷') {
			setCurrentOperation(tab)
		}
	}

	const handleSettingsSaved = () => {
		// 设置保存后，增加 key 值来强制刷新题目
		setQuestionKey((prev) => prev + 1)
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
						key={questionKey}
						operation={currentOperation}
						onGoalAchieved={() => setShowGoalAnimation(true)}
					/>
				)}
				{currentTab === 'wrong' && (
					<WrongQuestions onNavigateToQuestion={handleTabChange} />
				)}
			</main>

			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
				onSettingsSaved={handleSettingsSaved}
			/>

			<GoalAchievedAnimation
				show={showGoalAnimation}
				onComplete={() => setShowGoalAnimation(false)}
			/>
		</div>
	)
}

export default App
