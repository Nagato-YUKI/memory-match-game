# Tasks

## Phase 1: 需求与设计（Planning & Design）
- [ ] Task 1: 产品经理梳理需求并制定验收标准
  - [ ] SubTask 1.1: 细化计分规则（配对数/用时/错误次数的计分公式）
  - [ ] SubTask 1.2: 定义难度配置参数（4x3/4x4/6x4 网格、对应卡牌对数、限时阈值）
  - [ ] SubTask 1.3: 制定验收清单（对应 checklist.md）
  - **负责智能体**: `product-manager`
  - **优先级**: P0（阻塞后续所有开发）

- [ ] Task 2: 游戏策划设计视觉与动效方案
  - [ ] SubTask 2.1: 设计 2 套卡牌主题（动物/卡通/极简中选 2 套）及 AI 素材生成 prompt
  - [ ] SubTask 2.2: 设计配色方案与 2 套主题皮肤（浅色/深色）
  - [ ] SubTask 2.3: 定义动画规格（翻牌动画时长/缓动函数、配对成功/失败反馈动画、得分飘字、胜利过渡动画）
  - [ ] SubTask 2.4: 输出音效需求文档（翻牌/配对成功/失败/胜利音效类型）
  - **负责智能体**: `game-designer`
  - **协作智能体**: `frontend-developer`（技术可行性确认）
  - **优先级**: P0（阻塞视觉与动效开发）
  - **依赖**: Task 1 完成

## Phase 2: 游戏系统完善（Game System）
- [ ] Task 3: 实现计分与存档系统
  - [ ] SubTask 3.1: 实现实时分数板 UI（配对数/用时/错误次数）
  - [ ] SubTask 3.2: 实现游戏状态数据模型（分数/用时/错误次数/最高分解耦）
  - [ ] SubTask 3.3: 实现 localStorage 持久化（最高分、最佳用时、最近游戏记录）
  - [ ] SubTask 3.4: 实现页面刷新后数据恢复逻辑
  - **负责智能体**: `frontend-developer`
  - **优先级**: P1
  - **依赖**: Task 1 完成

- [ ] Task 4: 实现难度选择系统
  - [ ] SubTask 4.1: 实现开始界面难度选择 UI（网格大小/卡牌对数/限时开关）
  - [ ] SubTask 4.2: 实现难度配置与游戏面板动态生成逻辑
  - [ ] SubTask 4.3: 实现限时模式倒计时逻辑（时间到则游戏失败）
  - **负责智能体**: `frontend-developer`
  - **优先级**: P1
  - **依赖**: Task 1 完成

- [ ] Task 5: 实现流程控制系统
  - [ ] SubTask 5.1: 实现开始/暂停/重新开始按钮及状态切换
  - [ ] SubTask 5.2: 实现暂停时卡牌锁定与遮罩层
  - [ ] SubTask 5.3: 实现重新开始时状态重置与卡牌重新洗牌
  - **负责智能体**: `frontend-developer`
  - **优先级**: P1
  - **依赖**: Task 1 完成

## Phase 3: 视觉与动效（Visuals & Animation）
- [ ] Task 6: 生成并集成 AI 素材
  - [ ] SubTask 6.1: 使用 AI 图片接口生成 2 套卡牌正面图案（每套至少 6/8/12 张，对应不同难度）
  - [ ] SubTask 6.2: 生成卡牌背面图案与游戏背景图
  - [ ] SubTask 6.3: 将图片资源集成到项目中，替换默认纯色卡牌
  - **负责智能体**: `frontend-developer`
  - **协作智能体**: `game-designer`（素材审核）
  - **优先级**: P1
  - **依赖**: Task 2 完成

