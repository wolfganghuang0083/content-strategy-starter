export const meta = {
  name: 'generate-content-strategy',
  description: '基本公司/產品/服務資訊 → 5 personas × N 場景 → 接搜尋意圖的標題 → 種子內容地圖(餵 content-map-builder)',
  phases: [
    { title: 'Profile', detail: '歸納網站定位 + 產出 N 個 ICP personas' },
    { title: 'Demand', detail: '每個 persona：場景→問題→查詢→標題 + 特色對應' },
    { title: 'Synthesize', detail: '去重分群 → 種子內容地圖 + 策略文件' },
  ],
}

// ---- inputs ----
// 注意：用 scriptPath 呼叫時 args 可能被字串化 → 先嘗試 parse 回物件。
let A = args
if (typeof A === 'string') { try { A = JSON.parse(A) } catch (e) { A = {} } }
A = A || {}
const BUSINESS = A.business || ''
const MARKET = A.market || '台灣繁體中文'
const N_PERSONA = A.personas || 5
const N_SCEN = A.scenariosEach || 5
const OUT = A.outPath || '/tmp/content_strategy.md'
if (!BUSINESS) { log('⚠️ 缺 args.business（基本公司/產品/服務資訊）'); return { error: 'no business input' } }

const PROFILE_SCHEMA = {
  type: 'object',
  properties: {
    site_type: { type: 'string', description: '這是怎樣的網站(電商/訂閱/服務/B2B…)與一句話定位' },
    business_model: { type: 'string' },
    positioning: { type: 'string', description: '定位與差異化' },
    conversion_goal: { type: 'string', description: '主要轉換目標(買單/預約/訂閱/名單)' },
    features: { type: 'array', items: { type: 'string' }, description: '產品/服務特色 3-6 點(從輸入歸納，缺就合理推斷並標註)' },
    personas: { type: 'array', items: { type: 'object', properties: {
      name: { type: 'string', description: '稱呼/標籤' },
      identity: { type: 'string', description: '身分/情境' },
      cares_about: { type: 'string' },
      biggest_worry: { type: 'string' },
      buying_motive: { type: 'string' },
    }, required: ['name', 'identity', 'cares_about', 'biggest_worry', 'buying_motive'] } },
  },
  required: ['site_type', 'positioning', 'conversion_goal', 'features', 'personas'],
}

phase('Profile')
const profile = await agent(
  `你是資深內容策略師。市場/語系：${MARKET}。\n基本公司/產品/服務資訊：\n"""${BUSINESS}"""\n\n` +
  `做兩件事：\n①「這是一個怎樣的網站？」歸納 site_type / business_model / positioning / conversion_goal / 產品特色(3-6點)。\n` +
  `②「會買的人可能是哪 ${N_PERSONA} 種？」產出 ${N_PERSONA} 個彼此夠不同的 ICP persona(每個:稱呼、身分情境、在意什麼、最大顧慮、購買動機)。\n` +
  `要點:persona 要夠不同(搜尋字才不重疊);全部用 ${MARKET} 書寫。`,
  { label: 'profile+personas', phase: 'Profile', schema: PROFILE_SCHEMA }
)

const PLAN_SCHEMA = {
  type: 'object',
  properties: {
    persona: { type: 'string' },
    scenarios: { type: 'array', items: { type: 'object', properties: {
      scenario: { type: 'string', description: '具體場景(什麼時候/在哪/正在幹嘛)' },
      problem: { type: 'string', description: '當下卡住的問題' },
      trigger: { type: 'string', description: '促使他開始搜尋的觸發' },
      query: { type: 'string', description: '他真的會打進搜尋框的字(口語/長尾/問句皆可)' },
      stage: { type: 'string', description: 'TOFU認知 / MOFU評估 / BOFU決策' },
      title: { type: 'string', description: '接住此搜尋意圖的文章標題(用他打的字、承諾明確收穫)' },
    }, required: ['scenario', 'problem', 'query', 'stage', 'title'] } },
    feature_fit: { type: 'array', items: { type: 'object', properties: {
      feature: { type: 'string' }, solves: { type: 'string', description: '對應此 persona 的哪個問題' },
    }, required: ['feature', 'solves'] } },
  },
  required: ['persona', 'scenarios'],
}

