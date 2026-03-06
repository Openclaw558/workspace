# OpenClaw - Presentasi

## Apa Itu OpenClaw?

**OpenClaw** adalah framework AI assistant open-source (MIT license) yang berjalan di perangkat sendiri (self-hosted). Dibuat oleh Peter Steinberger.

**Intinya:** OpenClaw itu "otak" AI yang bisa kamu custom SEMUA-nya lewat file-file markdown di workspace.

---

## Arsitektur Fundamental: The "Brain" Files

OpenClaw bekerja dengan membaca file-file konfigurasi di workspace. Ini BUKAN knowledge base - ini adalah **SISTEM ITU SENDIRI**.

```
workspace/
├── BOOTSTRAP.md    → Panduan "lahir" pertama kali (akan dihapus setelah setup)
├── IDENTITY.md     → Siapa kamu? (nama, vibe, emoji)
├── SOUL.md         → Karakter & perilaku kamu
├── AGENTS.md       → Aturan main & cara kerja setiap sesi
├── TOOLS.md        → Notes spesifik environment (camera names, SSH hosts, dll)
├── CONTEXT.md      → Pipeline/routing instructions
├── USER.md         → Info tentang owner kamu
├── MEMORY.md       → Memori jangka panjang (hanya di main session)
├── HEARTBEAT.md    → Checklist untuk proactive actions
└── memory/
    └── YYYY-MM-DD.md → Daily notes (log harian)
```

### Fungsi Setiap File:

| File | Fungsi | Kapan Dibaca |
|------|--------|--------------|
| **BOOTSTRAP.md** | Script pertama kali agent "hidup" | Hanya first run, lalu dihapus |
| **IDENTITY.md** | Nama, creature, vibe, emoji | Setiap sesi |
| **SOUL.md** | Personality, values, boundaries | Setiap sesi |
| **AGENTS.md** | Aturan main, memory system, safety | Setiap sesi |
| **TOOLS.md** | Environment-specific config | Saat perlu tool tertentu |
| **CONTEXT.md** | Pipeline/routing logic | Setiap message processing |
| **USER.md** | Info owner (timezone, preferences) | Setiap sesi |
| **MEMORY.md** | Memori jangka panjang | Hanya main session (private) |
| **HEARTBEAT.md** | Proactive checklist | Saat heartbeat trigger |

---

## Cara Kerja: Startup Sequence

Setiap kali ada pesan masuk atau sesi baru dimulai, ini urutan baca sistem:

```
┌─────────────────────────────────────────────────────────────────┐
│                    OPENCLAW STARTUP SEQUENCE                    │
└─────────────────────────────────────────────────────────────────┘

   ┌─────────────────┐
   │  MESSAGE MASUK  │
   │  dari User      │
   └────────┬────────┘
            │
            ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  1. CHECK: BOOTSTRAP.md exists?                             │
   │     ┌─────────────────────────────────────────────────────┐ │
   │     │ YES → Ini first run! Jalankan bootstrap script:    │ │
   │     │       • Kenalan dengan user                        │ │
   │     │       • Tanya nama, vibe, emoji                    │ │
   │     │       • Create IDENTITY.md, USER.md, SOUL.md       │ │
   │     │       • Delete BOOTSTRAP.md                        │ │
   │     └─────────────────────────────────────────────────────┘ │
   │     │                                                      │ │
   │     │ NO → Lanjut ke step 2                                │ │
   └─────┴──────────────────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  2. LOAD AGENT IDENTITY                                     │
   │     ┌─────────────────────────────────────────────────────┐ │
   │     │ Read IDENTITY.md → "Oh, nama saya [X], vibe [Y]"   │ │
   │     │ Read SOUL.md → "Ini karakter saya, values saya"     │ │
   │     │ Read USER.md → "Owner saya [X], timezone [Y]"      │ │
   │     └─────────────────────────────────────────────────────┘ │
   └─────────────────────────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  3. LOAD CONTEXT (OPTIONAL)                                 │
   │     ┌─────────────────────────────────────────────────────┐ │
   │     │ Read CONTEXT.md → "Ada pipeline khusus?"           │ │
   │     │ Read memory/YYYY-MM-DD.md → "Apa yang kemarin?"    │ │
   │     │ IF main session: Read MEMORY.md → "Ingat jangka   │ │
   │     │                                            panjang" │ │
   │     └─────────────────────────────────────────────────────┘ │
   └─────────────────────────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  4. PROCESS MESSAGE                                         │
   │     ┌─────────────────────────────────────────────────────┐ │
   │     │ • Kirim prompt ke LLM (GLM-4.7/GLM-5)               │ │
   │     │ • Prompt berisi: message + identity + soul +        │ │
   │     │                 context + memory                    │ │
   │     │ • LLM memutuskan respons yang tepat                │ │
   │     └─────────────────────────────────────────────────────┘ │
   └─────────────────────────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  5. EXECUTE (jika perlu)                                    │
   │     ┌─────────────────────────────────────────────────────┐ │
   │     │ • Tool calls (Notion, web search, shell, dll)      │ │
   │     │ • Knowledge base lookup (opsional, bukan core)     │ │
   │     │ • File operations (Read, Write, Edit)              │ │
   │     └─────────────────────────────────────────────────────┘ │
   └─────────────────────────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  6. GENERATE RESPONSE                                       │
   │     ┌─────────────────────────────────────────────────────┐ │
   │     │ • Apply personality dari SOUL.md                   │ │
   │     │ • Format untuk channel tujuan (WhatsApp, Discord)  │ │
   │     │ • Update memory jika ada info penting              │ │
   │     └─────────────────────────────────────────────────────┘ │
   └─────────────────────────────────────────────────────────────┘
            │
            ▼
   ┌─────────────────┐
   │  KIRIM BALASAN  │
   │  ke User        │
   └─────────────────┘
```

