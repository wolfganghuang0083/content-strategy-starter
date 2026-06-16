# content-strategy-starter

> 📖 **手把手 fork + 使用教學（GitHub Pages）**：https://wolfganghuang0083.github.io/content-ops-toolkit/

The **Step 0** of the content-ops toolkit. Give it **basic company / product / service info** and it produces a full content strategy from scratch — personas, demand scenarios, search-intent titles, and a **seed content map** — so a brand-new site with **zero keywords and zero Search Console data** can still launch content marketing.

> **Growth Hacker × Master Copywriter in one skill.**
> GH — *demand discovery*: derive the keywords people actually type from `persona × job-to-be-done scenarios`, sidestepping the "no historical data" chicken-and-egg.
> Copywriter — *headline interception*: turn "this person, in this moment, stuck on this problem" into "the title they click right now."

## Where it sits

```
content-strategy-starter (basic info → personas/queries/titles)  ← YOU ARE HERE
  → content-map-builder (rank into a data-driven map)
  → content-pipeline (write & draft)  → content-schedule (when to publish)  → internal-linking (weave the cluster)
```

## What it produces (the 6-step framework)

1. **What kind of site is this** — type, model, positioning, conversion goal.
2. **5 buyer personas** — distinct enough that their search queries don't overlap.
3. **JTBD demand matrix** — per persona: scenario → problem → search trigger → the actual query → funnel stage.
4. **Feature → problem mapping** — which feature solves which persona's problem (find your core vs weak selling points).
5. **Search-intent titles** — headlines that catch the moment of search (copywriter rules built in).
6. **25-topic bank (5 personas × 5 scenarios)** → de-duped, clustered by strategic role → a **seed content map** ready for content-map-builder.

## Run it (one shot)

```js
Workflow({ scriptPath: '~/.claude/skills/content-strategy-starter/scripts/generate_strategy.js',
           args: { business: '<paste your basic brief, or one paragraph about the company/product/service>',
                   market: '台灣繁體中文',  // or 'US English'
                   personas: 5, scenariosEach: 5,
                   outPath: '/tmp/strategy.md' } })
```
Then read `outPath` → strategy doc + 25-topic bank + seed content map. Paste the seed map into **content-map-builder** and continue down the chain.

Or just tell Claude: *"用 content-strategy-starter 幫 `<這個生意>` 規劃一批內容題目。"*

## Files

| File | Purpose |
|---|---|
| `SKILL.md` | The 6-step method (GH + copywriter framing) + rules. |
| `scripts/generate_strategy.js` | The automation — basic info → personas → scenarios → titles → seed map. |
| `templates/business-brief.template.md` | The only input you fill in. |
| `examples/example-strategy.md` | A worked example (fictional pet-food brand, 5 personas × 5 = 25 titles). |

## License

MIT.
