#!/usr/bin/env node
/**
 * import-hk — 一行代码,入境香港。
 * 香港留学指南命令行版。数据与仓库根 data/ 共享。
 */
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ---------- 数据加载 ----------

function resolveDataDir() {
  const inPkg = path.join(__dirname, 'data'); // 发布后的包内数据
  if (fs.existsSync(inPkg)) return inPkg;
  return path.resolve(__dirname, '..', '..', 'data'); // 开发模式:仓库根共享数据
}

function load(id) {
  const file = path.join(resolveDataDir(), `${id}.json`);
  if (!fs.existsSync(file)) {
    console.error(`⚠️ 数据文件缺失: ${file}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

// ---------- 渲染工具 ----------

const hr = () => console.log('─'.repeat(50));

function printSection(title) {
  console.log(`\n◆ ${title}`);
}

function printList(items, prefix = '•') {
  items.forEach((it, i) => console.log(`  ${prefix} ${it}`));
}

function printFooter(d) {
  if (d.sources && d.sources.length) {
    printSection('来源');
    printList(d.sources, '↳');
  }
  if (d.humanNote) {
    console.log(`\n  ✍️  ${d.humanNote}`);
  }
  console.log();
}

// ---------- 命令实现 ----------

function cmdGuide(id, render) {
  const d = load(id);
  render(d);
  printFooter(d);
}

function registerCommands(program) {
  // visa
  program
    .command('visa')
    .description('学生签注 + IANG 规划')
    .action(() => cmdGuide('visa', (d) => {
      console.log(`\n📡 ${d.method} ${d.endpoint} — ${d.title}`);
      console.log(`   ${d.summary}`);
      printSection('流程');
      d.steps.forEach((s) => console.log(`  ${s.order}. ${s.title}: ${s.detail}`));
      printSection('IANG 关键规则');
      console.log(`  · 应届窗口: ${d.iang.freshWindow}`);
      console.log(`  · 首次逗留: ${d.iang.firstDuration}`);
      console.log(`  · 续签: ${d.iang.renewal}`);
      console.log(`  · 永居: ${d.iang.pr}`);
      console.log(`  💡 ${d.iang.note}`);
      printSection('常见坑');
      printList(d.pitfalls);
    }));

  // flat
  program
    .command('flat')
    .description('租房:渠道/黑话/预算(支持 --budget)')
    .option('-b, --budget <amount>', '月预算(HKD),显示对应区域建议', parseFloat)
    .action((opts) => {
      const d = load('flat');
      console.log(`\n📡 ${d.method} ${d.endpoint} — ${d.title}`);
      console.log(`   ${d.summary}`);
      if (opts.budget) {
        printSection(`预算建议(${opts.budget} HKD/月)`);
        const hit = d.budgetHints.find((h) => {
          const [lo, hi] = h.range.split('-').map(Number);
          return opts.budget >= lo && opts.budget <= hi;
        });
        if (hit) console.log(`  💡 ${hit.range} HKD: ${hit.hint}`);
        else if (opts.budget < 6000) console.log('  💡 低于 6000 比较难,考虑合租或远区/学校宿舍');
        else console.log('  💡 超出常见区间,恭喜,选择面很大');
      } else {
        printSection('预算速查');
        d.budgetHints.forEach((h) => console.log(`  · ${h.range} HKD: ${h.hint}`));
      }
      printSection('渠道');
      d.channels.forEach((c) => console.log(`  · ${c.name}(${c.type}): ${c.note}`));
      printSection('黑话');
      d.terms.forEach((t) => console.log(`  · ${t.term} = ${t.meaning}`));
      printSection('常见坑');
      printList(d.pitfalls);
      printFooter(d);
    });

  // payment
  program
    .command('payment')
    .description('支付生态:八达通 / FPS / 扫码')
    .action(() => cmdGuide('payment', (d) => {
      console.log(`\n📡 ${d.method} ${d.endpoint} — ${d.title}`);
      console.log(`   ${d.summary}`);
      printSection('支付方式');
      d.methods.forEach((m) => {
        console.log(`  · ${m.name} [覆盖率 ${m.coverage}]`);
        console.log(`     用途: ${m.use}`);
        console.log(`     提示: ${m.note}`);
      });
      printSection('小贴士');
      printList(d.tips);
    }));

  // bank
  program
    .command('bank')
    .description('银行开户与跨境汇款')
    .action(() => cmdGuide('bank', (d) => {
      console.log(`\n📡 ${d.method} ${d.endpoint} — ${d.title}`);
      console.log(`   ${d.summary}`);
      printSection('银行对比(内地同学友好度)');
      d.banks.forEach((b) => console.log(`  · ${b.name} [${b.friendliness}]: ${b.note}`));
      printSection('开户材料');
      printList(d.materials);
      printSection('跨境汇款');
      d.remittance.forEach((r) => console.log(`  · ${r.method}: ${r.speed}, ${r.fee} — ${r.use}`));
      printSection('常见坑');
      printList(d.pitfalls);
    }));

  // sim
  program
    .command('sim')
    .description('电话卡上台与网络')
    .action(() => cmdGuide('sim', (d) => {
      console.log(`\n📡 ${d.method} ${d.endpoint} — ${d.title}`);
      console.log(`   ${d.summary}`);
      printSection('运营商对比');
      d.carriers.forEach((c) => console.log(`  · ${c.name}: ${c.note} → 适合${c.fit}`));
      printSection('要点');
      printList(d.notes);
      printSection('上台材料');
      printList(d.materials);
    }));

  // job
  program
    .command('job')
    .description('港漂程序员就业(IANG)')
    .action(() => cmdGuide('job', (d) => {
      console.log(`\n📡 ${d.method} ${d.endpoint} — ${d.title}`);
      console.log(`   ${d.summary}`);
      printSection('薪资参考');
      console.log(`  💰 ${d.salary}`);
      printSection('公司地图');
      d.companies.forEach((c) => console.log(`  · ${c.type}: ${c.names} — ${c.note}`));
      printSection('求职渠道');
      printList(d.channels);
      printSection('IANG 实战');
      printList(d.iangNotes);
    }));

  // check — 交互式出发清单
  program
    .command('check')
    .description('出发清单:逐项勾选,生成准备度报告(交互式)')
    .action(() => {
      const d = load('checklist');
      const all = [
        ...d.preDeparture.map((t) => ({ group: '出发前', text: t })),
        ...d.day0.map((t) => ({ group: '抵港当天', text: t })),
        ...d.week1.map((w) => ({ group: `第一周[${w.priority}]`, text: `${w.task} — ${w.note}` })),
      ];
      console.log(`\n📡 ${d.method} ${d.endpoint} — ${d.title}`);
      console.log(`   共 ${all.length} 项,按 y/n 逐项确认。\n`);
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      let i = 0;
      const done = [];
      const ask = () => {
        if (i >= all.length) {
          rl.close();
          const pct = Math.round((done.length / all.length) * 100);
          console.log(`\n${hr()}`);
          console.log(`  准备度: ${done.length}/${all.length} (${pct}%)`);
          console.log(`  未完成 ${all.length - done.length} 项:${all.filter((_, idx) => !done[idx]).map((a) => a.text.split(' — ')[0]).join('、')}`);
          console.log(`  💡 差啲咩就補咩,唔使急,慢慢嚟。`);
          console.log(`${hr()}\n`);
          return;
        }
        const it = all[i];
        rl.question(`[${i + 1}/${all.length}] (${it.group}) ${it.text}\n  完成了吗? (y/n) `, (ans) => {
          done.push(ans.trim().toLowerCase() === 'y');
          i += 1;
          ask();
        });
      };
      ask();
    });

  // heart
  program
    .command('heart')
    .description('心情接口:随机一个状态码,看看今天的你')
    .option('-c, --code <code>', '查询指定状态码的含义')
    .action((opts) => {
      const d = load('heart');
      if (opts.code) {
        const hit = d.codes.find((c) => c.code === opts.code);
        if (!hit) {
          console.log(`\n  ❓ 没有 ${opts.code} 这个状态码。但没关系,任何状态码都会过去。`);
          return;
        }
        console.log(`\n  ${hit.code} ${hit.official}`);
        console.log(`  ${hit.meaning}\n`);
        return;
      }
      const pick = d.codes[Math.floor(Math.random() * d.codes.length)];
      console.log(`\n  ── 今日心情状态码 ──`);
      console.log(`  ${pick.code} ${pick.official}`);
      console.log(`  ${pick.meaning}\n`);
      const tip = d.debugging[Math.floor(Math.random() * d.debugging.length)];
      console.log(`  💡 ${tip}\n`);
    });

  // doctor — 准备度总检
  program
    .command('doctor')
    .description('入学准备度总检:关键事项速览')
    .action(() => {
      const visa = load('visa');
      const check = load('checklist');
      console.log(`\n🏥 import-hk doctor — 出发准备度总检\n`);
      console.log('  [核心链路] 必做,按顺序:');
      visa.steps.forEach((s) => console.log(`    ${s.order}. ${s.title}`));
      console.log('\n  [第一周 P0/P1] 抵港后立刻办:');
      check.week1.filter((w) => w.priority !== 'P2').forEach((w) => console.log(`    [${w.priority}] ${w.task}`));
      console.log(`\n  💡 状态: ${visa.iang.note}\n`);
    });
}

// ---------- 主入口 ----------

const program = new Command();
program
  .name('import-hk')
  .version('0.1.1')
  .description('一行代码,入境香港 🇭🇰  — 香港留学指南 CLI\n用法示例:\n  import-hk visa         查看签证流程\n  import-hk flat -b 8000 按预算看租房建议\n  import-hk check        交互式出发清单\n  import-hk heart        今日心情状态码');

registerCommands(program);

program.action(() => {
  // 无参数时显示总览
  console.log('\n🇭🇰 import-hk — 一行代码,入境香港');
  console.log(hr());
  console.log('  可用的指南命令:');
  ['visa', 'flat', 'payment', 'bank', 'sim', 'job', 'check', 'heart', 'doctor'].forEach((c) => {
    const cmd = program.commands.find((x) => x.name() === c);
    if (cmd) console.log(`    import-hk ${c.padEnd(9)} ${cmd.description()}`);
  });
  console.log(`${hr()}\n  更多: import-hk --help\n`);
});

program.parse(process.argv);
