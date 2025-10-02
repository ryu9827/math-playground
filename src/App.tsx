import React, { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Question } from './components/Question'
import { WrongQuestions } from './components/WrongQuestions'
import { Settings } from './components/Settings'
import './App.scss'

export type OperationType = '+' | '-' | '×' | '÷'
export type TabType = OperationType | 'wrong' | 'settings'

function App() {
	const [currentTab, setCurrentTab] = useState<TabType>('+')
	const [currentOperation, setCurrentOperation] = useState<OperationType>('+')

	const handleTabChange = (tab: TabType) => {
		setCurrentTab(tab)
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
				{currentTab === 'wrong' && <WrongQuestions />}
				{currentTab === 'settings' && <Settings />}
			</main>
		</div>
	)
}

export default App
