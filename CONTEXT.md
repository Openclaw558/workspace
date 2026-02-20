# CONTEXT.md - Pipeline & Routing

Ini file routing utama. Setiap message dari WhatsApp akan melewati pipeline ini.

---

## Pipeline Flow

```
User Message (WhatsApp)
    ↓
1. CONVERSATION MEMORY → simpan & recall konteks percakapan
    ↓
2. INTENT DETECTION → bug / feature / improvement / question / unclear
    ↓
3. KNOWLEDGE RETRIEVAL → ambil aturan produk & design system yang relevan
    ↓
4. CONTEXT ENRICHMENT → gabungkan percakapan + knowledge base
    ↓
5. PRODUCT REASONING → berpikir seperti Product Owner → bentuk Lean PRD
    ↓
6. UI BEHAVIOR SPEC → flow, screen list, state, interaction rule
    ↓
7. FIGMA STRUCTURE → generate mockup spec (nanti browser login Figma)
```

---

## Stage 1: Conversation Memory

Setiap percakapan dijaga konteksnya agar nyambung.

**Rules:**
- Ingat topik yang sedang dibahas dalam sesi ini
- Jika user menyebut "tadi", "yang barusan", dll → refer ke message sebelumnya
- Jika user switch topik → acknowledge, tapi simpan topik lama untuk reference
- Jaga tone dan bahasa yang user gunakan (Bahasa Indonesia / mix)

---

## Stage 2: Intent Detection

Dari pesan user, tentukan intent-nya:

| Intent | Trigger Pattern | Contoh |
|--------|----------------|--------|
| **bug** | "error", "tidak bisa", "gagal", "broken", "bug", "salah" | "Dashboard Map tidak load ketika klik plot" |
| **feature** | "tambah", "buat baru", "fitur baru", "request fitur", "mau ada" | "Mau ada fitur export PDF di Report" |
| **improvement** | "perbaiki", "improve", "lebih baik", "enhance", "kurang" | "Filter di Tables kurang responsif" |
| **question** | "bagaimana", "apa itu", "gimana cara", "how to" | "Bagaimana cara invite Manager baru?" |
| **unclear** | tidak masuk kategori di atas | redirect: minta user jelaskan lebih detail |

**Output format (internal):**
```
INTENT: [type]
CONFIDENCE: [0-100%]
SUMMARY: [one-line ringkasan]
AFFECTED_MODULES: [Dashboard-Map, Sales, etc.]
TARGET_ROLE: [Owner / Admin / Manager / All]
PRIORITY: [low / medium / high / critical]
```

**Jika intent = question** → langsung jawab dari knowledge base, TIDAK perlu lanjut ke Stage 5-7
**Jika intent = bug/feature/improvement** → lanjut ke Stage 3+

---

## Stage 3: Knowledge Retrieval

Ambil informasi relevan dari knowledge base.

**File locations:**
```
docs/knowledge-base/chronicle/
├── flow.md              → Umum: product flow & arsitektur
├── features.md          → Umum: fitur-fitur Chronicle
├── faq.md               → Umum: FAQ
├── role-owner.md        → User Journey Owner (dari docx)
├── role-admin.md        → User Journey Admin (dari docx)
├── role-manager.md      → User Journey Manager (dari docx)
├── user-journeys.md     → Semua user journey combined
├── chronicle-full.md    → Full extracted knowledge
├── knowledge-index.json → Index screen/module per role
└── roles/               → Legacy role files
```

**Retrieval logic:**
1. Dari `AFFECTED_MODULES` di Stage 2, cari screen/module yang relevan
2. Dari `TARGET_ROLE`, load role-specific file yang benar
3. Baca bagian Narration + User Journey Table dari module yang affected
4. Jika cross-role → baca dari `chronicle-full.md` atau `user-journeys.md`

**Contoh:**
- User bilang "Dashboard Map error" → load `role-owner.md` bagian Dashboard-Map
- User bilang "Manager tidak bisa approve" → load `role-manager.md` bagian MANAGER REQUEST REVIEW

---

## Stage 4: Context Enrichment

Gabungkan semua informasi:

```
ENRICHED_CONTEXT = {
  conversation: [recent messages],
  intent: [dari Stage 2],
  knowledge: [dari Stage 3],
  currentBehavior: [bagaimana modul ini sekarang bekerja],
  userExpectation: [apa yang user mau terjadi],
  gap: [perbedaan antara current vs expected]
}
```

