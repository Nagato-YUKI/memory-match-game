# 记忆翻牌网页小游戏 — 视觉风格与动效方案设计文档

> 版本：v1.0
> 负责智能体：`game-designer`
> 协作智能体：`frontend-developer`（技术可行性确认）
> 目标：为前端工程师提供可直接落地的视觉与动效实现依据

---

## 一、卡牌主题方案

### 1.1 主题A：「萌宠乐园」（Cute Pets）

**风格定位**：可爱动物风格，色彩明快、线条圆润，面向全年龄段玩家，主打治愈感与亲和力。

**卡牌正面图案（每套 12 张，覆盖 4x3 / 4x4 / 6x4 三种难度）**：

| 序号 | 动物 | 画面描述 |
|------|------|----------|
| 01 | 橘猫 | 一只圆滚滚的橘色短毛猫，正趴在一团毛线球上打盹，背景是柔和的浅黄色 |
| 02 | 柴犬 | 一只微笑的柴犬，耳朵竖立，舌头微吐，背景是温暖的橙色渐变 |
| 03 | 垂耳兔 | 一只白色垂耳兔，抱着一根胡萝卜，背景是清新的薄荷绿 |
| 04 | 熊猫 | 一只幼年熊猫，抱着竹子，黑白配色，背景是淡竹林绿 |
| 05 | 柯基 | 一只短腿柯基，屁股朝向镜头，尾巴翘起，背景是天空蓝 |
| 06 | 仓鼠 | 一只圆滚滚的仓鼠，两腮塞满瓜子，背景是暖米色 |
| 07 | 企鹅 | 一只帝企鹅幼崽，张开翅膀，背景是冰蓝色 |
| 08 | 狐狸 | 一只赤狐蜷缩成一团，尾巴盖住鼻子，背景是秋日橙红 |
| 09 | 猫头鹰 | 一只戴着圆眼镜的猫头鹰，背景是深夜蓝紫渐变 |
| 10 | 海豚 | 一只跃出水面的海豚，背景是海洋蓝绿渐变 |
| 11 | 树懒 | 一只挂在树枝上的树懒，表情慵懒，背景是雨林绿 |
| 12 | 独角兽猫 | 一只头顶小角的梦幻猫咪，背景是粉紫渐变星空 |

**卡牌背面设计**：
- 统一图案：浅米色底 + 中央一个简化的猫爪印轮廓（线条为淡粉色 `#F4A4B4`）
- 四角各有一个小圆点装饰，整体呈现手账贴纸质感
- 边缘保留 8px 圆角

**AI 图片生成 Prompt（SDXL 格式）**：

```
# 正面通用前缀
A cute kawaii [ANIMAL] illustration, flat design, soft pastel colors, clean vector style, 
centered composition, single subject filling 80% of frame, no text, no watermark, 
white background with subtle gradient, sticker-like aesthetic, high detail, 4K, 
children's book illustration style

# 示例：橘猫
A cute kawaii orange tabby cat illustration, the cat is sleeping on a ball of yarn, 
soft pastel colors, flat design, clean vector style, centered composition, 
single subject filling 80% of frame, no text, no watermark, 
light yellow background with subtle gradient, sticker-like aesthetic, high detail, 4K, 
children's book illustration style

# 背面
A cute paw print pattern, light beige background, soft pink outline paw print in center, 
minimalist design, four small dots at corners as decoration, flat vector style, 
clean and simple, no text, no watermark, sticker-like aesthetic, high detail, 4K
```

---

### 1.2 主题B：「几何幻想」（Geometric Fantasy）

**风格定位**：极简几何图形风格，采用低多边形与渐变填充，面向偏好现代、简洁视觉的玩家，具有科技感和艺术感。

**卡牌正面图案（每套 12 张）**：

