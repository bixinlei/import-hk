import React, { useMemo, useState } from 'react'
import visa from '@data/visa.json'
import flat from '@data/flat.json'
import payment from '@data/payment.json'
import bank from '@data/bank.json'
import sim from '@data/sim.json'
import job from '@data/job.json'
import checklist from '@data/checklist.json'
import heart from '@data/heart.json'
import food from '@data/food.json'

const GUIDES = [visa, flat, payment, bank, sim, job, checklist, food]

const LABELS = {
  steps: '流程', title: '标题', detail: '详情', order: '序号',
  iang: 'IANG 关键规则', freshWindow: '应届窗口', firstDuration: '首次逗留',
  renewal: '续签', pr: '永居', note: '说明',
  pitfalls: '常见坑', channels: '渠道', type: '类型',
  terms: '黑话', term: '术语', meaning: '含义',
  budgetHints: '预算参考', range: '预算区间', hint: '建议',
  flow: '流程', methods: '支付方式', name: '名称',
  coverage: '覆盖率', use: '用途', tips: '小贴士',
  banks: '银行对比', friendliness: '友好度', materials: '开户材料',
  remittance: '跨境汇款', method: '方式', speed: '速度', fee: '费用',
  carriers: '运营商', fit: '适合', notes: '要点',
  companies: '公司地图', names: '名单', salary: '薪资参考',
  iangNotes: 'IANG 实战', preDeparture: '出发前', day0: '抵港当天',
  week1: '第一周', priority: '优先级', task: '任务',
  transport: '交通速览', mode: '方式',
  codes: '心情状态码', code: '状态码', official: '官方含义',
  debugging: '调试建议', summary: '简介', humanNote: '作者手記', sources: '来源',
}

const label = (k) => LABELS[k] || k
const fmt = (x) => (typeof x === 'object' ? JSON.stringify(x) : String(x))

function Item({ v }) {
  if (v === null || v === undefined) return null
  if (typeof v === 'object') {
    return (
      <div className="item">
        {Object.entries(v).map(([k, x]) => (
          <span key={k} className="item-kv">
            <b>{label(k)}</b>: {fmt(x)}
          </span>
        ))}
      </div>
    )
  }
  return <span>{String(v)}</span>
}

function Field({ k, v }) {
  if (Array.isArray(v)) {
    return (
      <section className="card">
        <h3>📌 {label(k)}</h3>
        <ul>
          {v.map((x, i) => (
            <li key={i}>
              <Item v={x} />
            </li>
          ))}
        </ul>
      </section>
    )
  }
  if (v && typeof v === 'object') {
    return (
      <section className="card">
        <h3>📌 {label(k)}</h3>
        {Object.entries(v).map(([k2, v2]) => (
          <p key={k2}>
            <b>{label(k2)}</b>: {fmt(v2)}
          </p>
        ))}
      </section>
    )
  }
  return null
}

