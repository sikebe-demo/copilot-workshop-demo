import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';

test('report excludes cancelled bookings', () => {
  const result = spawnSync('node', ['src/report.js'], {
    cwd: '/home/runner/work/copilot-workshop-demo/copilot-workshop-demo',
    encoding: 'utf8',
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.includes('Chris Sato'), false);
});