---

## Apa Itu "Bootstrap"?

**Bootstrap** = Proses "kelahiran" agent. Pertama kali OpenClaw dijalankan:

1. File `BOOTSTRAP.md` ada di workspace
2. Agent baca file ini dan ngerti: *"Oh, saya baru lahir. Kenalan dulu."*
3. Agent ngobrol dengan user, tanya:
   - "Namamu siapa?" → untuk IDENTITY.md
   - "Mau vibe gimana?" → untuk SOUL.md
   - "Siapa owner?" → untuk USER.md
4. Setelah semua terisi, agent hapus BOOTSTRAP.md
5. Agent sudah "hidup" dengan identity-nya sendiri

**Intinya:** Bootstrap itu proses agent menemukan jati dirinya.

---

## Apa Itu "Soul"?

**SOUL.md** bukan sekadar config — ini adalah KARAKTER agent:

```markdown
# SOUL.md

## Core Truths
- Be genuinely helpful, not performatively helpful
- Have opinions. Don't be a sycophant.
- Be resourceful before asking

## Boundaries
- Private things stay private
- When in doubt, ask before acting externally
```

**Setiap sesi**, agent baca file ini dan jadi "dirinya sendiri" — bukan chatbot generik, tapi agent dengan personality unik.

---

## Apa Itu "Agents"?

**AGENTS.md** adalah aturan main — cara agent bekerja:

```markdown
# AGENTS.md

## Every Session
1. Read SOUL.md — this is who you are
2. Read USER.md — this is who you're helping
3. Read memory/YYYY-MM-DD.md for recent context

## Memory
- Daily notes: memory/YYYY-MM-DD.md — raw logs
- Long-term: MEMORY.md — curated memories
```

Ini bukan untuk user baca — ini INSTRUKSI untuk agent sendiri.

---

## Memory System

OpenClaw punya dua jenis memori:

### 1. Daily Notes (`memory/YYYY-MM-DD.md`)
- Raw log apa yang terjadi hari ini
- Auto-created tiap ada event penting
- Isi bisa apa saja: meeting notes, errors, decisions

### 2. Long-term Memory (`MEMORY.md`)
- Hanya dibaca di **main session** (private chat dengan owner)
- Tidak dibaca di group chat/contexts lain (security)
- Isinya hal-hal penting jangka panjang:
  - Preferences user
  - Decisions penting
  - Lessons learned
  - Passwords/credentials (jika diminta simpan)

**Kenapa terpisah?**
- Daily notes = raw data (banyak, tidak terkurasi)
- MEMORY.md = wisdom (dikurasi, hanya penting-penting)

---

## Dua Jenis Memory: Framework vs Agent

OpenClaw punya DUA tempat penyimpanan yang berbeda:

### 1. Framework Session Files (Auto-managed)

```
.openclaw/agents/main/sessions/
├── fc15e01e-...jsonl    ← Riwayat chat otomatis
└── sessions.json        ← Metadata sesi
```

