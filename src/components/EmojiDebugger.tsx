import React from 'react'
import '../styles/EmojiDebugger.scss'

// 从 animationGenerator.tsx 中复制的 emoji 数据
// 每个 emoji 都标注了在原文件中的起始行号
const emojiData = {
	addition: [
		{ emoji: '😊', line: 10 },
		{ emoji: '🎉', line: 11 },
		{ emoji: '🌟', line: 12 },
		{ emoji: '✨', line: 13 },
		{ emoji: '🎊', line: 14 },
		{ emoji: '🎈', line: 15 },
		{ emoji: '🎁', line: 16 },
		{ emoji: '🏆', line: 17 },
		{ emoji: '🌈', line: 18 },
		{ emoji: '⭐', line: 19 },
		{ emoji: '💫', line: 20 },
		{ emoji: '🌸', line: 21 },
		{ emoji: '🌺', line: 22 },
		{ emoji: '🌻', line: 23 },
		{ emoji: '🌼', line: 24 },
		{ emoji: '🌷', line: 25 },
		{ emoji: '🍀', line: 26 },
		{ emoji: '🦋', line: 27 },
		{ emoji: '🐝', line: 28 },
		{ emoji: '🐞', line: 29 },
		{ emoji: '🎯', line: 30 },
		{ emoji: '🎪', line: 31 },
		{ emoji: '🎨', line: 32 },
		{ emoji: '🦄', line: 33 },
		{ emoji: '🐰', line: 34 },
		{ emoji: '🎀', line: 35 },
		{ emoji: '🍭', line: 36 },
		{ emoji: '🧸', line: 37 },
		{ emoji: '🎂', line: 38 },
		{ emoji: '🍓', line: 39 },
		{ emoji: '🦊', line: 40 },
		{ emoji: '🐱', line: 41 },
		{ emoji: '🎬', line: 42 },
		{ emoji: '🌞', line: 44 },
		{ emoji: '🌝', line: 45 },
		{ emoji: '💖', line: 46 },
		{ emoji: '💝', line: 47 },
		{ emoji: '💗', line: 48 },
		{ emoji: '💓', line: 49 },
		{ emoji: '💕', line: 50 },
		{ emoji: '💞', line: 51 },
		{ emoji: '💘', line: 52 },
		{ emoji: '💌', line: 53 },
		{ emoji: '🎵', line: 54 },
		{ emoji: '🎶', line: 55 },
		{ emoji: '🎼', line: 56 },
		{ emoji: '🎤', line: 57 },
		{ emoji: '🎧', line: 58 },
		{ emoji: '🎸', line: 59 },
		{ emoji: '🎹', line: 60 },
		{ emoji: '🥁', line: 61 },
		{ emoji: '🎺', line: 62 },
		{ emoji: '🎷', line: 63 },
		{ emoji: '🎻', line: 64 },
		{ emoji: '🪕', line: 65 },
		{ emoji: '🌹', line: 66 },
		{ emoji: '🌺', line: 67 },
		{ emoji: '🌴', line: 68 },
		{ emoji: '🌵', line: 69 },
		{ emoji: '🌾', line: 70 },
		{ emoji: '🌿', line: 71 },
		{ emoji: '🍁', line: 72 },
		{ emoji: '🍂', line: 73 },
		{ emoji: '🍃', line: 74 },
		{ emoji: '🐦', line: 75 },
		{ emoji: '🐣', line: 76 },
		{ emoji: '🐤', line: 77 },
		{ emoji: '🐥', line: 78 },
		{ emoji: '🐸', line: 79 },
		{ emoji: '🐢', line: 80 },
		{ emoji: '🐙', line: 81 },
		{ emoji: '🐠', line: 82 },
		{ emoji: '🐟', line: 83 },
		{ emoji: '🐡', line: 84 },
		{ emoji: '🐬', line: 85 },
		{ emoji: '🐫', line: 86 },
		{ emoji: '🐄', line: 87 },
		{ emoji: '🐎', line: 88 },
		{ emoji: '🐖', line: 89 },
		{ emoji: '🐑', line: 90 },
		{ emoji: '🐐', line: 91 },
		{ emoji: '🐈', line: 92 },
		{ emoji: '🐓', line: 93 },
		{ emoji: '🐇', line: 94 },
		{ emoji: '🍎', line: 95 },
		{ emoji: '🍊', line: 96 },
		{ emoji: '🍋', line: 97 },
		{ emoji: '🍌', line: 98 },
		{ emoji: '🍉', line: 99 },
		{ emoji: '🍇', line: 100 },
		{ emoji: '🍑', line: 101 },
		{ emoji: '🍒', line: 102 },
		{ emoji: '🍈', line: 103 },
		{ emoji: '🍏', line: 104 },
		{ emoji: '🍐', line: 105 },
		{ emoji: '🍍', line: 106 },
		{ emoji: '🥑', line: 107 },
		{ emoji: '🍆', line: 108 },
		{ emoji: '🌽', line: 109 },
		{ emoji: '🌶', line: 110 },
		{ emoji: '🥒', line: 111 },
		{ emoji: '🥬', line: 112 },
		{ emoji: '🥔', line: 113 },
		{ emoji: '🍠', line: 114 },
		{ emoji: '🥐', line: 115 },
	],
	subtraction: [
		{ emoji: '🤔', line: 118 },
		{ emoji: '🧠', line: 119 },
		{ emoji: '💡', line: 120 },
		{ emoji: '🔍', line: 121 },
		{ emoji: '📚', line: 122 },
		{ emoji: '✏', line: 123 },
		{ emoji: '📝', line: 124 },
		{ emoji: '🎓', line: 125 },
		{ emoji: '🎲', line: 126 },
		{ emoji: '🔬', line: 127 },
		{ emoji: '📈', line: 128 },
		{ emoji: '🔑', line: 129 },
		{ emoji: '🎯', line: 130 },
		{ emoji: '🏅', line: 131 },
		{ emoji: '🌟', line: 132 },
		{ emoji: '⭐', line: 133 },
		{ emoji: '📖', line: 134 },
		{ emoji: '📗', line: 135 },
		{ emoji: '📘', line: 136 },
		{ emoji: '📙', line: 137 },
	],
	multiplication: [
		{ emoji: '🚀', line: 140 },
		{ emoji: '⚡', line: 141 },
		{ emoji: '💥', line: 142 },
		{ emoji: '🔥', line: 143 },
		{ emoji: '💪', line: 144 },
		{ emoji: '🎸', line: 145 },
		{ emoji: '🎵', line: 146 },
		{ emoji: '🎻', line: 147 },
		{ emoji: '⚽', line: 148 },
		{ emoji: '🏐', line: 149 },
		{ emoji: '⚾', line: 150 },
		{ emoji: '🎪', line: 151 },
		{ emoji: '🎭', line: 152 },
		{ emoji: '🎰', line: 153 },
	],
	division: [
		{ emoji: '🧘', line: 156 },
		{ emoji: '🎋', line: 157 },
		{ emoji: '🍃', line: 158 },
		{ emoji: '🐬', line: 159 },
		{ emoji: '🐳', line: 160 },
		{ emoji: '🐋', line: 161 },
		{ emoji: '🌊', line: 162 },
		{ emoji: '🗻', line: 163 },
		{ emoji: '🌄', line: 164 },
		{ emoji: '🌅', line: 165 },
		{ emoji: '🌌', line: 166 },
		{ emoji: '🌙', line: 167 },
		{ emoji: '⭐', line: 168 },
		{ emoji: '💫', line: 169 },
		{ emoji: '✨', line: 170 },
		{ emoji: '🌷', line: 171 },
		{ emoji: '🏵', line: 172 },
		{ emoji: '🌹', line: 173 },
	],
}

