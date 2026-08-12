# Changelog

本项目的所有重要变更都会记录在此文件。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/),
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Planned(计划中)

- `v0.5`:抵港前全量指南 + 首轮社区 PR 合入
- `v1.0`:作者亲测,文档「上线生产」(抵港后)
- `v2.0`:港漂就业实战 + 校友网络

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