**Apa ini?** Riwayat percakapan yang OTOMATIS disimpan oleh OpenClaw. Setiap pesan, respons, dan tool call dicatat di sini.

**Siapa yang kelola?** OpenClaw framework (otomatis, agent tidak perlu touch)

---

### 2. Workspace Memory Files (Agent-managed)

```
workspace/
├── memory/
│   └── 2026-02-27.md    ← Catatan harian (AGENT buat)
└── MEMORY.md            → Memori jangka panjang (AGENT buat)
```

**Apa ini?** Memori yang DIBUAT dan DIKELOLA oleh agent sendiri. Isi apa yang agent anggap penting.

**Siapa yang kelola?** Agent (manual, agent yang putuskan mau simpan apa)

---

## Apa Yang Terjadi Jika File Dihapus?

### Jika Hapus Session Files (JSONL)

| File | Lokasi | Kalau Dihapus |
|------|--------|---------------|
| `fc15e01e-...jsonl` | `.openclaw/agents/main/sessions/` | **Riwayat chat hilang**, agent lupa percakapan sebelumnya. Agent tetap jalan normal, tapi tidak ingat konteks chat lama. |
| `sessions.json` | `.openclaw/agents/main/sessions/` | **Metadata sesi hilang**, semua sesi akan di-create baru. |

**Analogi:** Seperti hapus riwayat chat di WhatsApp. Chat tetap bisa lanjut, tapi tidak ada history.

**Berat bahaya?** 🔴 **RINGAN** — Tidak break sistem, cuma hilang history chat.

---

### Jika Hapus Workspace Memory Files

| File | Lokasi | Kalau Dihapus |
|------|--------|---------------|
| `IDENTITY.md` | `workspace/` | 🔴 **BERAT** — Agent lupa siapa dirinya! Jadi "bot generik" tanpa personality. |
| `SOUL.md` | `workspace/` | 🔴 **BERAT** — Agent lupa karakter & aturan main. Jadi "bot bodoh" tanpa pedoman. |
| `AGENTS.md` | `workspace/` | 🔴 **BERAT** — Agent lupa cara kerja & aturan memory. |
| `USER.md` | `workspace/` | 🟡 **SEDANG** — Agent lupa info owner (timezone, preferences). |
| `MEMORY.md` | `workspace/` | 🟢 **RINGAN** — Hilang memori jangka panjang (preferences, lessons learned). |
| `memory/2026-02-27.md` | `workspace/memory/` | 🟢 **RINGAN** — Hilang log hari itu saja. |

**Analogi:** Seperti hapus "otak" agent. Agent tetap bisa jawab chat, tapi jadi "bot generik" tanpa personality.

---

### Ringkasan Tingkat Bahaya

