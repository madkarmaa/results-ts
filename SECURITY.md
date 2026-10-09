# Security policy

## Supported versions

Only the latest version of `results-ts` receives security fixes.

## Reporting a vulnerability

Report vulnerabilities through [GitHub's private vulnerability reporting](https://github.com/madkarmaa/results-ts/security/advisories/new). Do not open a public issue.

Include:

- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes, if you have them

Expect an acknowledgement within 72 hours and a resolution or status update within 7 days.

## Scope

`results-ts` has no runtime dependencies. The library does not access the network or file system. Its methods can invoke callbacks supplied by the caller.
