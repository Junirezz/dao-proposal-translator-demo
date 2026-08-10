const test = require('node:test');
const assert = require('node:assert/strict');
const { analyzeProposal } = require('../server');

test('detects treasury and custody changes with a high-risk recommendation', () => {
  const result = analyzeProposal('Proposal: Allocate 250,000 USDC from the treasury to fund a new AI governance assistant. The proposal also adds a new multisig signer and changes voting thresholds.');

  assert.equal(result.actionType, 'Treasury + custody');
  assert.match(result.quickTake, /treasury|custody/i);
  assert.ok(result.confidence >= 0.8);
  assert.ok(result.riskScore >= 70);
  assert.equal(result.recommendedAction, 'Vote no or abstain until the treasury and signer changes are clarified.');
  assert.ok(result.highlights.length >= 3);
});