export const EmojiDebugger: React.FC = () => {
	return (
		<div className='emoji-debugger'>
			<h1>🔍 Emoji 调试器</h1>
			<p className='instructions'>
				检查每个 emoji 是否能正确显示。如果看到方框 □ 或问号 �，说明该 emoji
				不兼容。
			</p>

			{Object.entries(emojiData).map(([category, emojis]) => (
				<div key={category} className='emoji-category'>
					<h2>
						{category === 'addition' && '➕ 加法动画'}
						{category === 'subtraction' && '➖ 减法动画'}
						{category === 'multiplication' && '✖️ 乘法动画'}
						{category === 'division' && '➗ 除法动画'}
						<span className='count'>({emojis.length} 个)</span>
					</h2>
					<div className='emoji-grid'>
						{emojis.map((item, index) => (
							<div key={index} className='emoji-item'>
								<div className='emoji-display'>{item.emoji}</div>
								<div className='emoji-info'>
									<div className='emoji-line'>行 {item.line}</div>
									<div className='emoji-index'>#{index + 1}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}

			<div className='summary'>
				<h3>📊 统计</h3>
				<ul>
					<li>加法: {emojiData.addition.length} 个 emoji</li>
					<li>减法: {emojiData.subtraction.length} 个 emoji</li>
					<li>乘法: {emojiData.multiplication.length} 个 emoji</li>
					<li>除法: {emojiData.division.length} 个 emoji</li>
					<li>
						总计:{' '}
						{emojiData.addition.length +
							emojiData.subtraction.length +
							emojiData.multiplication.length +
							emojiData.division.length}{' '}
						个 emoji
					</li>
				</ul>
			</div>

			<div className='help'>
				<h3>💡 使用说明</h3>
				<ol>
					<li>浏览所有 emoji，查看是否有显示异常的</li>
					<li>记录显示为方框或问号的 emoji 的行号</li>
					<li>
						在 <code>src/utils/animationGenerator.tsx</code> 中找到对应行号
					</li>
					<li>将不兼容的 emoji 替换为更通用的版本</li>
				</ol>
			</div>
		</div>
	)
}