function GuideView({ g, onBack }) {
  const skip = new Set(['id', 'title', 'method', 'endpoint', 'summary', 'humanNote', 'sources'])
  return (
    <div className="guide">
      <button className="back" onClick={onBack}>← 返回</button>
      <div className="guide-head">
        <span className="badge">{g.method} {g.endpoint}</span>
        <h1>{g.title}</h1>
        <p className="summary">{g.summary}</p>
      </div>
      {Object.entries(g)
        .filter(([k]) => !skip.has(k))
        .map(([k, v]) => (
          <Field key={k} k={k} v={v} />
        ))}
      {g.humanNote && (
        <section className="card human">
          <h3>✍️ 人間味</h3>
          <p>{g.humanNote}</p>
        </section>
      )}
      {g.sources && (
        <section className="card">
          <h3>📎 来源</h3>
          <ul>
            {g.sources.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function HeartView({ data }) {
  const [pick, setPick] = useState(() => data.codes[Math.floor(Math.random() * data.codes.length)])
  const [tip, setTip] = useState(() => data.debugging[Math.floor(Math.random() * data.debugging.length)])
  const roll = () => {
    setPick(data.codes[Math.floor(Math.random() * data.codes.length)])
    setTip(data.debugging[Math.floor(Math.random() * data.debugging.length)])
  }
  return (
    <div className="heart">
      <div className="heart-card" onClick={roll}>
        <div className="heart-code">{pick.code}</div>
        <div className="heart-official">{pick.official}</div>
        <div className="heart-meaning">{pick.meaning}</div>
      </div>
      <p className="heart-tip">💡 {tip}</p>
      <button className="btn" onClick={roll}>再抽一次 🔄</button>
      <p className="heart-note">点击卡片也可以抽 · 每一个港漂都係由 404 開始嘅,慢慢都會變成 200。</p>
    </div>
  )
}

function Home({ guides, query, setQuery, open }) {
  const filtered = useMemo(() => {
    if (!query.trim()) return guides
    const q = query.toLowerCase()
    return guides.filter((g) => JSON.stringify(g).toLowerCase().includes(q))
  }, [guides, query])
  return (
    <>
      <section className="hero">
        <code className="hero-code">import hk <span className="comment"># 一行代码,入境香港</span></code>
        <h1>香港留学,写成了一份 API 文档</h1>
        <p>
          大四的我去香港读研,把签证、租房、银行、通信、就业全部整理成了接口文档。
          这既是攻略,也是软件 —— 命令行工具 + 网站,数据开源,人人可改。
        </p>
        <div className="hero-links">
          <a href="https://github.com/bixinlei/import-hk" target="_blank" rel="noreferrer">⭐ GitHub</a>
          <button className="linklike" onClick={() => open('heart')}>❤️ 心情接口</button>
        </div>
      </section>
      <section className="search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索:签证、押金、八达通、IANG、住址证明…"
        />
      </section>
      <section className="grid">
        {filtered.map((g) => (
          <button key={g.id} className="card clickable" onClick={() => open(g.id)}>
            <span className="badge">{g.method} {g.endpoint}</span>
            <h2>{g.title}</h2>
            <p>{g.summary}</p>
          </button>
        ))}
        <button className="card clickable heart-tile" onClick={() => open('heart')}>
          <span className="badge">GET /api/heart</span>
          <h2>心情接口</h2>
          <p>状态码即情绪。404 係暫時搵唔到自己,502 係屋企個信號時好時壞。</p>
        </button>
      </section>
    </>
  )
}

export default function App() {
  const [view, setView] = useState('home')
  const [currentId, setCurrentId] = useState(null)
  const [query, setQuery] = useState('')
  const open = (id) => {
    setCurrentId(id)
    setView(id === 'heart' ? 'heart' : 'guide')
    window.scrollTo({ top: 0 })
  }
  const current = GUIDES.find((g) => g.id === currentId)

  return (
    <div className="app">
      <header className="nav">
        <button className="brand" onClick={() => setView('home')}>
          <span className="brand-logo">🇭🇰</span> import-hk
        </button>
        <nav>
          <button onClick={() => setView('home')}>首页</button>
          <button onClick={() => open('heart')}>心情接口</button>
          <a href="https://github.com/bixinlei/import-hk" target="_blank" rel="noreferrer">GitHub ⭐</a>
        </nav>
      </header>
      <main>
        {view === 'home' && <Home guides={GUIDES} query={query} setQuery={setQuery} open={open} />}
        {view === 'guide' && current && <GuideView g={current} onBack={() => setView('home')} />}
        {view === 'heart' && <HeartView data={heart} />}
      </main>
      <footer>
        <p>
          import-hk · 开源 · <a href="https://github.com/bixinlei/import-hk" target="_blank" rel="noreferrer">CC BY 4.0</a>
          {' '}· 由一個即將赴港嘅大四 CS 學生維護
        </p>
      </footer>
    </div>
  )
}
