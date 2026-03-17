# OpenClaw Workspace

OpenClaw workspace untuk AI agent management & automation.

## 📁 Struktur

```
workspace/
├── 📄 SOUL.md              # AI personality & security rules
├── 📄 IDENTITY.md          # Identity configuration
├── 📄 USER.md              # User configuration
├── 📄 AGENTS.md            # Available agents info
├── 📄 TOOLS.md             # Available tools info
├── 📄 BOOTSTRAP.md         # Bootstrap instructions
├── 📄 HEARTBEAT.md         # Health monitoring
│
├── 📂 docs/                # Documentation
│   ├── knowledge-base/     # Public knowledge base
│   │   └── chronicle/      # Chronicle product docs
│   ├── persona/            # AI persona configs
│   └── openclaw-presentation.md
│
├── 📂 scripts/             # Utility scripts
│   └── extract-docx.py     # DOCX extraction tool
│
├── 📂 automation/          # Automation configs
├── 📂 backup/              # Backup files
├── 📂 logs/                # System logs
├── 📂 memory/              # AI memory storage
└── 📂 plan/                # Planning files
```

## 🔑 Core Files

### SOUL.md
Defines AI agent personality, behavior, and security rules.

**Key sections:**
- Core truths & boundaries
- Security & access control (owner-only)
- Response style (pantun + helpful)
- Pipeline instructions

### IDENTITY.md
AI agent identity configuration.

### USER.md
User-specific settings and preferences.

## 📚 Documentation

### Public Documentation
Location: `docs/knowledge-base/`

**Accessible to all:**
- Chronicle product documentation
- Feature guides
- FAQs

### Internal Documentation
Location: Root files (`SOUL.md`, `AGENTS.md`, etc.)

**Owner-only access** - Contains internal system details.

## 🔒 Security Model

**Simple & strict:**
- **Owner** (`+6289661619359`) → Full access to everything
- **Non-owner** → Public docs only (`docs/knowledge-base/`)

No complex configs. Security enforced by agent code reading `SOUL.md`.

## 🛠️ Scripts

### extract-docx.py
Utility untuk extract content dari DOCX files.

```bash
python3 scripts/extract-docx.py <file.docx>
```

## 🤖 Automation

Location: `automation/`

Contains automation configurations dan test scenarios.

## 💾 Backups

Location: `backup/`

Backup files untuk configuration changes.

## 📝 Logs

Location: `logs/`

System logs untuk monitoring & debugging.

## 🧠 Memory

Location: `memory/`

AI agent persistent memory storage.

## 🎯 Quick Links

- **Add knowledge:** Edit files in `docs/knowledge-base/chronicle/`
- **Update AI behavior:** Edit `SOUL.md`
- **View logs:** Check `logs/` folder
- **Backups:** Check `backup/` folder

## ⚙️ Configuration

Main config: `~/.openclaw/openclaw.json`
Workspace config: Files in workspace root (`SOUL.md`, `IDENTITY.md`, etc.)

---

**Owner:** Ahmad Faris (`+6289661619359`)
**Last updated:** 2026-03-06