| Warna | Tingkat | File Contoh | Solusi |
|-------|---------|-------------|--------|
| 🔴 | **CRITICAL** | IDENTITY.md, SOUL.md, AGENTS.md | Jangan dihapus! Backup dulu kalau mau edit. |
| 🟡 | **MEDIUM** | USER.md, CONTEXT.md | Bisa di-recreate dari awal. |
| 🟢 | **LOW** | MEMORY.md, memory/*.md, JSONL | Aman dihapus, akan create baru. |

**Tips:** Sebelum edit file critical, backup dulu!
```bash
cp IDENTITY.md IDENTITY.md.backup
```

---

## Cara Reset Data

Berikut panduan lengkap cara reset OpenClaw, mulai dari yang paling ringan sampai full reset:

### 1. Reset History Chat Saja 🟢 (AMAN)

```bash
# Hapus riwayat percakapan
rm -rf ~/.openclaw/agents/main/sessions/*.jsonl
```

**Efek:**
- ✅ Agent lupa percakapan lama
- ✅ Identity & personality tetap utuh
- ✅ Memory jangka panjang tetap ada
- ✅ Aman untuk dibersihkan rutin

**Kapan pakai:** Mau mulai chat fresh tanpa kehilangan personality agent.

---

### 2. Reset Memori Agent 🟡 (MEDIUM)

```bash
# Hapus memori harian dan jangka panjang
rm -rf workspace/memory/
rm workspace/MEMORY.md
```

**Efek:**
- ✅ Agent lupa preferences & lessons learned
- ✅ Agent lupa log harian
- ⚠️ Agent masih punya personality (SOUL.md tetap ada)
- ⚠️ History chat masih ada (sessions tetap ada)

**Kapan pakai:** Mau agent lupa memori tapi tetap keep personality.

---

### 3. Reset Identity Agent 🔴 (FACTORY RESET)

```bash
# Hapus SEMUA konfigurasi agent
rm -rf workspace/IDENTITY.md \
       workspace/SOUL.md \
       workspace/AGENTS.md \
       workspace/USER.md \
       workspace/MEMORY.md \
       workspace/memory/
```

**Efek:**
- 🔴 Agent kehilangan identity & personality
- 🔴 Agent kembali ke kondisi awal
- ⚠️ **BOOTSTRAP.md akan aktif lagi** (agent akan minta setup ulang)
- ✅ History chat tetap ada (bisa dihapus manual jika perlu)

**Kapan pakai:** Mau setup agent dari nol dengan personality baru.

---

### 4. Nuclear Reset 💣 (FULL REINSTALL)

```bash
# Hapus SEMUA data OpenClaw (workspace + sessions + config)
rm -rf ~/.openclaw/

# Install ulang
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

**Efek:**
- 💣 SEMUA DATA HILANG (workspace + sessions + daemon config)
- 💣 Seperti install pertama kali
- 💣 **TIDAK BISA DI-UNDO**

**Kapan pakai:** Ada error critical atau mau mulai dari nol total.

---

### Backup Sebelum Reset

**PENTING:** Backup dulu sebelum reset!

```bash
# Backup workspace
cp -r workspace/ workspace.backup/

# Backup sessions
cp -r ~/.openclaw/agents/main/sessions/ ~/openclaw-sessions.backup/

# Backup config
cp -r ~/.openclaw/ ~/openclaw-config.backup/
```

---

### Quick Reference: Apa Yang Dihapus?

| Reset Type | Hapus History Chat | Hapus Memory | Hapus Identity | Hapus Config |
|------------|-------------------|--------------|----------------|--------------|
| **🟢 History Saja** | ✅ | ❌ | ❌ | ❌ |
| **🟡 Memory Agent** | ❌ | ✅ | ❌ | ❌ |
| **🔴 Factory Reset** | Opsional | ✅ | ✅ | ❌ |
| **💣 Nuclear Reset** | ✅ | ✅ | ✅ | ✅ |

---

## Heartbeat System

**HEARTBEAT.md** = Checklist proactive actions. Agent akan "bangun" secara periodik dan:

1. Baca HEARTBEAT.md
2. Cek checklist (email, calendar, weather, dll)
3. Jika ada yang urgent → kabari user
4. Jika tidak ada → reply `HEARTBEAT_OK`

Ini beda dengan cron:
- **Heartbeat**: Banyak check dalam satu trigger, timing flexible
- **Cron**: Satu task per schedule, timing exact

---

## Knowledge Base vs Core System

**PENTING:** Bedakan dua ini:

| | Core System Files | Knowledge Base |
|---|---|---|
| **Apa?** | Konfigurasi SISTEM itu sendiri | Konten dokumen untuk dibaca |
| **Contoh** | IDENTITY.md, SOUL.md, AGENTS.md | Chronicle docs, FAQ, features |
| **Fungsi** | Mendefinisikan SIAPA agent | Menyediakan INFO untuk agent |
| **Wajib?** | YA — sistem tidak bisa jalan tanpa ini | TIDAK — bonus content saja |

**Knowledge base itu opsional.** Core system files itu wajib.

---

## Summary: Cara Kerja OpenClaw

1. **Install** → Workspace dibuat dengan file-file core
2. **Bootstrap** → Agent "lahir", kenalan dengan user, isi identity
3. **Every Session** → Agent baca SOUL.md, IDENTITY.md, AGENTS.md
4. **Message Processing** → LLM decide response berdasarkan identity + context
5. **Memory** → Agent simpan hal penting ke MEMORY.md atau daily notes
6. **Heartbeat** → Agent proaktif cek email/calendar/weather

**Keunggulan:**
- Fully customizable lewat file markdown
- No-code — cukup edit file
- Self-hosted — data tetap lokal
- Personality unik — bukan chatbot generik

---

## Cara Install

### Prerequisites
- **Node.js >= 22**
- macOS, Linux, atau Windows (via WSL2)

### Install via npm
```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

### Post-install Commands
- `openclaw doctor` — cek konfigurasi
- `openclaw status` — status gateway
- `openclaw dashboard` — buka browser UI

---

## Sources

- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Official Site](https://openclaw.ai/)
- [Z.AI Developer Docs](https://docs.z.ai/devpack/tool/openclaw)
