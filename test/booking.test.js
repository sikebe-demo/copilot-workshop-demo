import assert from 'node:assert/strict';
import test from 'node:test';
import { validateBooking } from '../src/booking.js';

test('valid booking has no errors', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-01',
    checkOutDate: '2026-07-03',
    guests: 2,
  });

  assert.deepEqual(errors, []);
});

test('requires guest name and dates', () => {
  const errors = validateBooking({ guests: 1 });

  assert.ok(errors.includes('guestName is required'));
  assert.ok(errors.includes('checkInDate is required'));
  assert.ok(errors.includes('checkOutDate is required'));
});

test('rejects invalid guest count', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-01',
    checkOutDate: '2026-07-03',
    guests: 0,
  });

  assert.ok(errors.includes('guests must be at least 1'));
});