| 序号 | 图形 | 画面描述 |
|------|------|----------|
| 01 | 圆形 | 多层同心圆，从中心向外颜色由暖橙渐变到冷蓝，带有细微噪点纹理 |
| 02 | 三角形 | 等边三角形，内部填充紫蓝渐变，边缘有发光效果，背景深灰 |
| 03 | 星形 | 八角星，金色渐变填充，每个角有细微阴影，背景墨蓝 |
| 04 | 六边形 | 蜂巢状六边形组合，黄绿渐变，呈现立体浮雕感 |
| 05 | 菱形 | 菱形网格图案，粉紫渐变，带有微妙的折射光效 |
| 06 | 螺旋 | 斐波那契螺旋线，青绿到深蓝的渐变，线条粗细渐变 |
| 07 | 立方体 | 等距视角的透明立方体，内部有发光球体，背景纯黑 |
| 08 | 波浪 | 三条平行波浪线，橙红渐变，带有动态模糊感 |
| 09 | 十字 | 对称十字形，银白金属质感，背景深紫 |
| 10 | 心形 | 几何化的心形，由多个三角形拼接而成，玫红渐变 |
| 11 | 闪电 | 折线闪电，电光蓝到白的渐变，带有粒子散射效果 |
| 12 | 无限符号 | 莫比乌斯环造型，彩虹渐变，背景深空黑 |

**卡牌背面设计**：
- 统一图案：深炭灰底 `#2D2D3A` + 中央一个细线勾勒的六边形轮廓（线条为荧光青 `#00D4AA`）
- 六边形内部有极细的点阵网格，呈现科技感
- 边缘保留 8px 圆角

**AI 图片生成 Prompt（SDXL 格式）**：

```
# 正面通用前缀
A minimalist geometric [SHAPE] design, low poly style, smooth gradient fill, 
clean lines, centered composition, single shape filling 70% of frame, 
no text, no watermark, subtle noise texture, modern abstract art, 
high contrast, 4K, digital art style

# 示例：圆形
A minimalist geometric circle design, multiple concentric circles, 
smooth gradient from warm orange center to cool blue outer ring, 
clean lines, centered composition, single shape filling 70% of frame, 
no text, no watermark, subtle noise texture, modern abstract art, 
high contrast, 4K, digital art style

# 背面
A minimalist hexagon outline on dark charcoal background, thin neon cyan line, 
internal dot grid pattern, geometric tech style, clean and simple, 
no text, no watermark, modern abstract design, high contrast, 4K
```

---

## 二、配色方案

### 2.1 CSS 变量体系

使用 CSS 自定义属性（CSS Variables）实现主题切换，所有颜色值通过变量引用，禁止硬编码。

```css
/* 浅色主题（默认） */
:root {
  /* 主色：用于标题、重要按钮、高亮元素 */
  --color-primary: #5B8DEF;
  --color-primary-hover: #4A7DE0;
  --color-primary-light: #E8F0FE;

  /* 辅色：用于次级按钮、标签、装饰 */
  --color-secondary: #FF8C69;
  --color-secondary-hover: #F07A55;
  --color-secondary-light: #FFF0EB;

  /* 背景色 */
  --color-bg: #F7F9FC;
  --color-bg-elevated: #FFFFFF;
  --color-bg-overlay: rgba(0, 0, 0, 0.45);

  /* 文字色 */
  --color-text-primary: #1A1A2E;
  --color-text-secondary: #6B7280;
  --color-text-muted: #9CA3AF;
  --color-text-inverse: #FFFFFF;

  /* 强调色：用于得分、成功状态 */
  --color-accent-success: #34D399;
  --color-accent-success-glow: rgba(52, 211, 153, 0.4);
  --color-accent-error: #F87171;
  --color-accent-error-glow: rgba(248, 113, 113, 0.4);
  --color-accent-gold: #FBBF24;

  /* 卡牌 */
  --card-border: #E5E7EB;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --card-shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
  --card-radius: 12px;

  /* 主题专属 */
  --theme-name: 'light';
}

/* 深色主题 */
[data-theme="dark"] {
  --color-primary: #7BA3F5;
  --color-primary-hover: #8FB4FF;
  --color-primary-light: #1E293B;

  --color-secondary: #FF9F7F;
  --color-secondary-hover: #FFB399;
  --color-secondary-light: #2D1F1A;

  --color-bg: #0F172A;
  --color-bg-elevated: #1E293B;
  --color-bg-overlay: rgba(0, 0, 0, 0.7);

  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-muted: #64748B;
  --color-text-inverse: #0F172A;

  --color-accent-success: #4ADE80;
  --color-accent-success-glow: rgba(74, 222, 128, 0.3);
  --color-accent-error: #FB7185;
  --color-accent-error-glow: rgba(251, 113, 133, 0.3);
  --color-accent-gold: #FCD34D;

  --card-border: #334155;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  --card-shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.4);

  --theme-name: 'dark';
}
```

### 2.2 色值对照表

