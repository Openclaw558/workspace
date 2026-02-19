saya ingin melakukan flow seperti ini

saya ingin membuat sistem ai automation.
flowmya seperti ini jadi user input chat lalu dia saling bercakap. ketika end session maka sistem akan olah percakapan tadi berdasarkan source of truth yang nantinya akan berupa report ke database notion dalam bentuk tiket yang nantinya output tiket tsb lanjut di olah untuk ke figma make untuk membuat mock up ui setelah jadi nanti mockup ui tsb taruh di section design pada notion


Tujuan kamu:
Dari percakapan → otomatis jadi UI mockup yang tetap konsisten dengan produk.

Maka ringkasan flow yang benar adalah:

User
→ Conversation Memory (jaga konteks percakapan tetap nyambung)
→ Intent Detection (bug / feature / improvement)
→ Knowledge Retrieval (ambil aturan produk & design system yang relevan saja)
→ Context Enrichment (gabungkan percakapan + knowledge base)
→ Product Reasoning (agent berpikir seperti Product Owner → bentuk Lean PRD)
→ UI Behavior Spec (flow, screen list, state, interaction rule)
→ Figma Structure (generate mockup sesuai design system nanti set login dari browser pakai akun yang saya miliki)



doc knowledge base /Users/ahmadfaris/Downloads/User Journey - Intern Task - Chronicle (1).docx
figma login
design@chronicle.rip
ZnrokU^5m@E0n#&$