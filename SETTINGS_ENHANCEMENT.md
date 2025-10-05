# 设置功能增强更新

## 更新日期

2025 年 10 月 5 日

## 更新内容

### 1. 音效开关 🔊🔇

#### 功能描述

- 在设置界面添加音效开关按钮
- 可以启用/禁用答对题目时的庆祝音效
- 设置实时保存到 localStorage
- 默认启用音效

#### 技术实现

**Redux State 更新**

```typescript
export interface SettingsState {
	soundEnabled: boolean // 新增
}
```

**设置界面**

```tsx
<button className={`toggle-btn ${soundEnabled ? 'active' : ''}`}>
	<span className='toggle-icon'>{soundEnabled ? '🔊' : '🔇'}</span>
	<span className='toggle-text'>{soundEnabled ? '启用音效' : '禁用音效'}</span>
</button>
```

**动画组件集成**

```typescript
// CelebrationAnimation.tsx
const { soundEnabled } = useSelector((state: RootState) => state.settings)

if (soundEnabled) {
	soundEffects.playRandomCelebration()
}
```

#### 样式特性

- 圆角按钮设计
- 启用时显示紫色高亮
- 悬停时按钮上移动画
- 图标+文字组合显示

---

### 2. 数字范围下限设置 🔢

#### 功能描述

- 添加数字范围的下限设置
- 与上限一起控制题目生成的数字范围
- 设置保存到 localStorage
- 默认下限为 1

#### 技术实现

**Redux State 更新**

```typescript
export interface SettingsState {
	minNumber: number // 新增
	maxNumber: number // 已有
}
```

**题目生成器更新**

```typescript
// 更新函数签名
export const generateNewQuestion = (
	min: number,     // 新增参数
	max: number,
	operationType: OperationType,
	wrongQuestions: WrongQuestion[]
): Question
```

**各运算类型的范围控制**

1. **加法**：确保 `num1 + num2` 在 `[min, max]` 范围内
2. **减法**：确保结果在 `[min, max]` 范围内
3. **乘法**：确保 `num1 × num2` 在 `[min, max]` 范围内，如果结果小于 min 则重新调整
4. **除法**：确保商在 `[min, max]` 范围内

#### 设置界面布局

```
[下限输入框]  [上限输入框]
  (1-100)       (1-100)
```

---

### 3. LocalStorage 持久化 💾

#### 实现方式

**保存时机**

- 每次修改任何设置时自动保存
- 不需要手动触发保存

**存储键名**

```typescript
'math-playground-settings'
```

**存储内容**

```json
{
	"language": "zh",
	"minNumber": 1,
	"maxNumber": 20,
	"soundEnabled": true
}
```

**加载逻辑**

```typescript
const loadSettings = (): SettingsState => {
	try {
		const stored = localStorage.getItem('math-playground-settings')
		if (stored) {
			const settings = JSON.parse(stored)
			return {
				language: settings.language || 'zh',
				minNumber: settings.minNumber || 1,
				maxNumber: settings.maxNumber || 20,
				soundEnabled:
					settings.soundEnabled !== undefined ? settings.soundEnabled : true,
			}
		}
	} catch (error) {
		console.error('Failed to load settings')
	}
	// 返回默认值
}
```

---

## 文件变更清单

### 修改的文件

1. **src/store/settingsSlice.ts**

   - 添加 `minNumber` 和 `soundEnabled` 到 state
   - 添加 `setMinNumber` 和 `setSoundEnabled` actions
   - 添加 `loadSettings()` 和 `saveSettings()` 函数
   - 初始化时从 localStorage 加载设置
   - 每次修改时自动保存到 localStorage

2. **src/components/SettingsModal.tsx**

   - 导入新的 actions: `setMinNumber`, `setSoundEnabled`
   - 添加下限输入框
   - 添加音效开关按钮
   - 保存时确保下限不大于上限

3. **src/styles/SettingsModal.scss**

   - 添加 `.sound-toggle` 样式
   - 添加 `.toggle-btn` 样式（包括 active 状态）
   - 更新 `.input-group` 宽度以容纳两个输入框
   - 添加 `.range-inputs` 的 flex-wrap 支持

