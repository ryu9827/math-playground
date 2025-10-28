# 🔍 Emoji 调试器使用说明

## 如何访问

应用正在运行时，有以下几种方式访问 Emoji 调试器：

### 方法 1: 浏览器控制台

1. 按 F12 打开开发者工具
2. 切换到 Console 标签
3. 输入并执行：

```javascript
window.location.hash = '#emoji-debug'
```

### 方法 2: 直接修改地址栏

在浏览器地址栏的 URL 后面添加 `#emoji-debug`

- 例如：`http://localhost:9001/#emoji-debug`

### 方法 3: 书签

将以下代码保存为书签，点击即可跳转：

```javascript
javascript: window.location.hash = '#emoji-debug'
```

## 调试页面功能

Emoji 调试器会显示：

1. **所有 emoji 分类**：

   - ➕ 加法动画 (103 个)
   - ➖ 减法动画 (20 个)
   - ✖️ 乘法动画 (14 个)
   - ➗ 除法动画 (18 个)

2. **每个 emoji 的信息**：

   - 实际显示的 emoji
   - 在源文件 `animationGenerator.tsx` 中的行号
   - 序号

3. **兼容性检查**：
   - 如果 emoji 显示为方框 □ 或问号 �，说明浏览器不支持该 emoji
   - 记录这些 emoji 的行号，我可以将它们替换为更兼容的版本

## 已知问题

- 第 79 行的 emoji 可能已经损坏（显示为 �）

## 返回主页面

在地址栏中删除 `#emoji-debug`，或者输入：

```javascript
window.location.hash = '#+'
```
