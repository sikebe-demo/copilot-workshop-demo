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

  assert.ok(errors.includes('guestName must be provided'));
  assert.ok(errors.includes('checkInDate must be provided'));
  assert.ok(errors.includes('checkOutDate must be provided'));
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

test('rejects checkOutDate before checkInDate', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-05',
    checkOutDate: '2026-07-03',
    guests: 2,
  });

  assert.ok(errors.includes('checkOutDate must be after checkInDate'));
});

test('rejects checkOutDate equal to checkInDate', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-03',
    checkOutDate: '2026-07-03',
    guests: 2,
  });

  assert.ok(errors.includes('checkOutDate must be after checkInDate'));
});

test('rejects negative guest count', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-01',
    checkOutDate: '2026-07-03',
    guests: -1,
  });

  assert.ok(errors.includes('guests must be at least 1'));
});

test('rejects non-integer guest count', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-01',
    checkOutDate: '2026-07-03',
    guests: 1.5,
  });

  assert.ok(errors.includes('guests must be at least 1'));
});

test('rejects missing checkInDate', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    checkOutDate: '2026-07-03',
    guests: 2,
  });

  assert.ok(errors.includes('checkInDate must be provided'));
});

test('rejects missing checkOutDate', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-01',
    guests: 2,
  });

  assert.ok(errors.includes('checkOutDate must be provided'));
});

test('rejects missing guests count', () => {
  const errors = validateBooking({
    guestName: 'Aki Tanaka',
    checkInDate: '2026-07-01',
    checkOutDate: '2026-07-03',
  });

  assert.ok(errors.includes('guests must be at least 1'));
});