# 记忆翻牌游戏

一个精美的东方风格记忆翻牌配对游戏，支持国风与和风两种主题，拥有丰富的卡面皮肤系统和多种难度选择。

## 在线试玩

[点击这里在线体验](https://nagato-yuki.github.io/memory-match-game/)

## 游戏特色

### 主题风格
- **国风主题**：水墨山水背景，古典诗词，中国风卡牌
- **和风主题**：樱花富士背景，俳句短歌，日式风格卡牌

### 卡面皮肤系统
6 种精美卡面皮肤，通过累计分数解锁：

| 系列 | 皮肤 | 解锁条件 |
|------|------|----------|
| 国风 | 山水 | 初始解锁 |
| 国风 | 园林 | 累计 500 分 |
| 国风 | 宫殿 | 累计 1500 分 |
| 和风 | 古寺 | 初始解锁 |
| 和风 | 竹林 | 累计 500 分 |
| 和风 | 富士 | 累计 1500 分 |

### 难度选择
- **简单**：4×3 网格，不限时
- **中等**：4×4 网格，限时 60 秒
- **困难**：6×4 网格，限时 120 秒

### 游戏功能
- 限时挑战模式（可开关）
- 背景音乐与音效控制
- 实时分数统计与最高分记录
- 响应式设计，支持移动端

## 技术栈

- HTML5 + CSS3 + JavaScript (ES6+)
- 原生 Web Audio API 音效
- CSS 动画与过渡效果
- LocalStorage 本地数据存储

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/Nagato-YUKI/memory-match-game.git

# 进入目录
cd memory-match-game

# 启动本地服务器（任选一种）
python -m http.server 8080
npx serve .
```

然后访问 http://localhost:8080

## 项目结构

```
memory-match-game/
├── index.html              # 主页面
├── css/                    # 样式文件
│   ├── style.css           # 入口文件
│   ├── variables.css       # CSS 变量
│   ├── base.css            # 基础样式
│   ├── start-screen.css    # 开始界面
│   ├── game-board.css      # 游戏面板
│   ├── components.css      # 通用组件
│   ├── skin-selector.css   # 皮肤选择器
│   └── responsive.css      # 响应式适配
├── js/
│   ├── main.js             # 主入口
│   ├── modules/
│   │   ├── constants.js    # 常量定义
│   │   ├── dom.js          # DOM 操作
│   │   ├── gameLogic.js    # 游戏逻辑
│   │   ├── cardRenderer.js # 卡牌渲染
│   │   ├── cardSkins.js    # 皮肤系统
│   │   ├── skinUI.js       # 皮肤 UI
│   │   ├── audio.js        # 音频管理
│   │   └── soundEffects.js # 音效管理
│   └── utils/
│       ├── helpers.js      # 工具函数
│       └── timer.js        # 计时器
└── assets/
    ├── images/             # 图片资源
    │   ├── cards/          # 卡牌正面
    │   ├── skins/          # 卡面皮肤
    │   └── bg/             # 背景图
    └── audio/              # 音频资源
```

## 更新日志

### v2.0.0
- 新增卡面皮肤系统（6 种皮肤，解锁机制）
- 重构 CSS 和 JS 代码结构
- 优化卡牌图片自适应显示
- 修复音效实时生效问题

### v1.0.0
- 基础翻牌配对功能
- 国风/和风双主题
- 三种难度选择
- 背景音乐与音效

## License

MIT License
