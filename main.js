const jobs = [
  { co: '诚拾瓜子', role: '品牌经理', date: '2025.03 — 2026.06', items: [
    ['活动策划与执行', '统筹小红书/抖音/B站/快手内容矩阵，主导纪实叙事内容体系。主导与电影《海底沙漠》联名路演，覆盖 10+ 城市、累计观众 3000+，推动品牌合作 5+。'],
    ['品牌定位与策略', '基于市场与竞品判断目标人群、定位与对标，明确销售策略方向；对外部销售运营团队提要求并跟进，季度内完成 2 次品牌定位梳理与策略校准。'],
    ['产品 0→1 与供应链', '市场调研、差异化定义、包装视觉规范，对接工厂完成打样、试产到量产，搭建基础 SOP，累计推动 4 款新品落地、上架 6+ SKU。'],
    ['数据与团队', '用 Python 爬虫抓取品类与竞品数据，搭建营收预测模型支撑定价；招聘并管理文案、运营、视频、客服团队，规模稳定在 8 人+。']
  ]},
  { co: '重庆字节跳动', role: '抖音运营（内容评估与策略）', date: '2023.10 — 2024.12', items: [
    ['用户拆解', '基于平台大数据拆解用户画像，针对知识服务品类做定制化内容分发与互动策略，按人群偏好调整选题和节奏。'],
    ['策略共建', '协同算法团队建立内容评估模型，针对 50+ 核心品类迭代内容生产，用户互动率提升 27%，目标客群观看时长增长 13%。'],
    ['合规与公关风险', '做平台运营规则压力测试与合规优化，针对公关风险建立标准化审核与传播 SOP，推动 10+ 项规则成功转型。']
  ]},
  { co: '华龙网集团', role: '记者 / 实习生', date: '2023.01 — 2023.03', items: [
    ['现场采编', '以纪实摄影与深度叙事为底色，完成 15+ 优质内容交付，把采访素材转化成可传播的图文内容。'],
    ['内容交付', '参与选题策划到成稿发布全流程，配合编辑多轮修改与事实核对，在日时效压力下稳定产出。']
  ]}
];
const chips = ['品牌定位','活动策划','路演执行','联名合作','商务谈判','公关风控','内容矩阵','团队管理','Python','SQL','AI Workflow / Agent','Photoshop','Premiere','Midjourney','ChatGPT','Excel','纪实摄影','文案撰写'];

// render jobs
const jw = document.getElementById('jobs');
jobs.forEach((j, i) => {
  const el = document.createElement('div');
  el.className = 'job rv' + (i === 0 ? ' open' : '');
  el.innerHTML = `<div class="job-head"><span class="idx mono">#0${i + 1}/03</span><h3>${j.co}</h3>
    <span class="role">${j.role}</span><span class="date mono">${j.date}</span><span class="plus">+</span></div>
    <div class="job-body"><div><ul>${j.items.map(([t, d]) => `<li><strong>${t}</strong>${d}</li>`).join('')}</ul></div></div>`;
  el.querySelector('.job-head').addEventListener('click', () => el.classList.toggle('open'));
  jw.appendChild(el);
});
document.getElementById('chips').innerHTML = chips.map((c, i) => `<span class="chip${i % 3 === 1 ? ' dark' : ''}">${c}</span>`).join('');

// marquee
const words = ['Brand Building', '品牌传播', 'Event Planning', '活动策划', 'Co-Branding', '内容策略'];
const unit = words.map((w, i) => `<span>${i % 2 ? `<i>${w}</i>` : w} ✦</span>`).join('');
document.getElementById('mq').innerHTML = unit + unit;

// binary line
const bin = document.getElementById('binary');
const rnd = () => Array.from({ length: 160 }, () => (Math.random() > .5 ? 1 : 0)).join(' ');
bin.textContent = rnd();
setInterval(() => { bin.textContent = rnd(); }, 1800);

// loader
const cnt = document.getElementById('count');
let n = 0;
const t = setInterval(() => {
  n += Math.ceil(Math.random() * 9);
  if (n >= 100) { n = 100; clearInterval(t);
    setTimeout(() => { document.getElementById('loader').classList.add('done'); document.body.classList.add('ready'); }, 250); }
  cnt.textContent = String(n).padStart(2, '0');
}, 45);

// reveal + counters
const countUp = el => {
  const to = +el.dataset.to, suf = el.dataset.suf || '', s = performance.now();
  const step = now => { const p = Math.min((now - s) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(to * e) + suf; if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
};
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-to]').forEach(countUp);
  io.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// cursor
const cur = document.getElementById('cursor');
let mx = 0, my = 0, cx = 0, cy = 0;
addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() { cx += (mx - cx) * .18; cy += (my - cy) * .18;
  cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; requestAnimationFrame(loop); })();
document.addEventListener('mouseover', e => cur.classList.toggle('big', !!e.target.closest('a,.job-head,.chip,.case-card')));

// tilt card
const card = document.getElementById('tilt');
card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  card.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`; });
card.addEventListener('mouseleave', () => { card.style.transform = ''; });
