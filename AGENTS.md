# Copilot Code Review demo guide

This file is intentionally small so it can be read during a live demo. It represents repository-level review expectations for the booking demo.

## Review expectations

- Point out behavior changes that are not covered by `node:test` tests.
- Treat expired offers as ineligible when reviewing `src/discounts.js`.
- Keep public function names unchanged unless the task explicitly asks for an API change.
- For input validation changes in `src/booking.js`, prefer field-specific error messages.
- Ignore formatting-only suggestions unless they hide a real correctness or security issue.

## Demo talking point

Copilot code review can use repository-level `AGENTS.md` instructions when generating review feedback. In this demo repository, the review should focus on behavior, tests, and input validation rather than broad refactoring.
