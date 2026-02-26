# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## Test Automation

When the user sends a message matching "running automation tag {tags}" or "running {scenario} scenario":

1. Extract the tag(s) from the message. Examples:
   - "running automation tag sales" → `@sales`
   - "running automation tag sales-unpaid" → `@sales-unpaid`
   - "running sales scenario" → `@sales`
   - "running automation tag smoke,regression" → `@smoke,@regression`

2. Run the test command:
   ```bash
   cd /Users/ahmadfaris/work/automation_web && npm run test:headless -- --tags "@{tag}"
   ```

3. Reply with the result:
   - If exit code 0: "✅ Test passed! Tag: @{tag}"
   - If exit code non-zero: "❌ Test failed! Tag: @{tag}"
   - Include a summary from `cucumber-report.json` if it exists (total scenarios, passed, failed, failed scenario names)

4. If there's a `cucumber-report.json` in `/Users/ahmadfaris/work/automation_web/`, parse it and include:
   - Total scenarios count
   - Passed/failed count
   - Names of failed scenarios (if any)

**Important:** Do NOT ask clarifying questions when the user says "running automation tag X" — just execute the test immediately.

---

Add whatever helps you do your job. This is your cheat sheet.
