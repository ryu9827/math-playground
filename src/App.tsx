import React, { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Question } from './components/Question'
import { WrongQuestions } from './components/WrongQuestions'
import { Settings } from './components/Settings'
import './App.scss'

export type OperationType = '+' | '-' | '×' | '÷'
export type TabType = OperationType | 'wrong' | 'settings'

const STORAGE_KEY = 'math-playground-current-tab'

// 从 localStorage 加载上次选择的 tab
const loadCurrentTab = (): TabType => {
	try {
		const saved = localStorage.getItem(STORAGE_KEY)
		if (saved && (saved === '+' || saved === '-' || saved === '×' || saved === '÷' || saved === 'wrong' || saved === 'settings')) {
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
	const [currentOperation, setCurrentOperation] = useState<OperationType>(() => {
		const initialTab = loadCurrentTab()
		return (initialTab === '+' || initialTab === '-' || initialTab === '×' || initialTab === '÷') ? initialTab : '+'
	})

	const handleTabChange = (tab: TabType) => {
		setCurrentTab(tab)
		saveCurrentTab(tab) // 保存到 localStorage
		if (tab === '+' || tab === '-' || tab === '×' || tab === '÷') {
			setCurrentOperation(tab)
		}
	}

	return (
		<div className='App'>
			<Navigation currentTab={currentTab} onTabChange={handleTabChange} />

			<main className='app-content'>
				{(currentTab === '+' ||
					currentTab === '-' ||
					currentTab === '×' ||
					currentTab === '÷') && <Question operation={currentOperation} />}
				{currentTab === 'wrong' && (
					<WrongQuestions onNavigateToQuestion={handleTabChange} />
				)}
				{currentTab === 'settings' && <Settings />}
			</main>
		</div>
	)
}

export default App