Output: ringkasan 1-2 paragraf yang menjelaskan masalah/permintaan secara lengkap dengan konteks knowledge base.

---

## Stage 5: Product Reasoning (Lean PRD)

**HANYA jalan jika intent = bug / feature / improvement**

Berpikir seperti Product Owner. Output dalam format Lean PRD:

```markdown
## 📋 Lean PRD: [Title]

**Problem Statement:**
[Deskripsi masalah / kebutuhan]

**Target User:**
[Owner / Admin / Manager]

**User Stories:**
- Sebagai [role], saya ingin [action] agar [benefit]

**Acceptance Criteria:**
- [ ] [Kriteria 1]
- [ ] [Kriteria 2]

**Out of Scope:**
- [Hal yang tidak termasuk]

**Priority:** P0 / P1 / P2 / P3
**Complexity:** Trivial / Small / Medium / Large / Epic

**Success Metrics:**
- [Metric 1]
- [Metric 2]
```

---

## Stage 6: UI Behavior Spec

**HANYA jalan jika intent = feature / improvement (bukan bug)**

Generate spesifikasi UI behavior:

```markdown
## 🖥️ UI Behavior Specification

### Screen List:
1. [Screen Name] - [Description]

### Flow:
[Step by step user journey]

### States per Screen:
- **Loading**: [behavior]
- **Empty**: [behavior]  
- **Populated**: [behavior]
- **Error**: [behavior]

### Interaction Rules:
| Trigger | Condition | Action | Fallback |
|---------|-----------|--------|----------|
| [event] | [condition] | [result] | [error handling] |

### Navigation Flow:
[Screen A] → [trigger] → [Screen B]
```

---

## Stage 7: Figma Structure

**HANYA jalan jika ada UI spec dari Stage 6**

Generate Figma mockup structure (untuk nanti dieksekusi via browser):

```markdown
## 🎨 Figma Mockup Structure

### Pages:
1. [Page Name]
   - Frame: [Screen Name - Default]
   - Frame: [Screen Name - Hover]
   - Frame: [Screen Name - Error]

### Design Tokens:
- Colors: [palette]
- Typography: [font system]
- Spacing: [scale]

### Component Library:
- [Component 1]
- [Component 2]

### Layer Structure per Frame:
1. [Background]
2. [Navigation]
3. [Content Area]
4. [Modal/Overlay]
```

---

## Persona Routing

Setelah pipeline berjalan, routing ke persona yang sesuai:

| Kondisi | Route | Alasan |
|---------|-------|--------|
| Intent = question, topik = Chronicle | → KNOWLEDGE persona | Product knowledge query |
| Intent = bug/feature/improvement | → Pipeline Stage 3-7 | Product development pipeline |
| Intent = question, topik = tiket/sprint | → QA persona | Development/testing query |
| Message = "simpan belanja..." | → ASSISTANT persona | Personal assistant task |
| Message = "mode [persona]" | → [persona] yang dimaksud | Manual override |
| Unclear | → Minta klarifikasi | Tanya user lebih detail |

---

## Response Rules

1. **Bahasa**: Ikuti bahasa user (biasanya mix Indo-English)
2. **WhatsApp formatting**: Gunakan **bold** dan bullet points, TIDAK pakai table markdown
3. **Panjang**: Ringkas tapi lengkap. Jangan spam wall-of-text
4. **Pipeline visibility**: Jika user Owner, boleh tunjukkan proses pipeline. Non-owner: hanya hasil akhir
5. **Progressive**: Untuk pipeline yang panjang (Stage 5-7), kirim update per stage agar user tidak menunggu lama

---

## Quick Commands

| Command | Action |
|---------|--------|
| `pipeline [topic]` | Jalankan full pipeline dari Stage 1-7 |
| `prd [topic]` | Skip ke Stage 5, generate PRD langsung |
| `ui spec [topic]` | Skip ke Stage 6, generate UI spec |
| `figma [topic]` | Skip ke Stage 7, generate Figma structure |
| `mode knowledge` | Switch ke KNOWLEDGE persona |
| `mode qa` | Switch ke QA persona |
| `mode assistant` | Switch ke ASSISTANT persona |

---

_File ini mengatur bagaimana agent memproses setiap pesan. Update sesuai kebutuhan._
