# 📡 import-hk — Study in Hong Kong, as an API

> `import hk  # one line of code, entry into Hong Kong.`

![license](https://img.shields.io/badge/license-CC%20BY%204.0-brightgreen)
![status](https://img.shields.io/badge/status-development-orange)
![stars](https://img.shields.io/github/stars/bixinlei/import-hk)
![lang](https://img.shields.io/badge/Cantonese-friendly-red)

**v0.1.1** · The docs are still in development. `v1.0` will be released after the author lands in Hong Kong.

Turning **"moving to Hong Kong for grad school"** into an API reference that any programmer can read.

**Author**: a final-year CS student from mainland China, about to move to Hong Kong.
**Status**: `🚧 development` — not yet battle-tested in production (Hong Kong). Contributions welcome.

> *"Senior classmates, your PRs are how this stays alive."* — the author, 30 days before departure

---

## 1. Why this exists

Every year, tens of thousands of mainland Chinese students move to Hong Kong for graduate school. But every guide is scattered across:

- 🔒 paid WeChat articles
- 📱 Instagram-style posts that vanish into the feed
- 🤫 one-off tips passed mouth-to-mouth by seniors
- 🗑️ guides that are three years out of date

**There is no open-source, version-controlled, documented version.**

So this project was born — breaking the whole "moving to Hong Kong" process into **endpoints**, maintained by people who actually lived it. PRs keep it alive. The README *is* the product.

> ### ✍️ A note from the author (written before departure)
>
> Hi, I'm the author — a final-year CS student from mainland China, about to move to Hong Kong for grad school.
>
> This is not a grand manifesto. It's a gift I wanted to leave for myself, and for whoever comes after me. I wrote it as an API reference because that's the only language I'm fluent in — but every line in it is sincere.
>
> Moving to Hong Kong is, for many of us, the first time we leave home. Scared? Yes. Will we miss home? Of course. Worth it? I believe so — Hong Kong has the harbor wind, 24/7 convenience stores, the feeling that hard work pays off, and a version of yourself you haven't met yet.
>
> I hope this doc helps you step over fewer pitfalls, and save your energy for actually feeling this city.
>
> — the author, 30 days before departure

---

## 2. Quick Start

```bash
# Step 0: get an offer (this project does not cover that)
# Step 1: student visa  — GET /api/visa
# Step 2: find a flat   — POST /api/flat
# Step 3: land & setup  — POST /api/onboarding
# Step 4: bank + SIM    — POST /api/bank + GET /api/sim
# Step 5: stay & work   — GET /api/job (IANG)
```

Each endpoint is a standalone doc. Read them in any order.

---

## 3. Endpoint Reference

| Endpoint | Method | What it covers | Status |
|---|---|---|---|
| `/api/visa` | `GET` | Student visa + IANG post-grad plan | ✅ ready |
| `/api/flat` | `POST` | Renting (deposits, stamp duty, agent fees) | ✅ ready |
| `/api/payment` | `GET` | Octopus / FPS / payment ecosystem | ✅ ready |
| `/api/bank` | `POST` | Bank accounts & cross-border remittance | ✅ ready |
| `/api/sim` | `POST` | Mobile plans & dual-SIM strategy | ✅ ready |
| `/api/onboarding` | `POST` | Day-1 landing checklist | 🚧 WIP |
| `/api/job` | `GET` | Tech jobs in HK (IANG) | 🚧 WIP |
| `/api/food` | `GET` | Cafeteria / cha chaan teng guide (fun) | 🧪 alpha |
| `/api/heart` | `GET` | Feelings endpoint (status codes as emotions) | 🧪 alpha |

---

## 4. Design principles

1. **Verifiable**: every tip should state its source. No "I heard from a friend."
2. **Versioned**: policies change; so does the guide. See `CHANGELOG.md`.
3. **Maintained by those who lived it**: real experiences + senior PRs.
4. **Cantonese-friendly**: Cantonese notes are our in-joke — and the signature of this doc.

---

## 5. Contribute

Found a pitfall? A stale price? Want to add an endpoint? Open a PR — **this is the only guide that gets more accurate the more people use it.**

- How: see [CONTRIBUTING.md](./CONTRIBUTING.md) (in Cantonese; Mandarin welcome too)
- Reward: your name on the [CONTRIBUTORS.md](./CONTRIBUTORS.md) wall of fame
- Every doc follows one format: `Endpoint / Request / Flow / Response / Status Codes / Troubleshooting / Sources / TODO`

---

## 6. Roadmap

| Version | Content | When |
|---|---|---|
| `v0.1` | Skeleton + core endpoints | now |
| `v0.5` | Full pre-departure guide + first community PRs | before departure |
| `v1.0` | Author-tested, "goes to production" | after landing |
| `v2.0` | HK tech career + alumni network | after graduation |

---

## 7. License

[CC BY 4.0](./LICENSE) — share, adapt, remix, with attribution.
This doc is meant to be public infrastructure for the next cohort — not someone's paid course.

---

## 8. FAQ

**Q: Why is a guide written as an API reference?**
A: Because the author is a programmer, and "status code 401 = missing documents" is easier to remember than "please prepare the following materials."

**Q: Is the information accurate?**
A: Every item aims to state its source and verification. For policies, always check the official sources (`immd.gov.hk` / your university).

**Q: Why `import-hk`?**
A: `import` is the most familiar word in a programmer's life — add a dependency, and the world gains a part of itself. `import hk`, one line of code, entry into Hong Kong. Also, it's probably the most readable import on the entire site.

---

*"唔使驚,香港唔係咁遠㗎." (Don't worry — Hong Kong isn't that far.) — the author, 30 days before departure*
