# 代码优化任务计划

## 目标
优化记忆翻牌游戏代码结构，符合阿里/字节代码规范（单文件≤300行，单一职责，可拓展）

## 任务列表

### 高优先级

- [ ] **1. 拆分 main.js（398行 → ≤200行）**
  - 提取状态机到 `js/modules/stateMachine.js`
  - 提取事件绑定到 `js/modules/eventHandlers.js`
  - main.js 只保留初始化和模块组装

- [ ] **2. 统一缓存版本号配置**
  - 创建 `js/modules/config.js` 存放 CACHE_VERSION
  - 所有导入使用统一版本号

- [ ] **3. 统一存储键使用 STORAGE_KEYS**
  - cardSkins.js 中使用 STORAGE_KEYS 替代硬编码字符串

- [ ] **4. 解耦皮肤系统和主题系统**
  - cardSkins.js 中 getSelectedSkinId() 不直接读取 LAST_CARD_THEME
  - 通过参数注入或事件机制传递主题信息

### 中优先级（本次不执行）

- [ ] 添加单元测试（Jest/Vitest）
- [ ] 添加 TypeScript 类型定义

## 验收标准

1. main.js 行数 ≤ 200
2. 所有模块行数 ≤ 250
3. ESLint 检查通过（0 errors）
4. 游戏功能完整（开始、翻牌、配对、胜利/失败、暂停）
5. 皮肤系统正常工作

## 进度日志

- [2025-05-27] 创建任务计划
