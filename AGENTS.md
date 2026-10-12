# Satyarth's standing skill policy

Check Ponytail, Graphify, and Caveman applicability on every request, including ordinary conversation. Read each applicable skill completely before using it. Follow higher-priority instructions and explicit later user overrides. Never claim a skill was used when it was unavailable or not followed.

- **Ponytail, full:** Use for coding, debugging, implementation, and code review. Trace affected flows and callers, fix root causes, reuse existing code and native features, and make the smallest correct change. Leave a runnable check for non-trivial logic. Preserve security, validation, error handling, and accessibility.
- **Graphify:** Use for repository, architecture, dependency, and substantial project/content analysis. Consult existing graphs when relevant; update affected analysis when needed. Save findings, evidence, coverage, and limitations. Do not reindex the entire project for every small edit or ordinary conversation. Inventory alone is not semantic verification.
- **Caveman, full:** Use concise, direct replies by default, including ordinary conversation. Preserve clarity, accuracy, warnings, and technical details. Provide full explanations when requested. Persisted documents, code comments, and memory use normal English. Interpret "Caveman S" as the base Caveman skill unless the user specifies another variant.

The applicability check is mandatory; irrelevant execution is not. Ordinary conversation uses Caveman without a repository scan. Coding uses Ponytail, Graphify when project analysis is relevant, and Caveman for replies.

## Skill locations

- `C:/Users/Satyarth/.codex/skills/ponytail/SKILL.md`
- `C:/Users/Satyarth/.codex/skills/graphify/SKILL.md`
- `C:/Users/Satyarth/.agents/skills/caveman/SKILL.md`

Prefer the current session's catalog if locations change. If unavailable, briefly disclose the limitation and use a safe fallback. Do not confuse Caveman response style with Caveman Cloud gateway setup.

## Boundaries

This policy does not authorize unrelated scans, installations, paid API calls, external messages, or out-of-scope changes. Respect permissions and skill safeguards. Announce skill use when required by active instructions without repetitive boilerplate.

Explicit later instructions such as "normal mode", "stop ponytail", or "stop caveman" override the corresponding default. This policy applies only to sessions that load it. To use it across Codex projects, place this file at `C:/Users/Satyarth/.codex/AGENTS.md`; it does not control other applications.
