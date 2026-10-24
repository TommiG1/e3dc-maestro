# Security Policy

## Supported versions

Security fixes are applied to the current `main` / latest release line of E3DC Maestro. Older betas may not receive backports.

## Reporting a vulnerability

Please **do not** open a public Issue for security-sensitive findings.

- Prefer GitHub **[Private vulnerability reporting](https://github.com/TommiG1/hacs-e3dc-maestro/security/advisories/new)** if available, or
- Contact the maintainer via the repository (TommiG1) without posting secrets, tokens, or credentials.

Include: affected version, impact, and steps to reproduce (redacted).

Maestro runs **locally** in Home Assistant and does not require a GlowDash cloud account for core control. Still treat RSCP credentials, HA tokens, and network access carefully.
