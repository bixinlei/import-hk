// prepack.js — 发布前把仓库根的共享数据复制进包内(CLI 发布后自包含,不依赖仓库结构)
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', '..', 'data');
const dest = path.join(__dirname, '..', 'data');

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
console.log('✅ data copied:', dest);
