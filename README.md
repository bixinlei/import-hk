# 📡 import-hk — 香港留学 API 文档(CLI + Web)

> `import hk  # 一行代码,入境香港。`

![license](https://img.shields.io/badge/license-CC%20BY%204.0-brightgreen)
![status](https://img.shields.io/badge/status-development-orange)
![stars](https://img.shields.io/github/stars/bixinlei/import-hk)
![lang](https://img.shields.io/badge/%E7%B2%B5%E8%AA%9E-%E5%8F%8B%E5%A5%BD-red)
![npm](https://img.shields.io/badge/npm-import--hk-blue)

> **v0.2.0** · 从「一份文档」升级成了「一个软件」:命令行工具 + 网站,共享同一份开源数据。

**作者**:一名即将赴港的内地 CS 大四学生。
**状态**:`🚧 development` — 代码可运行,内容待作者抵港后亲测。

> 師兄師姐 PR 賜教,冇你哋呢份嘢,真係搞唔掂。

---

## 1. 这是什么

把「去香港留学」这件事,做成了一份 API 文档 —— 而且是**真的能跑**的那种:

| 形态 | 是什么 | 怎么用 |
|---|---|---|
| **CLI 命令行工具** | `import-hk` 命令,终端里查攻略 | `npx import-hk visa` |
| **Web 网站** | 指南 + 搜索 + 心情接口彩蛋 | 部署 Vercel/GitHub Pages |
| **开源数据层** | `data/*.json` 结构化攻略 | 人人都能 PR 修正 |

内容覆盖:学生签注、租房、支付、银行、通信、就业(IANG)、出发清单、心情接口。

---

## 2. 快速开始

### CLI 版(30 秒上手)

```bash
# 直接运行,不用安装
npx import-hk visa

# 或全局安装
npm install -g import-hk

# 查租房,按预算过滤
import-hk flat --budget 8000

# 全库搜索(13 个接口里搜关键词)
import-hk search 押金

# 全部接口总览
import-hk all

# 交互式出发清单(逐项打勾,生成准备度报告)
import-hk check

# 粤语速学 / 生活成本 / 医疗 / 文化
import-hk language
import-hk cost

# 今日心情状态码
import-hk heart

# 入学准备度总检
import-hk doctor
```

### Web 版

```bash
git clone https://github.com/bixinlei/import-hk.git
cd import-hk
npm install
npm run web:dev      # 本地开发 http://localhost:5173
npm run web:build    # 构建静态站点 → packages/web/dist
```

### 文档版

直接读 [`docs/`](./docs/) 下的 9 篇接口文档,和 `data/` 一一对应。

---

## 3. API 总览 (Endpoint Reference)

| Endpoint | 方法 | 说明 | 状态 |
|---|---|---|---|
| `/api/visa` | `GET` | 学生签注 + IANG 毕业规划 | ✅ |
| `/api/flat` | `POST` | 租房(押金/厘印/免佣盘) | ✅ |
| `/api/payment` | `GET` | 八达通 / FPS / 支付生态 | ✅ |
| `/api/bank` | `POST` | 银行开户与跨境汇款 | ✅ |
| `/api/sim` | `POST` | 电话卡「上台」与网络 | ✅ |
| `/api/onboarding` | `POST` | 抵港 Day-1 清单 | ✅ |
| `/api/job` | `GET` | 港漂程序员就业(IANG) | ✅ |
| `/api/food` | `GET` | 食堂/茶餐厅速览 | ✅ |
| `/api/language` | `GET` | 粤语速学(高频用语/资源) | ✅ |
| `/api/health` | `GET` | 医疗与保险 | ✅ |
| `/api/cost` | `GET` | 生活成本预算 | ✅ |
| `/api/culture` | `GET` | 香港文化礼仪 | ✅ |
| `/api/heart` | `GET` | 心情接口(状态码即情绪) | 🧪 alpha |

每个接口 = `docs/*.md`(人读)+ `data/*.json`(机读)+ CLI 子命令 + Web 页面,四端同步。

---

## 4. 架构

```
import-hk/
├── data/            # 唯一数据源:13 个结构化 JSON
├── packages/
│   ├── cli/         # CLI 工具(发布 npm,包名 import-hk)
│   └── web/         # Web 应用(Vite + React,部署静态站)
├── docs/            # 13 篇人读文档
├── .github/         # GitHub Actions:main 推送自动部署 gh-pages
└── README.md
```

CLI 和 Web 读同一份 `data/`,改数据 = 全端更新;PR 改数据 = 零门槛贡献。

---

## 5. 设计原则

1. **信息可核对**:每条经验尽量标注「信息来源/验证方式」,拒绝「听朋友说」。
2. **版本可追溯**:政策会变,攻略也会变。改动走 `CHANGELOG.md`。
3. **亲历者维护**:内容来自真实经历 + 学长学姐 PR。
4. **粤语友好**:全文保留粤语注释,是同路人的暗号,也是这份软件的签名。

---

## 6. 贡献 (Contribute)

想加一条经验、纠一个错、补一个坑?欢迎 PR——**这是唯一一份「用的人越多就越准」的攻略,也是唯一一份能 `npx` 运行的攻略。**

- 如何提交:见 [CONTRIBUTING.md](./CONTRIBUTING.md)(全文粤语,內地同學唔使驚,普通話都收)
- 改数据:编辑 `data/*.json`(建议顺便更新对应 `docs/*.md`)
- 改软件:看 `packages/cli` 和 `packages/web`
- 奖励:你的名字会出现在 [CONTRIBUTORS.md](./CONTRIBUTORS.md) 光荣榜

---

## 7. 路线图 (Roadmap)

| 版本 | 内容 | 时间 |
|---|---|---|
| `v0.1` | 文档骨架 + 9 篇接口文档 | ✅ 已发布 |
| `v0.2` | CLI + Web 双端软件,数据层开源 | ✅ 已发布 |
| `v0.5` | 抵港前全量指南 + 首轮社区 PR | 出发前 |
| `v1.0` | 作者亲测,「上线生产」 | 抵港后 |
| `v2.0` | 港漂就业实战 + 校友网络 | 毕业后 |

---

## 8. License

[CC BY 4.0](./LICENSE) — 署名即可自由使用、修改、分享。
希望这份攻略和软件,成为「下一届同学的公共基础设施」。

---

## 9. FAQ

**Q: 这不是攻略吗,为什么要写成 API 文档,还做成软件?**
A: 因为作者是程序员,而且觉得「状态码 401 = 材料不齐」比「请准备好以下材料」更好记。做成 CLI 和网站,是因为攻略不只能看,还能用。

**Q: 信息准确吗?**
A: 每条都尽量标注来源和验证方式。政策类信息请以官方(`gov.hk` / 学校)为准。

**Q: 为什么叫 `import-hk`?**
A: `import` 是程序员最熟悉的一个词——引入一个依赖,世界就多了一部分。`import hk`,一行代码,入境香港。现在它真的可以 `npx import-hk` 了,大概是全站最容易读懂的 import。

**Q: 我想贡献但没去过香港。**
A: 检查文档、测试 CLI、审代码都是贡献!格式、链接、错别字、逻辑漏洞,全部欢迎 PR。

---

*「唔使驚,香港唔係咁遠㗎。」 —— 作者,出發前 30 日*