4. **src/components/CelebrationAnimation.tsx**

   - 导入 Redux hooks
   - 从 state 读取 `soundEnabled`
   - 根据设置条件性播放音效

5. **src/components/Question.tsx**

   - 从 state 读取 `minNumber`
   - 传递 `minNumber` 给 `generateNewQuestion()`
   - 更新依赖数组包含 `minNumber`

6. **src/utils/questionGenerator.ts**

   - 更新函数签名添加 `min` 参数
   - 重写加法生成逻辑支持下限
   - 重写减法生成逻辑支持下限
   - 重写乘法生成逻辑支持下限
   - 重写除法生成逻辑支持下限

7. **src/utils/i18n.ts**
   - 添加 `minNumber` 翻译
   - 添加 `soundSettings` 翻译
   - 添加 `soundEnabled` 翻译
   - 添加 `soundDisabled` 翻译
   - 添加 `soundHint` 翻译

---

## 使用指南

### 设置音效开关

1. 点击导航栏右侧的 ⚙️ 齿轮图标
2. 在"音效设置"区域找到音效开关
3. 点击按钮切换状态：
   - 🔊 启用音效（紫色高亮）
   - 🔇 禁用音效（灰色）
4. 点击"保存"按钮
5. 设置立即生效，下次打开会自动记住

### 设置数字范围

1. 点击导航栏右侧的 ⚙️ 齿轮图标
2. 在"数字范围设置"区域：
   - 左侧输入框：设置下限（1-100）
   - 右侧输入框：设置上限（1-100）
3. 保存时系统自动确保下限 ≤ 上限
4. 点击"保存"按钮
5. 新题目将在设定范围内生成

### 示例场景

**初学者**

- 下限：1
- 上限：10
- 音效：启用
  → 生成 1-10 范围内的简单题目，带有庆祝音效

**进阶练习**

- 下限：10
- 上限：50
- 音效：启用
  → 生成 10-50 范围内的中等难度题目

**专注模式**

- 下限：1
- 上限：100
- 音效：禁用
  → 生成完整范围题目，静音模式不打扰

---

## 技术亮点

### 1. 智能范围控制

```typescript
// 确保下限不大于上限
const finalMin = Math.max(1, Math.min(localMin, localMax))
const finalMax = Math.max(finalMin, localMax)
```

### 2. 优雅的状态同步

- Redux 管理全局状态
- localStorage 持久化存储
- 组件自动响应变化

### 3. 用户友好的交互

- 实时视觉反馈（按钮高亮、动画）
- 自动保存设置
- 防呆设计（下限自动修正）

### 4. 向后兼容

```typescript
// 如果 localStorage 中没有新字段，使用默认值
soundEnabled: settings.soundEnabled !== undefined ? settings.soundEnabled : true
```

---

## 性能优化

1. **按需播放音效**

   - 只在启用时播放
   - 避免不必要的音频处理

2. **localStorage 优化**

   - 只在设置改变时写入
   - 启动时一次性加载
   - 错误处理防止崩溃

3. **题目生成优化**
   - 根据范围智能调整算法
   - 避免无效循环

---

## 后续可能的改进

1. **音效增强**

   - 添加音量控制滑块
   - 支持不同音效主题
   - 错误提示音

2. **范围预设**

   - 快速选择常用范围（1-10, 1-20, 1-50, 1-100）
   - 保存自定义预设

3. **高级设置**
   - 单独控制每种运算的范围
   - 运算难度分级
   - 题目生成策略选择

---

## 总结

本次更新为用户提供了更灵活的设置选项：

✅ **音效控制**：可以根据环境选择开启或关闭音效  
✅ **范围控制**：精确控制题目难度，适应不同学习阶段  
✅ **持久化存储**：设置永久保存，无需重复配置  
✅ **智能保护**：自动修正不合理的设置值

这些功能让数学练习应用更加灵活和人性化！🎉
