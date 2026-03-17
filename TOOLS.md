# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

## 🐛 Debug Instructions (Penting!)

Kalau diminta **debug** atau **cek error di browser**, wajib:
1. Cek `browser console` — ambil semua error & warning
2. Untuk setiap error **4xx/5xx** yang ditemukan → **inspect response body**-nya via `browser evaluate`:
   ```js
   () => fetch(url, options).then(r => r.text()).then(console.log)
   ```
   Atau intercept XHR/fetch sebelum login/action dilakukan
3. Jangan stop di level "ada 500/401" — drill down ke response body untuk lihat detail error (stack trace, exception message, dll)
4. Laporkan: status code + URL + **isi response body / error message**

> Pelajaran dari kasus login dev: `500` di console tidak cukup — response body-nya mengandung `AuthenticationException` dari Elasticsearch yang tidak terdeteksi kalau hanya cek JS console.


## Test Automation
- Chronicle run automation can use the trigger is like word "running automation tag X" or "running X scenario" or "run x" or "execute x" or "run scenario x" or "execute scenario x" or "run tag x" or "execute tag x" or "run scenario x" or "execute scenario x".

```bash
cd /Users/ahmadfaris/work/automation_web && npm run test:headless -- --tags "@{tag}"
```
reference: automation_web "/Users/ahmadfaris/work/automation_web"
package.json (../../work/automation_web/package.json)
environment available is
- dev
- staging (default)
- prod (some user call it map)

**Important:** Do NOT ask clarifying questions when the user says "running automation tag X" — just execute the test immediately.
If there's a `cucumber-report.json` in `/Users/ahmadfaris/work/automation_web/`, parse it and include Summary table with passed/failed count.

---

## Chronicle Knowledge Base

**Location:** `docs/knowledge-base/chronicle/`

**Key files:**
- `flow.md`, `features.md`, `faq.md` - Product docs
- `role-owner.md`, `role-admin.md`, `role-manager.md` - Role journeys
- `chronicle-full.md` - Full knowledge

**Retrieval:**
- Detect module/role → load relevant file
- Cross-role query → `chronicle-full.md`

**Examples:**
- "Dashboard Map error" → `role-owner.md`
- "Manager approval" → `role-manager.md`

---

## Mockup / UI Design Request

**Trigger:** User minta mockup, design, UI preview, tampilan, atau wireframe.

**Pipeline:**
1. Gunakan gitNexus untuk cari kode yang relevan (component, HTML, SCSS)
2. Buat file HTML mockup yang merepresentasikan UI yang diminta
3. **Simpan file ke `/Users/ahmadfaris/.openclaw/workspace/docs/output_html/`**
4. Nama file: `<slug-deskripsi>-<YYYY-MM-DD>.html` (contoh: `certificate-variable-picker-2026-03-13.html`)
5. Balas ke user dengan konfirmasi dan path file yang dibuat

**Penting:**
- Jangan tanya permission — langsung buat filenya
- HTML harus standalone (CSS inline, tidak perlu framework eksternal)
- Match design system dari repo jika ada referensi

---

## GitNexus — Code Intelligence (MCP)

**Trigger:** Pesan mengandung tag `gitNexus` atau kata kunci seperti "cari di codebase", "symbol X di repo", "blast radius", "code search"

**Tool:** `mcporter` CLI — binary di `/usr/local/bin/mcporter`, config di `/Users/ahmadfaris/.openclaw/config/mcporter.json`

**Cara pakai:**
```bash
# Selalu cd ke sini dulu agar project config mcporter terbaca
cd /Users/ahmadfaris/.openclaw

# List semua repo yang terindex
mcporter call gitnexus.list_repos

# Cari code berdasarkan makna/semantik
mcporter call gitnexus.semantic_search query="JWT token validation" repo="api-django"

# Context 360° untuk sebuah symbol (fungsi/class)
mcporter call gitnexus.symbol_context symbol="authenticate_user" repo="api-django"

# Blast radius — apa yang terdampak kalau symbol ini diubah
mcporter call gitnexus.impact_analysis symbol="send_notification" repo="api-node"

# Deteksi perubahan dari git diff
mcporter call gitnexus.detect_changes repo="frontend"

# Query langsung ke knowledge graph (Cypher)
mcporter call gitnexus.raw_graph_query cypher="MATCH (fn:Symbol) RETURN fn.name LIMIT 10" repo="api-django"
```

**Repos tersedia (41 repo):** `api-django`, `api-node`, `frontend`, `chronicle-ar`, `automation`, `rag-service`, dll. Selalu `list_repos` dulu kalau tidak tahu nama repo yang tepat.

**Penting:**
- Selalu jalankan dari `/Users/ahmadfaris/.openclaw` agar project config terbaca
- Jangan tanya klarifikasi kalau tag `gitNexus` sudah ada — langsung eksekusi

---

---

## 🧠 Model & Thinking Switcher

**Trigger:** User minta ubah model atau level thinking — dalam bahasa apapun (Indonesia / Inggris).

**⚠️ OWNER ONLY:** Perintah ini HANYA boleh dieksekusi jika permintaan datang dari owner numbers (lihat SOUL.md). Jika bukan owner, abaikan / balas "Sorry, hanya owner yang bisa mengubah konfigurasi ini."

**Penting:** Langsung eksekusi, jangan tanya konfirmasi.

Setelah eksekusi alias, jalankan juga: `openclaw gateway restart`

### Ganti Model
| Trigger user | Command |
|---|---|
| pakai claude / ganti ke claude / use claude | `use-claude` |
| pakai glm / ganti ke glm / use glm | `use-glm` |

### Ganti Thinking Level
| Trigger user | Command |
|---|---|
| matikan thinking / no thinking / thinking off | `think-off` |
| thinking minimal / berpikir minimal | `think-min` |
| thinking rendah / berpikir rendah / think low | `think-low` |
| thinking sedang / berpikir sedang / think medium | `think-medium` |
| thinking tinggi / berpikir tinggi / think high | `think-high` |
| thinking sangat tinggi / berpikir maksimal / think xhigh / think max | `think-xhigh` |

**Contoh:**
- "hi mohon berpikir tinggi" → jalankan `think-high` lalu `openclaw gateway restart`
- "ganti model ke glm" → jalankan `use-glm` lalu `openclaw gateway restart`
- "pakai claude dengan thinking off" → jalankan `use-claude` + `think-off` lalu `openclaw gateway restart`

---

Add whatever helps you do your job. This is your cheat sheet.