| 用途 | 浅色主题 | 深色主题 | 说明 |
|------|----------|----------|------|
| 主色 | `#5B8DEF` | `#7BA3F5` | 按钮、链接、主题标识 |
| 主色悬停 | `#4A7DE0` | `#8FB4FF` | 按钮 hover 状态 |
| 辅色 | `#FF8C69` | `#FF9F7F` | 次级操作、装饰元素 |
| 页面背景 | `#F7F9FC` | `#0F172A` | 整体页面底色 |
| 卡片/浮层背景 | `#FFFFFF` | `#1E293B` | 卡牌容器、弹窗背景 |
| 主文字 | `#1A1A2E` | `#F1F5F9` | 标题、重要文字 |
| 次级文字 | `#6B7280` | `#94A3B8` | 描述、标签 |
| 弱化文字 | `#9CA3AF` | `#64748B` | 占位符、禁用状态 |
| 成功/配对 | `#34D399` | `#4ADE80` | 配对成功反馈 |
| 失败/错误 | `#F87171` | `#FB7185` | 配对失败反馈 |
| 金色/得分 | `#FBBF24` | `#FCD34D` | 得分飘字、最高分标识 |
| 遮罩层 | `rgba(0,0,0,0.45)` | `rgba(0,0,0,0.7)` | 弹窗背景遮罩 |
| 卡牌边框 | `#E5E7EB` | `#334155` | 卡牌边缘描边 |

---

## 三、动画规格

### 3.1 翻牌动画（Card Flip）

**触发条件**：玩家点击一张背面朝上的卡牌
**技术实现**：CSS 3D Transform + `transition`

```css
.card {
  perspective: 800px;
  transform-style: preserve-3d;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: var(--card-radius);
}

.card-face--front {
  transform: rotateY(180deg);
}
```

| 参数 | 值 | 说明 |
|------|-----|------|
| 时长 | `500ms` | 翻牌过程适中，既不过快也不过慢 |
| 缓动函数 | `cubic-bezier(0.4, 0, 0.2, 1)` | Material Design 标准缓动，自然流畅 |
| 3D 透视 | `perspective: 800px` | 父容器设置，产生真实立体感 |
| 旋转轴 | `rotateY(180deg)` | 沿 Y 轴水平翻转 |
| 背面隐藏 | `backface-visibility: hidden` | 避免翻转过程中背面内容穿透显示 |
| 点击冷却 | `600ms` | 翻牌动画完成后才允许下一次点击，防止快速连点 |

---

### 3.2 配对成功动画（Match Success）

**触发条件**：两张翻开的卡牌图案匹配
**动画序列**：发光脉冲 -> 缩放弹跳 -> 锁定状态

```css
@keyframes matchSuccess {
  0% {
    transform: rotateY(180deg) scale(1);
    box-shadow: 0 0 0 0 var(--color-accent-success-glow);
  }
  30% {
    transform: rotateY(180deg) scale(1.12);
    box-shadow: 0 0 20px 8px var(--color-accent-success-glow);
  }
  60% {
    transform: rotateY(180deg) scale(1.05);
    box-shadow: 0 0 12px 4px var(--color-accent-success-glow);
  }
  100% {
    transform: rotateY(180deg) scale(1.08);
    box-shadow: 0 0 16px 6px var(--color-accent-success-glow);
  }
}

.card.matched .card-inner {
  animation: matchSuccess 0.6s ease-out forwards;
  pointer-events: none; /* 锁定，不可再点击 */
}
```

| 参数 | 值 | 说明 |
|------|-----|------|
| 总时长 | `600ms` | 三段式动画：放大 -> 回弹 -> 稳定 |
| 最大缩放 | `1.12` (112%) | 第一帧放大到 112%，产生弹跳感 |
| 稳定缩放 | `1.08` (108%) | 最终稳定在 108%，区别于未匹配卡牌 |
| 发光颜色 | `--color-accent-success-glow` | 浅色 `rgba(52,211,153,0.4)` / 深色 `rgba(74,222,128,0.3)` |
| 发光扩散 | `0px -> 20px -> 16px` | 脉冲式发光效果 |
| 锁定状态 | `pointer-events: none` | 动画结束后卡牌不可再交互 |

---

### 3.3 配对失败动画（Match Fail）

**触发条件**：两张翻开的卡牌图案不匹配
**动画序列**：水平抖动 -> 保持正面短暂显示 -> 自动翻回背面

