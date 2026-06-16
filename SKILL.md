---
name: content-strategy-starter
description: 內容行銷自動化的「Step 0 / 上游策略起點」——只要給基本的公司/產品/服務資訊，就產出：①這是什麼網站 ②會買的 5 種人(ICP persona) ③每種人的場景→問題→搜尋觸發→實際查詢字 ④產品特色對應解決哪個問題 ⑤接住當下搜尋意圖的標題 ⑥每種人各 5 個場景與文章標題(共 25 篇題庫)，並收斂成可餵 content-map-builder 的「種子內容地圖」。當使用者要「從零規劃內容策略/還沒有關鍵字或 GSC 數據的新站/新客戶/做產品與受眾研究/想一次生出一批文章題目」時使用。
---

# Content Strategy Starter（內容策略起點 · 基本資訊 → 完整題庫）

整條內容鏈最上游。下游的 `content-map-builder` 擅長「收割既有需求」(靠 GSC 數據把卡第 2 頁的舊頁推上去)，但**新站沒有 GSC 就無從收割**。本 skill 解決冷啟動：**從 persona × JTBD 場景「無中生有」出關鍵字與標題**，產出一張種子內容地圖。

> 兩個視角合一：
> **Growth Hacker** — 需求探勘：用「人 × 場景 × 工作要完成(JTBD)」反推他們真正會打的搜尋字，繞過「沒有歷史數據」的雞生蛋問題。
> **Master Copywriter** — 標題即攔截：把「某種人，在某個場景，正卡在某個問題」翻成「他當下會點下去的標題」(接住搜尋意圖，而不是聰明但模糊)。

## 何時用
- 全新網站 / 新客戶，**還沒有關鍵字規劃、沒有 GSC 數據**。
- 想做「產品＋受眾基本研究」並一次生出一批文章題目。
- 既有站想補新的受眾切角 / 場景題庫。

## 輸入
一份「基本資訊 brief」(見 `templates/business-brief.template.md`)：公司在賣什麼、給誰、解決什麼、產品特色 3–6 點、市場/語系、競品(可省)。**就這樣，不需要關鍵字或數據。**

## 產出
1. **種子內容地圖**(餵給 content-map-builder)：主題 × 戰略角色 × persona × 目標查詢 × 文章標題。
2. **策略文件**：網站定位、5 個 persona、JTBD 場景矩陣、特色→問題對應、25 篇題庫。

---

## 六步驟（＝你給基本資訊後，這個 skill 跑的流程）

### ① 這是一個怎樣的網站？
用基本資訊歸納：賣什麼、商業模式(電商/訂閱/服務/B2B)、定位與差異化、轉換目標(買單/預約/訂閱/名單)。一句話講清「誰來、為什麼、要他做什麼」。

### ② 會買的人，可能是哪 5 種類型？(ICP personas)
產出 **5 個彼此夠不同的買家類型**，每個含：稱呼、身分/情境、在意什麼、最大顧慮、購買動機。
> GH 重點：5 種要「夠不同」——不同 persona 觸發的搜尋字差很多，混在一起廣告/內容都學不到東西。

### ③ 這 5 種人，在什麼場景、遇到什麼問題，才開始搜尋？(JTBD 需求探勘)
每個 persona 拆出觸發搜尋的具體時刻：**場景 → 當下問題 → 搜尋觸發 → 他實際會打的查詢字(含長尾/口語/問句)**。
> 關鍵：寫「他真的會打進搜尋框的字」，不是行銷術語。涵蓋 TOFU(認知)/MOFU(評估)/BOFU(決策) 不同階段。

### ④ 我們的產品特色，分別解決他們哪個問題？(定位對應)
把產品特色 3–6 點，逐一對應到「哪個 persona 的哪個問題」。對不上的特色 = 沒有需求支撐，標記為弱賣點；對到多個 persona 的 = 核心賣點，內容/CTA 優先放。

### ⑤ 標題怎麼設計，才接住他當下的搜尋需求？(Copywriter)
每個(persona, 場景, 問題)→ 一個**接住搜尋意圖的標題**。標題守則：
- 用他打的字(③ 的查詢) 開頭或命中，不要藏在後面。
- 點出「當下的痛 / 想完成的事」，承諾一個明確收穫。
- 數字/對比/「怎麼選/避雷/X vs Y/N 個」等高點擊結構，但不浮誇、不騙點。
- 對應搜尋階段：問句(TOFU)、比較/評估(MOFU)、立刻可買/可約(BOFU)。

### ⑥ 5 種人 × 各 5 場景 = 25 篇題庫 → 收斂成種子地圖
每個 persona 給 5 個不同場景與問題＋標題(共 25)。然後：
- **去重/合併**(不同 persona 可能撞同一題 → 合成一篇主文)。
- **分戰略角色**(核心保衛/側翼擴張/藍海卡位) 與 hub-spoke。
- **(選配) SERP 壓力測試**：把高潛力標題丟給 content-pipeline 的 `serp_analysis.js` 驗證真有搜尋面、看競品切角、定位空隙。
- 輸出成 content-map-builder 的種子地圖欄位(主題 / 角色 / persona / 目標查詢 / 標題 / 狀態=待寫)。

---

## 自動跑（一鍵）
```
Workflow({ scriptPath: '~/.claude/skills/content-strategy-starter/scripts/generate_strategy.js',
           args: { business: '<貼上你的基本資訊 brief，或一段話描述公司/產品/服務>',
                   market: '<市場/語系，如 台灣繁中 / US English(可省)>',
                   personas: 5, scenariosEach: 5,
                   outPath: '/tmp/strategy_<slug>.md' } })
```
跑完 Read `outPath`：拿到策略文件＋25 篇題庫＋種子地圖。把種子地圖貼進 content-map-builder 的表，接著走 map → pipeline → schedule → interlink。

## 鐵則
- **先有人，再有字**：所有關鍵字/標題都從 persona × 場景長出來，不憑空想關鍵字。
- **標題用他打的字**：接搜尋意圖，不耍聰明。
- **特色要對得上問題**：對不上需求的特色不主打。
- **5 種要夠不同**：persona 太像 = 搜尋字重疊 = 內容互相蠶食。
- **題庫≠終點**：高潛力題用 SERP 驗證、再進 content-map-builder 排優先序，別 25 篇全部無腦寫。
- 涉及真實品牌宣稱/案例/數字時，仍交給 content-pipeline 的 FACTS.md 與對抗式查核把關。

## 工具鏈位置
`content-strategy-starter`(本) → [content-map-builder] → [content-pipeline] → [content-schedule] → [internal-linking]。
完整教學頁：https://wolfganghuang0083.github.io/content-ops-toolkit/
