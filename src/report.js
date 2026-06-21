import { validateBooking, summarizeBooking } from './booking.js';
import { applyBestOffer, filterEligibleOffers, selectBestOffer } from './discounts.js';
import bookings from '../data/bookings.json' with { type: 'json' };
import offers from '../data/offers.json' with { type: 'json' };

function countNights(booking) {
  return Math.max(1, Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / 86400000));
}

for (const booking of bookings) {
  const errors = validateBooking(booking);
  if (errors.length > 0) {
    console.log(`${booking.guestName ?? 'Unknown'}: ${errors.join(', ')}`);
    continue;
  }

  const eligibleOffers = filterEligibleOffers(offers, {
    today: '2026-06-21',
    nights: countNights(booking),
    isMember: booking.isMember,
  });
  const bestOffer = selectBestOffer(eligibleOffers);
  const price = applyBestOffer(booking.basePrice, eligibleOffers);
  const offerLabel = bestOffer ? bestOffer.code : '割引なし';
  console.log(`${summarizeBooking(booking)} | offer: ${offerLabel} | base: ${booking.basePrice} -> ${price}`);
}