```css
@keyframes shake {
  0%, 100% { transform: rotateY(180deg) translateX(0); }
  15% { transform: rotateY(180deg) translateX(-6px); }
  30% { transform: rotateY(180deg) translateX(6px); }
  45% { transform: rotateY(180deg) translateX(-4px); }
  60% { transform: rotateY(180deg) translateX(4px); }
  75% { transform: rotateY(180deg) translateX(-2px); }
  90% { transform: rotateY(180deg) translateX(2px); }
}

.card.mismatch .card-inner {
  animation: shake 0.5s ease-in-out;
}
```

| 参数 | 值 | 说明 |
|------|-----|------|
| 抖动时长 | `500ms` | 快速抖动，传达"错误"反馈 |
| 抖动次数 | 3 个完整来回（6 次方向变化） | 足够引起注意但不冗长 |
| 最大幅度 | `6px` | 首波幅度最大，后续递减 |
| 保持显示 | `800ms` | 抖动结束后保持正面显示 800ms，让玩家看清图案 |
| 翻回时长 | `400ms` | 翻回背面，比翻牌稍快 |
| 翻回缓动 | `cubic-bezier(0.4, 0, 1, 1)` | 加速翻回，干脆利落 |
| 总锁定时间 | `500ms + 800ms + 400ms = 1.7s` | 期间禁止点击其他卡牌 |

---

### 3.4 得分飘字动画（Score Float）

**触发条件**：配对成功时，在卡牌位置上方显示 "+10" 并上浮消失

```css
@keyframes scoreFloat {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  30% {
    transform: translateY(-20px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px) scale(0.9);
  }
}

.score-float {
  position: absolute;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-accent-gold);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  animation: scoreFloat 1s ease-out forwards;
  z-index: 100;
}
```

| 参数 | 值 | 说明 |
|------|-----|------|
| 初始位置 | 卡牌中心偏上 | 通过 JS 动态计算定位 |
| 字体大小 | `24px`（PC）/ `18px`（移动端） | 醒目但不遮挡 |
| 字体粗细 | `700` | 加粗增强视觉冲击力 |
| 颜色 | `--color-accent-gold` | 金色，与得分正相关 |
| 文字阴影 | `0 2px 4px rgba(0,0,0,0.2)` | 增强可读性 |
| 上浮距离 | `-60px` | 从初始位置上浮 60 像素 |
| 放大峰值 | `1.2` (120%) | 前 30% 时间放大到 120% |
| 淡出时长 | `1s` | 总动画时长 1 秒，全程 ease-out |
| 层级 | `z-index: 100` | 确保飘字在卡牌之上 |

---

### 3.5 胜利/失败过渡动画（Victory / Game Over Transition）

**触发条件**：所有卡牌配对完成（胜利）或限时耗尽（失败）
**动画序列**：背景遮罩淡入 -> 结果文字弹入 -> 统计信息依次滑入 -> 操作按钮延迟出现

```css
/* 遮罩层 */
@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.result-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg-overlay);
  backdrop-filter: blur(4px);
  animation: overlayFadeIn 0.4s ease-out forwards;
  z-index: 200;
}

/* 结果标题 */
@keyframes titleBounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(40px);
  }
  50% {
    transform: scale(1.05) translateY(-5px);
  }
  70% {
    transform: scale(0.95) translateY(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.result-title {
  font-size: 48px;
  font-weight: 800;
  animation: titleBounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* 统计项依次滑入 */
@keyframes statSlideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.result-stat {
  opacity: 0;
  animation: statSlideIn 0.4s ease-out forwards;
}

.result-stat:nth-child(1) { animation-delay: 0.5s; }
.result-stat:nth-child(2) { animation-delay: 0.65s; }
.result-stat:nth-child(3) { animation-delay: 0.8s; }

/* 按钮延迟出现 */
@keyframes buttonFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-buttons {
  opacity: 0;
  animation: buttonFadeUp 0.5s ease-out 1.1s forwards;
}
```

| 参数 | 值 | 说明 |
|------|-----|------|
| 遮罩颜色 | `--color-bg-overlay` | 浅色 `rgba(0,0,0,0.45)` / 深色 `rgba(0,0,0,0.7)` |
| 遮罩模糊 | `backdrop-filter: blur(4px)` | 背景内容轻微模糊，聚焦弹窗 |
| 遮罩淡入 | `400ms` | 快速覆盖全屏 |
| 标题字体 | `48px`（PC）/ `32px`（移动端） | 胜利用金色，失败用红色 |
| 标题动画 | `700ms` + 弹性缓动 | `cubic-bezier(0.34, 1.56, 0.64, 1)` 产生弹跳感 |
| 统计项延迟 | 从 `500ms` 开始，每项间隔 `150ms` | 依次滑入，引导视线 |
| 按钮延迟 | `1.1s` | 确保用户看完统计后再出现操作选项 |
| 按钮间距 | `16px` | 两个按钮（再玩一次 / 返回菜单）水平排列 |

