# Drips Wave Submission: DAO Proposal Translator

## Project Name
DAO Proposal Translator

## One-Liner
An AI-assisted governance copilot that turns complex DAO proposals into plain-English insights, risk signals, and vote guidance.

## Repository
https://github.com/Junirezz/dao-proposal-translator-demo

## Live Demo
https://junirezz.github.io/dao-proposal-translator-demo/

## Problem
DAO governance participation suffers when proposals are too dense, technical, or time-consuming to evaluate. Many voters skip proposals or vote with limited understanding.

## Solution
DAO Proposal Translator ingests proposal text and produces:
- A concise plain-English summary
- Risk level and risk score
- Key risk factors
- Why-it-matters impact notes
- Actionable recommended vote guidance

## Who It Helps
- DAO token holders
- Delegates and governance contributors
- Community managers who need explainable summaries

## What Is Built
- Frontend app for input + analysis display
- Shared analysis engine
- Optional local backend API
- Static-site compatible deployment
- Regression test for high-risk treasury/custody scenarios

## Technical Overview
- Frontend: HTML/CSS/JS
- Backend: Node.js HTTP server (`server.js`)
- Hosting: GitHub Pages
- Tests: Node native test runner

## Current Status
- Working MVP
- Public source repository
- Public live demo URL
- Local test coverage for core risk path

## Milestones
- Milestone 1 (complete): Functional proposal analysis and output cards
- Milestone 2 (complete): Public deployment and repository packaging
- Milestone 3 (next): Model-backed analysis and stronger explainability signals
- Milestone 4 (next): Governance-platform connectors and proposal history context

## Verification Steps
1. Open the live demo URL.
2. Load sample proposal.
3. Confirm output includes summary, risk level, score, guidance, and vote recommendation.
4. Run local tests:
   - `npm test`

## Submission Checklist
- [x] Public repository
- [x] Live demo
- [x] Clear README
- [x] License
- [x] Reproducible local run steps
- [x] Basic automated test

## Contact
Project owner: Junirezz
