# 记忆翻牌网页小游戏 — 第二次迭代 Spec

## Why
第一次迭代已完成记忆翻牌游戏的核心玩法（翻牌、配对、胜负判定）并部署至 GitHub Pages。本次第二次迭代旨在完善游戏系统（计分、存档、难度、流程控制）、升级视觉与动效（AI 素材、动画、音效、主题）、完成至少 1 项进阶功能，并满足验收标准，使游戏从「可玩原型」进化为「完整可用的网页小游戏」。

## What Changes
- **游戏系统完善**：实时分数板、最高分/最佳用时本地持久化（localStorage）、难度选择（网格大小/卡牌对数/限时配置）、流程控制（开始/暂停/重新开始）。
- **视觉与动效升级**：AI 生成至少 2 套卡牌图案/背景图、卡牌翻转动画、配对成功/失败反馈动画、得分飘字、胜利/失败过渡动画；可选音效/背景音乐、2 套以上主题皮肤切换。
- **进阶功能（三选一）**：本地排行榜 / 操作回放 / 触屏适配。本次选择 **触屏适配** 作为进阶功能，以覆盖移动端用户场景。
- **测试与验收**：功能测试、兼容性测试（PC/手机端）、验收标准检查。

## Impact
- **Affected specs**：游戏核心玩法逻辑、UI 布局、状态管理、本地存储、响应式适配、动画与音效系统。
- **Affected code**：`index.html`、`style.css`、`game.js`（或等效文件结构），以及新增的 AI 素材资源（图片/音频）。

## ADDED Requirements

### Requirement: 计分与存档系统
The system SHALL provide a real-time scoreboard displaying current matches, elapsed time, and error count.
The system SHALL persist highest score and best time to `localStorage` so that data survives page refreshes.

#### Scenario: 正常游戏流程
- **WHEN** 用户完成一次配对
- **THEN** 配对数 +1，错误次数保持不变，分数板实时更新

#### Scenario: 刷新页面后
- **WHEN** 用户刷新浏览器
- **THEN** 历史最高分和最佳用时从 `localStorage` 恢复并显示

### Requirement: 难度选择系统
The system SHALL allow users to select grid size (e.g., 4x3, 4x4, 6x4), number of card pairs, and time limit (timed / untimed) before starting a game.

#### Scenario: 选择难度并开始
- **WHEN** 用户在开始界面选择 6x4 网格并点击开始
- **THEN** 游戏面板生成 6x4 的卡牌布局，计时器根据配置启动或隐藏

### Requirement: 流程控制系统
The system SHALL provide Start / Pause / Restart buttons to control game flow.
The system SHALL lock all cards when paused and reset all states when restarted.

#### Scenario: 暂停游戏
- **WHEN** 用户点击暂停按钮
- **THEN** 计时器停止，所有卡牌锁定不可点击，显示暂停遮罩

#### Scenario: 重新开始
- **WHEN** 用户点击重新开始按钮
- **THEN** 当前分数、用时、错误次数清零，卡牌重新洗牌并背面朝上

### Requirement: AI 素材与视觉升级
The system SHALL use AI-generated images for at least 2 sets of card themes (e.g., animals, cartoon, minimal) and background images, replacing default solid-color cards.

#### Scenario: 切换主题
- **WHEN** 用户选择「动物主题」
- **THEN** 卡牌背面和正面图案替换为对应的 AI 生成图片

### Requirement: 动画与动效系统
The system SHALL implement at least 2 types of animations: card flip animation, match success/failure feedback animation.
The system SHOULD implement score floating text and victory/defeat transition animations.

#### Scenario: 配对成功
- **WHEN** 用户翻开两张匹配的卡牌
- **THEN** 卡牌播放配对成功动画（如缩放+发光），得分飘字显示「+10」

### Requirement: 主题皮肤切换
The system SHALL support at least 2 theme skins (e.g., light / dark, or different color schemes) with clear theme-switching logic.

#### Scenario: 切换深色模式
- **WHEN** 用户点击主题切换按钮
- **THEN** 整个页面配色切换为深色主题，卡牌边框、背景、文字颜色相应变化

### Requirement: 触屏适配（进阶功能）
The system SHALL adapt to mobile touch operations, optimize mobile layout, and implement touch-based card flipping and responsive design.

#### Scenario: 手机端访问
- **WHEN** 用户使用手机浏览器访问游戏
- **THEN** 卡牌网格自动调整为适合屏幕的尺寸，点击卡牌可正常翻牌，布局无错乱

### Requirement: 音效系统（可选扩展）
The system MAY provide sound effects for flip, match success, match failure, and victory using Web Audio API or HTML5 Audio.

## MODIFIED Requirements
### Requirement: 游戏核心玩法
[Complete modified requirement]
The core flip-and-match gameplay from the first iteration SHALL remain intact. All new systems (scoring, difficulty, flow control) SHALL integrate without breaking existing flip/match/win logic.

## REMOVED Requirements
### Requirement: 无
**Reason**：本次迭代为纯增量开发，不删除已有功能。
**Migration**：无

## 技术选型
- **HTML5**：语义化结构，`<audio>` 标签用于音效。
- **CSS3**：Flexbox/Grid 布局，CSS 动画（`transition`/`@keyframes`）实现翻牌与反馈动效，CSS 变量实现主题切换，`@media` 查询实现响应式适配。
- **Vanilla JavaScript（ES6+）**：模块化游戏逻辑（State Machine 管理游戏状态），`localStorage` 持久化，`touchstart`/`touchend` 事件实现触屏操作。
- **AI 图片生成**：使用 `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image` 生成卡牌图案与背景图。
- **部署**：GitHub Pages（延续第一次迭代）。

## 智能体分工
| 模块 | 负责智能体 | 协作智能体 | 说明 |
|------|-----------|-----------|------|
| 需求梳理与验收标准 | `product-manager` | — | 输出 PRD 与验收清单，梳理计分/存档/难度/流程控制规则 |
| 视觉风格与动效方案 | `game-designer` | `frontend-developer` | 设计卡牌主题（动物/卡通/极简）、配色方案、动画规格、AI 素材需求 |
| 核心代码与功能实现 | `frontend-developer` | `product-manager`, `game-designer`, `test-engineer` | 实现计分/存档/难度/流程控制/动效/主题切换/触屏适配，模块化代码 |
| 全流程测试与验收 | `test-engineer` | `frontend-developer` | 功能测试、兼容性测试（PC/手机）、输出测试报告 |

## 协作规则
1. `product-manager` 先完成需求梳理与验收标准制定，作为后续开发的基准。
2. `game-designer` 基于需求输出视觉与动效方案，供 `frontend-developer` 实现。
3. `frontend-developer` 按模块逐步实现，每完成一个模块通知 `test-engineer` 进行验证。
4. `test-engineer` 全程参与，至少完成 2 轮测试（中期模块测试 + 最终验收测试）。
5. 开发过程中需明确标注每个任务对应的负责智能体，确保至少 2 个角色深度参与协作。
