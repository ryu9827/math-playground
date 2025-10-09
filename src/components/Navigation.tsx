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
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<circle cx='12' cy='12' r='3'></circle>
					<path d='M12 1v6m0 6v6'></path>
					<path d='M17 3.34L14.5 6.5m-5 11l-2.5 3.16'></path>
					<path d='M23 12h-6m-6 0H1'></path>
					<path d='M20.66 17l-3.16-2.5m-11 0L3.34 17'></path>
					<path d='M20.66 7l-3.16 2.5m-11 0L3.34 7'></path>
				</svg>
			</button>
		</nav>
	)
}
