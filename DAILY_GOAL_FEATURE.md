# 每日目标功能更新文档

## 更新日期
2025 年 10 月 5 日

## 功能概述

新增每日练习目标设置功能，用户可以设置每天想要完成的题目数量。当达到目标时，会播放一个华丽的 20 秒庆祝动画。

---

## 核心功能

### 1. 每日目标设置 🎯

#### 功能特性
- **目标显示**：在"今日练习"组件中显示当前进度（如 15/20）
- **点击设置**：点击统计组件打开目标设置 Modal
- **灵活配置**：目标范围 1-200 题，默认 20 题
- **持久化存储**：目标保存在 localStorage 中

#### 使用方式
1. 点击右上角的"今日练习"统计组件
2. 在弹出的 Modal 中输入目标数量
3. 点击"保存"按钮
4. 继续做题，实时查看进度

---

### 2. 目标达成庆祝动画 🎉

#### 动画特效
- **时长**：20 秒超长庆祝动画
- **全屏效果**：覆盖整个屏幕的华丽特效
- **多元素组合**：
  - 🏆 巨大的奖杯图标（旋转+缩放）
  - 🐰 30 个随机飘动的可爱小动物
  - 💥 50 个烟花爆炸效果（持续循环）
  - 🎊 100 条彩带飘落（多彩色）
  - ⭐ 闪烁的星星和文字效果

#### 小动物清单
包含 20 种可爱的 emoji 动物：
🐰 🦊 🐱 🐶 🐼 🐨 🐹 🦄 🐻 🦁 🐯 🐸 🐷 🐮 🐔 🦆 🦉 🐝 🦋 🐞

#### 触发条件
- 当天答题数量 ≥ 设定目标
- 当天首次达到目标（避免重复触发）
- 必须答对题目时才触发

#### 用户体验
- **不阻塞操作**：动画播放期间依然可以继续做题
- **自动关闭**：20 秒后自动消失
- **音效配合**：支持庆祝音效（可在设置中关闭）
- **响应式设计**：移动端自适应显示

---

## 技术实现

### Redux State 更新

```typescript
// settingsSlice.ts
export interface SettingsState {
  dailyGoal: number // 新增：每日目标
}

// 新增 action
setDailyGoal: (state, action: PayloadAction<number>) => {
  state.dailyGoal = action.payload
  saveSettings(state)
}
```

### LocalStorage 存储结构

#### 设置存储
```json
{
  "language": "zh",
  "minNumber": 1,
  "maxNumber": 20,
  "soundEnabled": true,
  "dailyGoal": 20
}
```

#### 每日统计存储
```json
{
  "date": "2025-10-05",
  "questionsAnswered": 15,
  "goalAchieved": false
}
```

### 关键函数

#### dailyStats.ts
```typescript
// 标记今天目标已达成
export const markGoalAchieved = (): void

// 检查今天是否已达成目标
export const hasGoalBeenAchieved = (): boolean
```

#### Question.tsx
```typescript
const handleSubmit = (e: React.FormEvent) => {
  const newCount = incrementQuestionsAnswered()
  
  // 检查是否达到目标
  if (newCount >= dailyGoal && !hasGoalBeenAchieved() && isAnswerCorrect) {
    markGoalAchieved()
    // 延迟2秒触发，让普通庆祝动画先播放
    setTimeout(() => {
      onGoalAchieved()
    }, 2000)
  }
}
```

---

## 文件变更清单

### 新增文件

1. **src/components/DailyGoalModal.tsx**
   - 每日目标设置弹窗组件
   - 输入验证（1-200）
   - 中英文界面

2. **src/styles/DailyGoalModal.scss**
   - Modal 弹窗样式
   - 目标图标动画（弹跳效果）
   - 响应式布局

3. **src/components/GoalAchievedAnimation.tsx**
   - 20 秒超长庆祝动画
   - 30 个小动物飘动
   - 50 个烟花特效
   - 100 条彩带飘落

4. **src/styles/GoalAchievedAnimation.scss**
   - 全屏覆盖层样式
   - 烟花粒子动画
   - 彩带飘落效果
   - 奖杯旋转动画

### 修改文件

1. **src/store/settingsSlice.ts**
   - 添加 `dailyGoal` 字段
   - 添加 `setDailyGoal` action
   - LocalStorage 持久化

2. **src/components/DailyStats.tsx**
   - 显示目标进度（当前/目标）
   - 添加点击事件打开 Modal
   - 悬停和点击动画效果

3. **src/styles/DailyStats.scss**
   - 添加 `.stats-goal` 样式
   - 目标数字显示样式

4. **src/components/Question.tsx**
   - 添加 `onGoalAchieved` prop
   - 目标达成检测逻辑
   - 延迟触发庆祝动画

5. **src/App.tsx**
   - 导入 `GoalAchievedAnimation`
   - 管理动画显示状态
   - 传递回调给 Question 组件

6. **src/utils/dailyStats.ts**
   - 添加 `goalAchieved` 字段
   - 新增 `markGoalAchieved()` 函数
   - 新增 `hasGoalBeenAchieved()` 函数

