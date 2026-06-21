import assert from 'node:assert/strict';
import test from 'node:test';
import { applyBestOffer, filterEligibleOffers, selectBestOffer } from '../src/discounts.js';

const offers = [
  { code: 'MEMBER10', percentOff: 10, memberOnly: true, minimumNights: 1, expiresAt: '2026-12-31' },
  { code: 'SPRING25', percentOff: 25, memberOnly: false, minimumNights: 2, expiresAt: '2026-04-30' },
  { code: 'WEEKEND5', percentOff: 5, memberOnly: false, minimumNights: 1, expiresAt: '2026-12-31' },
];

test('filters member-only offers for non-members', () => {
  const result = filterEligibleOffers(offers, { today: '2026-06-21', nights: 2, isMember: false });

  assert.deepEqual(result.map((offer) => offer.code), ['WEEKEND5']);
});

test('excludes expired offers', () => {
  const result = filterEligibleOffers(offers, { today: '2026-06-21', nights: 3, isMember: true });

  assert.equal(result.some((offer) => offer.code === 'SPRING25'), false);
});

test('applies the best percentage discount', () => {
  assert.equal(applyBestOffer(10000, [{ percentOff: 10 }, { percentOff: 20 }]), 8000);
});

test('selects the offer with the highest discount', () => {
  const result = selectBestOffer([
    { code: 'A', percentOff: 10 },
    { code: 'B', percentOff: 20 },
    { code: 'C', percentOff: 5 },
  ]);

  assert.equal(result.code, 'B');
});

test('returns null when there are no offers', () => {
  assert.equal(selectBestOffer([]), null);
});