phase('Demand')
const plans = await parallel(profile.personas.map((p, i) => () =>
  agent(
    `市場/語系：${MARKET}。品牌定位：${profile.positioning}。產品特色：${(profile.features || []).join('、')}。\n` +
    `目標 persona：${p.name} — ${p.identity}；在意：${p.cares_about}；最大顧慮：${p.biggest_worry}；動機：${p.buying_motive}。\n\n` +
    `你同時是 Growth Hacker(需求探勘) 與 Master Copywriter(標題攔截)。針對這位 persona：\n` +
    `① 給 ${N_SCEN} 個「不同」場景(涵蓋 TOFU/MOFU/BOFU)。每個:場景→當下問題→搜尋觸發→他實際會打的查詢字→標題。\n` +
    `② 標題守則:用他打的字命中、點出當下痛/想完成的事、承諾明確收穫、可用數字/對比/怎麼選/避雷/N個等結構但不浮誇不騙點。\n` +
    `③ feature_fit:把產品特色對應到這位 persona 的哪個問題(對不上就不用硬塞)。\n全部用 ${MARKET}。`,
    { label: `persona:${p.name}`.slice(0, 40), phase: 'Demand', schema: PLAN_SCHEMA }
  ).catch(() => null)
))
const ok = plans.filter(Boolean)

phase('Synthesize')
const result = await agent(
  `市場/語系：${MARKET}。請把下列研究合成成一份完整的「內容策略起點」文件，並用 Write 工具存到檔案：${OUT}\n\n` +
  `網站定位(JSON)：${JSON.stringify(profile)}\n\n各 persona 的場景/標題計畫(JSON)：${JSON.stringify(ok)}\n\n` +
  `文件需含這些段落(繁體中文、Markdown)：\n` +
  `# <品牌> 內容策略起點\n` +
  `## ① 這是一個怎樣的網站(site_type/business_model/定位/轉換目標)\n` +
  `## ② 會買的 ${N_PERSONA} 種人(persona 表:稱呼/身分/在意/顧慮/動機)\n` +
  `## ③ JTBD 需求矩陣(每 persona:場景|問題|搜尋觸發|查詢字|階段)\n` +
  `## ④ 產品特色 → 解決哪個問題(對應表;標出核心賣點=對到多個 persona、弱賣點=對不上需求)\n` +
  `## ⑤ 接搜尋意圖的標題守則 + 全部標題\n` +
  `## ⑥ 25 篇題庫總表(欄:persona|階段|場景/問題|查詢字|標題)\n` +
  `## 🌱 種子內容地圖(直接餵 content-map-builder;欄:主題/關鍵字 | 戰略角色(核心保衛/側翼擴張/藍海卡位) | persona | 目標查詢 | 文章標題 | 狀態=⬜待寫)\n` +
  `   - 先去重/合併(不同 persona 撞同題就合一篇)，再分戰略角色與 hub-spoke。\n` +
  `## 下一步\n   - 高潛力題用 content-pipeline 的 serp_analysis.js 做 SERP 壓力測試;確認後把種子地圖貼進 content-map-builder 排優先序。\n\n` +
  `存檔後回傳 {ok:true, outPath, persona_count, title_count}。`,
  { label: 'synthesize+write', phase: 'Synthesize',
    schema: { type: 'object', properties: { ok: { type: 'boolean' }, outPath: { type: 'string' },
      persona_count: { type: 'number' }, title_count: { type: 'number' } }, required: ['ok', 'outPath'] } }
)
log(`策略文件已產出 → ${result.outPath}（persona ${result.persona_count || ok.length}、標題 ${result.title_count || ''}）`)
return result
