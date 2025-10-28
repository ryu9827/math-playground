const fs = require('fs')

// 读取文件
const content = fs.readFileSync('src/utils/animationGenerator.tsx', 'utf8')
const originalLen = content.length

// 1. 移除所有 U+FE0F 变体选择器
let cleaned = content.replace(/\uFE0F/g, '')

// 2. 替换所有可能有问题的Emoji 11.0+表情
const problematicEmojis = {
	'🦚': '🐦',
	'🦜': '🐦',
	'🦩': '🐦',
	'🦢': '🦆',
	'🕊': '🐦',
	'🦑': '🐙',
	'🦞': '🦀',
	'🦈': '🐟',
	'🦓': '🐴',
	'🦍': '🐵',
	'🦧': '🐵',
	'🦛': '🦏',
	'🦙': '🐫',
	'🦘': '🐨',
	'🦮': '🐕',
	'🦝': '🐻',
	'🦨': '🦔',
	'🦡': '🦔',
	'🦦': '🦔',
	'🦥': '🐻',
	'🪕': '🎸',
	'🦸': '💪',
	'🦾': '💪',
	'⚗': '🧪',
	'🗝': '🔑',
}

let replaceCount = 0
Object.entries(problematicEmojis).forEach(([old, newEmoji]) => {
	const regex = new RegExp(old, 'g')
	const matches = (cleaned.match(regex) || []).length
	if (matches > 0) {
		cleaned = cleaned.replace(regex, newEmoji)
		replaceCount += matches
		console.log(`替换 ${old} -> ${newEmoji}: ${matches} 次`)
	}
})

// 3. 移除任何替换字符
const badCharCount = (cleaned.match(/�/g) || []).length
if (badCharCount > 0) {
	cleaned = cleaned.replace(/�/g, '🌟')
	console.log(`移除损坏字符: ${badCharCount} 个`)
}

// 保存文件
fs.writeFileSync('src/utils/animationGenerator.tsx', cleaned, 'utf8')

console.log(`\n✅ 清理完成！`)
console.log(`文件大小: ${originalLen} -> ${cleaned.length} 字节`)
console.log(`共替换: ${replaceCount} 个emoji`)