7. **src/utils/i18n.ts**
   - 添加 `dailyGoal` 翻译
   - 添加 `dailyGoalHint` 翻译
   - 添加 `goalAchieved` 翻译
   - 添加 `goalAchievedMessage` 翻译

---

## 动画技术细节

### 小动物飘动算法

```typescript
// 生成 30 个随机动物
const randomAnimals = Array.from({ length: 30 }, () => {
  const animal = animals[Math.floor(Math.random() * animals.length)]
  const startX = Math.random() * 100  // 随机起始 X 位置
  const endX = Math.random() * 100    // 随机结束 X 位置
  const startY = Math.random() * 100  // 随机起始 Y 位置
  const duration = 8 + Math.random() * 12  // 8-20秒持续时间
  const delay = Math.random() * 5     // 0-5秒延迟

  return { animal, startX, endX, startY, duration, delay }
})
```

### 烟花爆炸效果

```typescript
// 每个烟花包含 12 个放射状粒子
{Array.from({ length: 12 }).map((_, i) => (
  <motion.div
    className='firework-particle'
    animate={{
      x: Math.cos((i * 30 * Math.PI) / 180) * 100,  // 30度间隔
      y: Math.sin((i * 30 * Math.PI) / 180) * 100,
      opacity: 0,
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 3,
    }}
  />
))}
```

### 彩带飘落

```typescript
// 100 条彩带从上往下飘落
Array.from({ length: 100 }).map((_, i) => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const x = Math.random() * 100
  const duration = 8 + Math.random() * 12

  return (
    <motion.div
      style={{ backgroundColor: color }}
      animate={{
        y: ['−10vh', '110vh'],  // 从上到下
        rotate: [0, 360, 720, 1080],  // 旋转3圈
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
      }}
    />
  )
})
```

---

## CSS 特效

### 奖杯旋转动画

```scss
@keyframes trophy-rotate {
  0%, 100% {
    transform: rotate(-5deg) scale(1);
  }
  25% {
    transform: rotate(5deg) scale(1.05);
  }
  50% {
    transform: rotate(-5deg) scale(1);
  }
  75% {
    transform: rotate(5deg) scale(1.05);
  }
}
```

### 烟花粒子光晕

```scss
.firework-particle {
  background: radial-gradient(
    circle,
    #fff 0%,
    #ffd700 30%,
    #ff6b6b 60%,
    transparent 100%
  );
  box-shadow: 
    0 0 10px #fff,
    0 0 20px #ffd700,
    0 0 30px #ff6b6b;
}
```

### 背景模糊效果

```scss
.goal-achieved-backdrop {
  background: radial-gradient(
    circle at center,
    rgba(99, 102, 241, 0.3) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  backdrop-filter: blur(8px);
}
```

---

## 性能优化

1. **避免重复触发**
   - 使用 `goalAchieved` 标志位
   - 每天只触发一次庆祝动画

2. **分批渲染**
   - 小动物、烟花、彩带分别渲染
   - 使用随机延迟避免同时计算

3. **GPU 加速**
   - 使用 `transform` 而非 `position`
   - 使用 `will-change` 优化性能

4. **内存管理**
   - 20 秒后自动清理
   - 使用 `useRef` 避免闭包问题

---

## 用户体验亮点

### 渐进式反馈
1. 每做一题 → 统计数字动画更新
2. 答对题目 → 普通庆祝动画（2秒）
3. 达到目标 → 延迟2秒后播放超级庆祝动画（20秒）

### 视觉层次
- **Z-index 层级**：
  - 6: 彩带
  - 5: 小动物
  - 8: 烟花
  - 10: 中心文字和奖杯
  - 99999: 整体覆盖层

### 色彩搭配
- **金色系**：奖杯、标题、星星
- **彩虹色**：彩带（6种颜色）
- **渐变背景**：紫色到黑色径向渐变

---

## 国际化支持

### 中文
- 每日目标
- 设置你每天想要完成的练习题数量
- 目标达成！
- 今日练习目标已完成

### English
- Daily Goal
- Set your daily practice goal
- Goal Achieved!
- Today's practice goal completed

---

## 后续可能的改进

1. **目标预设**
   - 快速选择常用目标（10, 20, 30, 50）
   - 按难度推荐目标

2. **统计增强**
   - 显示本周完成天数
   - 连续达成目标天数
   - 历史最高记录

3. **动画定制**
   - 允许选择不同的庆祝主题
   - 自定义小动物种类
   - 调整动画时长

4. **成就系统**
   - 首次达成目标徽章
   - 连续7天达成成就
   - 月度目标王

5. **社交功能**
   - 分享今日成绩
   - 与好友比拼进度
   - 排行榜系统

---

## 总结

本次更新为用户提供了更有目标感的练习体验：

✅ **目标设置**：灵活配置每日练习目标  
✅ **进度可视化**：实时查看完成情况（15/20）  
✅ **成就激励**：华丽的 20 秒庆祝动画  
✅ **持久化存储**：目标和进度自动保存  
✅ **防重复触发**：每天只庆祝一次  
✅ **不阻塞操作**：动画期间可继续做题

通过这些功能，让孩子们更有动力完成每日练习，并在达成目标时获得满满的成就感！🎉
