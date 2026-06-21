import { validateBooking, summarizeBooking } from './booking.js';
import { applyBestOffer, filterEligibleOffers } from './discounts.js';
import bookings from '../data/bookings.json' with { type: 'json' };
import offers from '../data/offers.json' with { type: 'json' };

for (const booking of bookings) {
  const errors = validateBooking(booking);
  if (errors.length > 0) {
    console.log(`${booking.guestName ?? 'Unknown'}: ${errors.join(', ')}`);
    continue;
  }

  const eligibleOffers = filterEligibleOffers(offers, {
    today: '2026-06-21',
    nights: 2,
    isMember: booking.isMember,
  });
  const price = applyBestOffer(booking.basePrice, eligibleOffers);
  console.log(`${summarizeBooking(booking)} => ${price}`);
}