---

### 3.6 动画性能要求

- 所有动画仅使用 `transform` 和 `opacity` 属性，触发 GPU 加速
- 禁止动画 `width`、`height`、`margin`、`top`、`left` 等会触发重排的属性
- 卡牌容器设置 `will-change: transform`（仅在动画期间动态添加，结束后移除）
- 目标帧率：60fps，在低端手机和 PC 上均保持流畅

---

## 四、音效需求

### 4.1 音效类型与描述

| 触发时机 | 音效类型 | 具体描述 | 参考风格 |
|----------|----------|----------|----------|
| 翻牌 | 短促清脆的"唰"声 | 纸张/卡片快速翻动的声音，时长约 150ms，音调中高频，干净利落 | 类似扑克牌翻面的轻响 |
| 配对成功 | 清脆的"叮"声 | 两个音阶的上升琶音（如 C-E-G），时长约 300ms，音色明亮、带有轻微混响，传达愉悦感 | 类似手机通知的成功提示音 |
| 配对失败 | 低沉的"嗡"声 | 单音下降音阶（如 G-E），时长约 250ms，音色偏闷，音量比成功音效低 20% | 类似错误提示的轻微低音 |
| 游戏胜利 | 欢快的短旋律 | 4-5 个音符的上升旋律 + 结尾和弦，时长约 1.5s，音色明亮、带有轻微回声，营造成就感 | 类似游戏通关的庆祝音效 |
| 游戏失败 | 低沉的和弦 | 2-3 个音符的下降和弦，时长约 1s，音色沉稳，不刺耳 | 类似时间耗尽的提示音 |
| 按钮点击 | 极短的"嗒"声 | 单音，时长约 80ms，音调中频，作为 UI 反馈 | 类似机械键盘轻触声 |

### 4.2 技术实现建议

- 使用 HTML5 `<audio>` 标签预加载音效文件
- 音效文件格式：MP3（兼容性最佳）+ OGG（备用）
- 音量默认 60%，提供独立音效开关
- 所有音效文件总大小控制在 200KB 以内
- 使用 `AudioContext` 时需注意浏览器自动播放策略（首次交互后解锁）

### 4.3 可选背景音乐

- 风格：轻快、无歌词的纯音乐，节奏适中（BPM 80-100）
- 音量：默认 30%，独立于音效音量控制
- 循环播放，提供开关

---

## 五、布局建议

### 5.1 网格尺寸与卡牌配置

| 难度 | 网格 | 卡牌对数 | 总卡牌数 | 适用场景 |
|------|------|----------|----------|----------|
| 简单 | 4 x 3 | 6 对 | 12 张 | 新手入门、儿童玩家 |
| 中等 | 4 x 4 | 8 对 | 16 张 | 标准体验 |
| 困难 | 6 x 4 | 12 对 | 24 张 | 挑战模式 |

### 5.2 PC 端布局（视口宽度 >= 768px）

```css
/* 游戏面板容器 */
.game-board {
  display: grid;
  gap: 16px;
  margin: 0 auto;
  padding: 24px;
}

/* 4x3 网格 */
.game-board--4x3 {
  grid-template-columns: repeat(4, 1fr);
  max-width: 560px;
}

/* 4x4 网格 */
.game-board--4x4 {
  grid-template-columns: repeat(4, 1fr);
  max-width: 560px;
}

/* 6x4 网格 */
.game-board--6x4 {
  grid-template-columns: repeat(6, 1fr);
  max-width: 800px;
}

/* 卡牌尺寸 */
.card {
  aspect-ratio: 3 / 4; /* 竖版卡牌 */
  border-radius: 12px;
}
```

| 参数 | 值 | 说明 |
|------|-----|------|
| 卡牌宽高比 | `3:4`（竖版） | 类似扑克牌比例，视觉舒适 |
| 卡牌间距 | `16px` | 足够区分，不拥挤 |
| 面板内边距 | `24px` | 与页面边缘保持呼吸感 |
| 4x3/4x4 面板最大宽 | `560px` | 居中显示，两侧留白 |
| 6x4 面板最大宽 | `800px` | 6 列需要更宽空间 |
| 卡牌最小高度 | `120px` | 确保图案清晰可见 |

