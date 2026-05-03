import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { translations } from '../utils/i18n'
import { TabType } from '../App'
import '../styles/Navigation.scss'

interface NavigationProps {
	currentTab: TabType
	onTabChange: (tab: TabType) => void
	onSettingsClick: () => void // 新增：设置按钮点击处理
}

export const Navigation: React.FC<NavigationProps> = ({
	currentTab,
	onTabChange,
	onSettingsClick,
}) => {
	const { language } = useSelector((state: RootState) => state.settings)
	const { wrongQuestions } = useSelector((state: RootState) => state.questions)
	const t = translations[language]

	return (
		<nav className='navigation'>
			<div className='nav-tabs'>
				<button
					className={`nav-tab ${currentTab === '+' ? 'active' : ''}`}
					onClick={() => onTabChange('+')}
					data-tab='addition'
				>
					<span className='tab-symbol'>+</span>
					{t.addition}
				</button>
				<button
					className={`nav-tab ${currentTab === '-' ? 'active' : ''}`}
					onClick={() => onTabChange('-')}
					data-tab='subtraction'
				>
					<span className='tab-symbol'>-</span>
					{t.subtraction}
				</button>
				<button
					className={`nav-tab ${currentTab === '×' ? 'active' : ''}`}
					onClick={() => onTabChange('×')}
					data-tab='multiplication'
				>
					<span className='tab-symbol'>×</span>
					{t.multiplication}
				</button>
				<button
					className={`nav-tab ${currentTab === '÷' ? 'active' : ''}`}
					onClick={() => onTabChange('÷')}
					data-tab='division'
				>
					<span className='tab-symbol'>÷</span>
					{t.division}
				</button>
				<button
					className={`nav-tab ${currentTab === 'random' ? 'active' : ''}`}
					onClick={() => onTabChange('random')}
					data-tab='random'
				>
					<span className='tab-symbol'>❓</span>
					{t.randomQuiz}
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
			</div>

			<button
				className='settings-btn'
				onClick={onSettingsClick}
				title={t.settings}
			>
				<svg
					width='20'
					height='20'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<circle cx='12' cy='12' r='3'></circle>
					<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
				</svg>
				<span className='settings-btn-label'>{t.settings}</span>
			</button>
		</nav>
	)
}
