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

test('requires booking input', () => {
  assert.deepEqual(validateBooking(), ['booking is required']);
});

test('requires guest name', () => {
  const errors = validateBooking({
    checkInDate: '2026-07-01',
    checkOutDate: '2026-07-03',
    guests: 1,
  });

  assert.ok(errors.includes('guestName is required'));
});

test('requires check-in and check-out dates', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    guests: 1,
  });

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

test('rejects check-out date on or before check-in date', () => {
  const sameDayErrors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-01',
    checkOutDate: '2026-07-01',
    guests: 2,
  });

  const earlierCheckOutErrors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-03',
    checkOutDate: '2026-07-01',
    guests: 2,
  });

  assert.ok(sameDayErrors.includes('checkOutDate must be after checkInDate'));
  assert.ok(earlierCheckOutErrors.includes('checkOutDate must be after checkInDate'));
});