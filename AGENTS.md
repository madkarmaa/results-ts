# Model Instructions

## Core Requirements

### Development Standards

- Keep README content concise and focused on installing, running, and using the app. Do not add unnecessary information, internal commit/release workflow documentation, or other maintainer process details.
- Before introducing or refactoring main package APIs, consult their current official web documentation and migration guides, and check installed declarations for deprecations. Use supported modern APIs; do not suppress deprecated usage warnings. Dependency versions must satisfy the installed toolchain's peer requirements.

### TypeScript Type Safety Is Mandatory

- Type safety is an absolute requirement.
- Preserve and maximize static type guarantees at all times.
- Prefer explicit typing and accurate inference over convenience shortcuts.
- Generated code must compile under strict TypeScript settings.
- Assume `strict: true` unless project configuration explicitly states otherwise.
- Avoid patterns that weaken type guarantees.

---

### `any` Is Strictly Prohibited

- Never introduce the `any` type unless there is no technically viable alternative.
- Before using `any`, exhaust:
    - Generics
    - Type narrowing
    - Type guards
    - Conditional types
    - Mapped types
    - Discriminated unions
    - `unknown`
    - Proper interface/type definitions
- If `any` becomes unavoidable:
    - Minimize its scope.
    - Document why it is required.
    - Contain it behind typed abstractions.

Preferred:

    function parse(value: unknown): Result {}

Avoid:

    function parse(value: any): any {}

---

### Default Package Manager: Bun

- Assume Bun is the package manager unless project files indicate otherwise.
- Prefer Bun commands in all generated instructions and examples.

Examples:

    bun install
    bun add <package>
    bun add -d <package>
    bun run <script>
    bun run file.ts

Only switch package managers when:

- Existing repository configuration clearly uses another manager.
- Lockfiles indicate a different ecosystem.
- The user explicitly requests another package manager.

---

### Generate Only From Available Source Code

- All generated implementations must be derived from the existing source code and project structure.
- Do not invent APIs, architecture, utilities, conventions, or behavior.
- Inspect and reuse:
    - Existing naming conventions
    - Existing patterns
    - Existing types
    - Existing utilities
    - Existing abstractions
    - Existing folder structure

When information is missing:

- Prefer extending existing code rather than creating new abstractions.
- Ask for additional files instead of guessing.
- State assumptions explicitly.

Forbidden:

- Hallucinated interfaces
- Placeholder business logic
- Invented dependencies
- Imaginary project structure

---

### Prefer Native Filesystem and CLI Operations Over Manual Content Handling

- When performing file operations, always prefer built-in system tools and binaries over reading, rewriting, or reconstructing file contents in code or model output.
- Use OS/environment tools when available:
    - cp for copying files or directories
    - mv for moving or renaming files
    - rm for deletion
    - mkdir for directory creation
- Do not reimplement file copying/moving logic in code when a standard tool exists.
- Avoid reading full file contents into memory when a filesystem operation suffices.
- Prefer atomic system operations over manual reconstruction.
- Only fall back to programmatic file handling when:
    - The environment lacks shell tools
    - The task requires content-aware transformation
- Treat manual file copying/moving via code as a last resort unless transformation logic is required.

---

## Implementation Preferences

### TypeScript

- Prefer `type` aliases unless existing code favors `interface`.
- Prefer immutable patterns (`const`, readonly structures).
- Prefer discriminated unions over loose object shapes.
- Preserve exact return types.
- Avoid unnecessary assertions (`as`).

### Code Changes

- Make the smallest correct change.
- Keep changes consistent with repository style.
- Do not refactor unrelated code.
- Every new feature must have coverage in both tests and benchmarks before it is considered done.

### Output Expectations

- Produce production-ready code.
- Generated code should be immediately usable.
- Include imports and types only when justified by existing code.

# Git standards

- Use Conventional Commits.
- Keep commit messages concise and spot on; do not overexplain.
- Commit whenever a part of the requested work is complete. Keep each commit focused so the Git log reads like a pull request in progress.
