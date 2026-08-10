const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const root = __dirname;

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function analyzeProposal(text) {
  const lower = (text || '').toLowerCase();
  const hasTreasury = /treasury|budget|fund|grant|allocation/.test(lower);
  const hasMultisig = /multisig|signer|custody/.test(lower);
  const hasGovernance = /governance|voting|quorum|threshold|proposal/.test(lower);
  const hasCommunity = /community|member|onboarding|education/.test(lower);

  const risks = [];
  if (hasTreasury) risks.push('Treasury allocation may affect runway and reserve health.');
  if (hasMultisig) risks.push('Signer changes may increase custody and governance risk.');
  if (hasGovernance) risks.push('Threshold or quorum changes may alter decision dynamics.');
  if (!risks.length) risks.push('No major risk signals were detected in the text.');

  const impact = [];
  if (hasCommunity) impact.push('Community engagement and onboarding may improve.');
  if (hasTreasury) impact.push('The proposal may expand execution capacity or funding access.');
  if (!impact.length) impact.push('The proposal likely affects governance or operations at a moderate level.');

  const highlights = [];
  if (hasTreasury) highlights.push('Treasury movement is explicitly referenced.');
  if (hasMultisig) highlights.push('Custody or signer authority is being changed.');
  if (hasGovernance) highlights.push('Governance mechanics are part of the proposal.');
  if (hasCommunity) highlights.push('Community participation is a stated goal.');
  if (highlights.length < 3) highlights.push('The request is relatively straightforward and should be easy to evaluate.');

  const riskScore = Math.min(100, 45 + (hasTreasury ? 15 : 0) + (hasMultisig ? 20 : 0) + (hasGovernance ? 10 : 0) + (hasCommunity ? 5 : 0));
  const confidence = Math.min(0.99, 0.72 + (riskScore / 200));
  const actionType = hasTreasury && hasMultisig ? 'Treasury + custody' : hasTreasury ? 'Treasury' : hasGovernance ? 'Governance' : 'Community';

  let recommendation = 'Caution: review carefully before voting.';
  let recommendedAction = 'Review the proposal details and discuss the tradeoffs before voting.';
  if (hasTreasury && hasMultisig) {
    recommendation = 'High caution: this proposal combines funding and custody changes.';
    recommendedAction = 'Vote no or abstain until the treasury and signer changes are clarified.';
  } else if (hasCommunity) {
    recommendation = 'Support: the proposal appears constructive for DAO participation.';
    recommendedAction = 'Support the proposal if the scope stays within the stated community goals.';
  }

  return {
    summary: hasTreasury
      ? 'This proposal requests funding or treasury movement and should be reviewed closely.'
      : 'This proposal appears to be a governance or community initiative with moderate implications.',
    riskLevel: hasTreasury && hasMultisig ? 'High' : hasTreasury ? 'Medium' : 'Low',
    risks,
    impact,
    recommendation,
    recommendedAction,
    actionType,
    quickTake: hasTreasury && hasMultisig
      ? 'The proposal touches treasury funds and custody authority, which raises the urgency of the review.'
      : hasTreasury
        ? 'The proposal involves treasury movement and should be weighed carefully.'
        : 'The proposal looks manageable but still deserves a close read.',
    confidence: Number(confidence.toFixed(2)),
    riskScore,
    highlights,
    tags: [
      ...(hasTreasury ? ['Treasury'] : []),
      ...(hasGovernance ? ['Governance'] : []),
      ...(hasCommunity ? ['Community'] : []),
      ...(hasMultisig ? ['Security'] : [])
    ].slice(0, 4)
  };
}

module.exports = { analyzeProposal };

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.css': 'text/css; charset=utf-8'
  };
  const mime = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/analyze') {
    const body = await parseBody(req);
    try {
      const payload = JSON.parse(body);
      const result = analyzeProposal(payload.text || '');
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(result));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
    }
    return;
  }

  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(root, requestPath);
  serveFile(filePath, res);
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