### 5.3 手机端布局（视口宽度 < 768px）

```css
@media (max-width: 767px) {
  .game-board {
    gap: 8px;
    padding: 12px;
  }

  .game-board--4x3,
  .game-board--4x4 {
    max-width: 100%;
  }

  .game-board--6x4 {
    grid-template-columns: repeat(4, 1fr); /* 6x4 在手机上改为 4x6 */
    max-width: 100%;
  }

  .card {
    border-radius: 8px;
  }
}
```

| 参数 | 值 | 说明 |
|------|-----|------|
| 卡牌间距 | `8px` | 紧凑布局，适应小屏 |
| 面板内边距 | `12px` | 减少边缘留白 |
| 6x4 网格适配 | 改为 `4x6` 排列 | 避免 6 列过窄，保持卡牌可点击 |
| 卡牌圆角 | `8px` | 略小于 PC 端 |
| 按钮最小尺寸 | `44 x 44px` | 符合 Apple HIG 触摸目标规范 |
| 禁止双击缩放 | `touch-action: manipulation` | 避免误触导致页面缩放 |
| 触屏响应 | `touchstart` + `preventDefault` | 消除 300ms 点击延迟 |

### 5.4 响应式断点

| 断点 | 范围 | 主要调整 |
|------|------|----------|
| 大屏桌面 | `>= 1200px` | 面板可适当放大，增加装饰元素 |
| 标准桌面 | `768px - 1199px` | 默认 PC 布局 |
| 平板/大手机 | `480px - 767px` | 缩小间距，调整字体 |
| 小手机 | `< 480px` | 最小间距，6x4 改为 4x6，字体进一步缩小 |

---

## 六、资源文件命名规范

建议前端工程师按以下结构组织资源：

```
assets/
├── images/
│   ├── themes/
│   │   ├── pets/
│   │   │   ├── back.png          # 萌宠主题卡牌背面
│   │   │   ├── 01-cat.png
│   │   │   ├── 02-shiba.png
│   │   │   ├── 03-rabbit.png
│   │   │   ├── 04-panda.png
│   │   │   ├── 05-corgi.png
│   │   │   ├── 06-hamster.png
│   │   │   ├── 07-penguin.png
│   │   │   ├── 08-fox.png
│   │   │   ├── 09-owl.png
│   │   │   ├── 10-dolphin.png
│   │   │   ├── 11-sloth.png
│   │   │   └── 12-unicorn-cat.png
│   │   └── geometric/
│   │       ├── back.png          # 几何主题卡牌背面
│   │       ├── 01-circle.png
│   │       ├── 02-triangle.png
│   │       ├── 03-star.png
│   │       ├── 04-hexagon.png
│   │       ├── 05-diamond.png
│   │       ├── 06-spiral.png
│   │       ├── 07-cube.png
│   │       ├── 08-wave.png
│   │       ├── 09-cross.png
│   │       ├── 10-heart.png
│   │       ├── 11-lightning.png
│   │       └── 12-infinity.png
│   └── bg/
│       ├── bg-light.png          # 浅色主题背景
│       └── bg-dark.png           # 深色主题背景
├── audio/
│   ├── flip.mp3
│   ├── match-success.mp3
│   ├── match-fail.mp3
│   ├── victory.mp3
│   ├── gameover.mp3
│   └── button-click.mp3
└── fonts/
    └── (如需自定义字体)
```

---

## 七、设计原则总结

1. **一致性**：所有动画时长、缓动函数、圆角、阴影遵循统一规范，避免视觉混乱
2. **反馈即时性**：玩家操作后 100ms 内必须有视觉反馈（翻牌动画立即启动）
3. **可读性优先**：卡牌图案在 80x100px 尺寸下仍可清晰辨认
4. **性能优先**：动画仅使用 `transform` 和 `opacity`，确保 60fps
5. **无障碍**：配色对比度满足 WCAG AA 标准（文字与背景对比度 >= 4.5:1）
6. **渐进增强**：基础游戏无需音效/动画也可正常运行，增强功能作为可选项

---

*本文档由 `game-designer` 智能体输出，供 `frontend-developer` 实现时参考。如有技术实现上的冲突或优化建议，请双方协商后更新本文档。*
