import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { translations } from '../utils/i18n'
import { TabType } from '../App'
import '../styles/Navigation.scss'

interface NavigationProps {
	currentTab: TabType
	onTabChange: (tab: TabType) => void
}

export const Navigation: React.FC<NavigationProps> = ({
	currentTab,
	onTabChange,
}) => {
	const { language } = useSelector((state: RootState) => state.settings)
	const { wrongQuestions } = useSelector((state: RootState) => state.questions)
	const t = translations[language]

	return (
		<nav className='navigation'>
			<button
				className={`nav-tab ${currentTab === '+' ? 'active' : ''}`}
				onClick={() => onTabChange('+')}
				data-tab='addition'
			>
				{t.addition}
			</button>
			<button
				className={`nav-tab ${currentTab === '-' ? 'active' : ''}`}
				onClick={() => onTabChange('-')}
				data-tab='subtraction'
			>
				{t.subtraction}
			</button>
			<button
				className={`nav-tab ${currentTab === '×' ? 'active' : ''}`}
				onClick={() => onTabChange('×')}
				data-tab='multiplication'
			>
				{t.multiplication}
			</button>
			<button
				className={`nav-tab ${currentTab === '÷' ? 'active' : ''}`}
				onClick={() => onTabChange('÷')}
				data-tab='division'
			>
				{t.division}
			</button>
			<button
				className={`nav-tab ${currentTab === 'wrong' ? 'active' : ''}`}
				onClick={() => onTabChange('wrong')}
				data-tab='wrong'
			>
				{t.wrongQuestions}
				{wrongQuestions.length > 0 && (
					<span className='badge'>{wrongQuestions.length}</span>
				)}
			</button>
			<button
				className={`nav-tab ${currentTab === 'settings' ? 'active' : ''}`}
				onClick={() => onTabChange('settings')}
				data-tab='settings'
			>
				{t.settings}
			</button>
		</nav>
	)
}
