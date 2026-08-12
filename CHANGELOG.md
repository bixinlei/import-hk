# Changelog

本项目的所有重要变更都会记录在此文件。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/),
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Planned(计划中)

- `v0.5`:抵港前全量指南 + 首轮社区 PR 合入
- `v1.0`:作者亲测,文档「上线生产」(抵港后)
- `v2.0`:港漂就业实战 + 校友网络

## [0.3.0] - 2026-XX-XX

### Added(新增)

- 内容扩至 **13 个接口**:新增粤语速学 `/api/language`、医疗保险 `/api/health`、生活成本 `/api/cost`、文化礼仪 `/api/culture`(数据 + 文档 + CLI + Web 四端)
- CLI 新增 `search`(全库关键词搜索)与 `all`(全部接口总览)命令
- GitHub Actions 工作流:main 推送自动构建 Web 并部署 gh-pages

### Changed(变更)

- Web 接口卡片从 8 个扩到 12 个指南页 + 心情彩蛋页
- README 接口表与快速开始更新(13 接口 / search / all 用法)

## [0.2.1] - 2026-XX-XX

### Added(新增)

- `/api/food` 接口三端补齐:data/food.json + CLI food 命令 + Web 页面

### Changed(变更)

- vite base 配置为 `/import-hk/`,GitHub Pages 部署
- 网站上线:https://bixinlei.github.io/import-hk/

## [0.2.0] - 2026-XX-XX

### Added(新增)

- **CLI 工具**(`packages/cli`):9 个命令(visa/flat/payment/bank/sim/job/check/heart/doctor),发布 npm(包名 `import-hk`)
- **Web 应用**(`packages/web`):Vite + React,指南站 + 搜索 + 心情接口彩蛋页
- **共享数据层** `data/*.json`:8 个结构化 JSON,CLI / Web / 文档三端同步

### Changed(变更)

- README 重写:双端软件介绍 + 新快速开始(CLI 30 秒上手 / Web 本地构建)
- 根 package.json 改为 npm workspaces 多包结构

## [0.1.1] - 2026-XX-XX

### Added(新增)

- 新增 `GET /api/heart` 心情接口:状态码即情绪的港漂心路(200/404/502…)
- 新增 `README.en.md` 英文版(发 HN / 国际社区用)
- README 加入「✍️ 作者的話」独白与 GitHub 徽章(badges)

### Changed(变更)

- 仓库更名为 **import-hk**(`import hk # 一行代码,入境香港`)
- 全部 8 篇接口文档新增「人間味(作者手記)」注脚
- README FAQ 新增「为什么叫 import-hk」名字梗解释

## [0.1.0] - 2026-XX-XX

### Added(初始版本)

- 项目骨架:README(开发文档风格)、CONTRIBUTING(粤语版)、CHANGELOG、LICENSE
- 核心接口文档:
  - `GET /api/visa` — 学生签注 + IANG 规划
  - `POST /api/flat` — 租房指南
  - `GET /api/payment` — 支付生态(八达通 / FPS / 扫码)
  - `POST /api/bank` — 银行开户与跨境汇款
  - `POST /api/sim` — 电话卡「上台」与网络
  - `POST /api/onboarding` — 抵港 Day-1 清单
  - `GET /api/job` — 港漂程序员就业(IANG)
  - `GET /api/food` — 食堂/茶餐厅速览(alpha)

### Notes

- 所有「时长/金额/政策」均以官方最新发布为准,本文档为初稿,欢迎 PR 校正
