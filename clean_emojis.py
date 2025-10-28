import re

# 读取文件
with open('src/utils/animationGenerator.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 记录原始长度
original_len = len(content)

# 1. 移除所有 U+FE0F 变体选择器
content = content.replace('\uFE0F', '')

# 2. 替换所有可能有问题的Emoji 11.0+表情
problematic_emojis = {
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

replace_count = 0
for old, new in problematic_emojis.items():
    count = content.count(old)
    if count > 0:
        content = content.replace(old, new)
        replace_count += count
        print(f"替换 {old} -> {new}: {count} 次")

# 3. 移除任何替换字符
bad_char_count = content.count('�')
if bad_char_count > 0:
    content = content.replace('�', '🌟')
    print(f"移除损坏字符: {bad_char_count} 个")

# 保存文件
with open('src/utils/animationGenerator.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

new_len = len(content)
print(f"\n✅ 清理完成！")
print(f"文件大小: {original_len} -> {new_len} 字节")
print(f"共替换: {replace_count} 个emoji")