- [ ] Task 7: 实现动画与动效系统
  - [ ] SubTask 7.1: 实现 CSS 3D 卡牌翻转动画
  - [ ] SubTask 7.2: 实现配对成功动画（缩放+发光+锁定）
  - [ ] SubTask 7.3: 实现配对失败动画（抖动+翻回）
  - [ ] SubTask 7.4: 实现得分飘字动画（+10 上浮淡出）
  - [ ] SubTask 7.5: 实现游戏胜利/失败过渡动画（遮罩+文字+按钮）
  - **负责智能体**: `frontend-developer`
  - **优先级**: P1
  - **依赖**: Task 2 完成

- [ ] Task 8: 实现主题皮肤切换
  - [ ] SubTask 8.1: 定义 CSS 变量体系（颜色/边框/阴影/背景）
  - [ ] SubTask 8.2: 实现浅色/深色主题样式
  - [ ] SubTask 8.3: 实现主题切换按钮与切换逻辑（持久化用户选择）
  - **负责智能体**: `frontend-developer`
  - **优先级**: P2
  - **依赖**: Task 2 完成

- [ ] Task 9: 实现音效系统（可选扩展）
  - [ ] SubTask 9.1: 准备/生成翻牌、配对成功、失败、胜利音效文件
  - [ ] SubTask 9.2: 使用 Web Audio API 或 HTML5 Audio 实现音效播放
  - [ ] SubTask 9.3: 实现音效开关控制
  - **负责智能体**: `frontend-developer`
  - **优先级**: P2
  - **依赖**: Task 2 完成

## Phase 4: 进阶功能（Advanced Feature）
- [ ] Task 10: 实现触屏适配（进阶功能）
  - [ ] SubTask 10.1: 使用 `touchstart`/`touchend` 事件实现触屏翻牌
  - [ ] SubTask 10.2: 使用 `@media` 查询优化移动端布局（卡牌尺寸/间距/字体）
  - [ ] SubTask 10.3: 禁止移动端双击缩放，优化触摸响应延迟（`touch-action: manipulation`）
  - [ ] SubTask 10.4: 在手机浏览器验证布局与操作流畅性
  - **负责智能体**: `frontend-developer`
  - **协作智能体**: `test-engineer`（移动端兼容性验证）
  - **优先级**: P1
  - **依赖**: Task 3/4/5 完成（核心系统稳定后适配）

## Phase 5: 测试与验收（Testing & Acceptance）
- [ ] Task 11: 中期模块测试
  - [ ] SubTask 11.1: 测试计分/存档/难度/流程控制功能正确性
  - [ ] SubTask 11.2: 测试动画流畅性与主题切换逻辑
  - [ ] SubTask 11.3: 记录并反馈 bug 列表
  - **负责智能体**: `test-engineer`
  - **协作智能体**: `frontend-developer`（bug 修复）
  - **优先级**: P1
  - **依赖**: Task 3/4/5/6/7 完成

- [ ] Task 12: 最终验收测试
  - [ ] SubTask 12.1: 对照 checklist.md 逐项验证
  - [ ] SubTask 12.2: PC/手机端兼容性测试（Chrome/Safari/Edge/微信内置浏览器）
  - [ ] SubTask 12.3: 刷新页面验证存档持久化
  - [ ] SubTask 12.4: 输出测试报告，确认所有验收标准达标
  - **负责智能体**: `test-engineer`
  - **协作智能体**: `frontend-developer`（最终 bug 修复）
  - **优先级**: P0
  - **依赖**: Task 8/9/10 完成

## Phase 6: 部署与交付（Deployment）
- [ ] Task 13: GitHub Pages 部署
  - [ ] SubTask 13.1: 确认所有资源文件路径正确
  - [ ] SubTask 13.2: 推送代码至 GitHub 并启用 Pages
  - [ ] SubTask 13.3: 验证线上环境功能正常
  - **负责智能体**: `frontend-developer`
  - **优先级**: P0
  - **依赖**: Task 12 完成

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3/4/5 依赖 Task 1
- Task 6/7/8/9 依赖 Task 2
- Task 10 依赖 Task 3/4/5
- Task 11 依赖 Task 3/4/5/6/7
- Task 12 依赖 Task 8/9/10
- Task 13 依赖 Task 12
