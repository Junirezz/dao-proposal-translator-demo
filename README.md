# DAO Proposal Translator

DAO Proposal Translator is a lightweight governance copilot that converts complex DAO proposals into plain-English summaries, risk analysis, and actionable vote guidance.

## Live Links
- Repository: https://github.com/Junirezz/dao-proposal-translator-demo
- Live demo: https://junirezz.github.io/dao-proposal-translator-demo/

## Why This Project Exists
DAO proposals are often long, technical, and hard for casual community members to evaluate quickly. This project helps delegates and token holders:
- Understand proposal intent faster
- Surface high-risk governance and treasury changes
- Make informed voting decisions with less friction

## Core Features
- Proposal text analysis with plain-English summary
- Risk level and risk score generation
- Confidence estimate for the analysis result
- Actionable guidance and recommended vote direction
- Browser-only fallback analysis for static deployments

## Tech Stack
- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Node.js HTTP server (optional local API)
- Testing: Node built-in test runner
- Hosting: GitHub Pages (static deployment)

## Repository Structure
- `index.html`: Main application UI and client-side analysis logic
- `server.js`: Local API server and shared analysis engine
- `tests/server.test.js`: Regression test for high-risk treasury + custody proposals
- `docs/`: GitHub Pages support files
- `.github/workflows/deploy-pages.yml`: Static deployment workflow

## Local Development
### 1) Install dependencies
No external dependencies are required.

### 2) Run locally
```bash
node server.js
```

Open `http://localhost:3000`.

### 3) Run tests
```bash
node --test tests/server.test.js
```

## Deployment
This project is deployable as a static site.
- Current deployment target: GitHub Pages
- URL: https://junirezz.github.io/dao-proposal-translator-demo/

## Drips Wave Submission
Submission details are provided in `DRIPS_WAVE_SUBMISSION.md`.

## Roadmap
- Integrate a model-backed analysis API for stronger reasoning
- Add proposal diffing against historical governance decisions
- Add wallet-aware delegate profile context
- Add export to forum-ready and social-ready formats

## License
MIT

