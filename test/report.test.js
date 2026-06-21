import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import bookings from '../data/bookings.json' with { type: 'json' };

test('report excludes cancelled bookings', () => {
  const result = spawnSync('node', ['src/report.js'], { encoding: 'utf8' });
  const output = result.stdout;
  const cancelledBookings = bookings.filter((booking) => booking.isCancelled);
  const activeBookings = bookings.filter((booking) => !booking.isCancelled);

  assert.equal(result.status, 0);
  assert.ok(activeBookings.length > 0);
  for (const booking of activeBookings) {
    assert.ok(output.includes(booking.guestName));
  }
  for (const booking of cancelledBookings) {
    assert.ok(!output.includes(booking.guestName));
  }
});
