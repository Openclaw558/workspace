# OpenClaw - Presentasi

copenclaw channels login --channel whatsapp bash
openclaw setup
openclaw onboard --auth-choice zai-api-key
openclaw gateway start
openclaw channels login --channel whatsapp
## Apa Itu OpenClaw?

**OpenClaw** adalah framework AI assistant open-source (MIT license, 60K+ stars di GitHub) yang berjalan di perangkat sendiri (self-hosted). Dibuat oleh Peter Steinberger, sebelumnya dikenal sebagai Clawdbot/Moltbot.

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

Wizard `openclaw onboard` akan memandu setup gateway, workspace, channels, dan skills secara interaktif.

### Build dari Source

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw && pnpm install && pnpm ui:build && pnpm build
pnpm openclaw onboard --install-daemon
```

### Post-install Commands

- `openclaw doctor` - cek konfigurasi
- `openclaw status` - status gateway
- `openclaw dashboard` - buka browser UI

---

## Apa yang Bisa Dilakukan OpenClaw?

### 1. Multi-Channel Messaging

Terhubung ke **WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Teams, WebChat**, dan lainnya. Setup kamu sudah menggunakan **WhatsApp** channel.

### 2. AI Agent dengan Personality

- Punya identity sendiri (nama, vibe, emoji)
- Memory system: daily notes + long-term memory (`MEMORY.md`)
- Bisa "bangun" setiap sesi dan ingat konteks sebelumnya

### 3. Heartbeat & Proactive Actions

- Cek email, calendar, cuaca secara periodik
- Cron jobs untuk jadwal tepat waktu
- Bisa proaktif mengingatkan tanpa diminta

### 4. Skills System

- Modular skills (Notion, camera, SSH, TTS, dll)
- Setup kamu sudah pakai **Notion integration**
- Custom skills bisa ditambahkan

### 5. Custom AI Models

- Tidak terkunci satu provider
- Setup kamu menggunakan **Z.AI** dengan model **GLM-4.7** dan **GLM-5**
- Bisa pakai OpenAI, Anthropic, atau provider lain

### 6. Knowledge Base

- Menyimpan dokumentasi produk (contoh: **Chronicle** - platform manajemen pemakaman digital)
- AI bisa auto-detect keywords dan menjawab berdasarkan knowledge base

### 7. Automation & Workspace

- File management, web search, shell commands
- Browser automation
- Cron scheduling
- Delivery queue system

### 8. Security

- Data tetap lokal, tidak keluar mesin
- Allowlist untuk kontak WhatsApp
- Gateway auth dengan token
- Deny list untuk command berbahaya

---

## Contoh Use Case di Setup Ini

- **WhatsApp bot** dengan allowlist kontak tertentu
- **Knowledge base Chronicle** (cemetery management platform) - AI bisa menjawab pertanyaan tentang fitur, flow, dan FAQ Chronicle
- **Notion integration** untuk productivity
- **Z.AI GLM models** sebagai AI backend (gratis, cost = 0)

---

## Sources

- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Official Site](https://openclaw.ai/)
- [Z.AI Developer Docs](https://docs.z.ai/devpack/tool/openclaw)
- [OpenClaw macOS Installation Guide - Medium](https://medium.com/@fawwazraza2024/openclaw-macos-installation-guide-set-up-a-self-hosted-ai-assistant-from-scratch-6815667ad541)
- [Complete 2026 Tutorial - FoxesSellFaster](https://www.foxessellfaster.com/blog/openclaw-setup-guide-how-i-built-my-own-ai-agent-complete-2026-tutorial/)
