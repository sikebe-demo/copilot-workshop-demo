export function filterEligibleOffers(offers, booking) {
  const todayTime = Date.parse(booking.today);
  const nights = booking.nights;
  const isMember = booking.isMember;
  const offerCount = offers.length;
  const eligibleOffers = new Array(offerCount);
  let eligibleCount = 0;

  for (let index = 0; index < offerCount; index += 1) {
    const offer = offers[index];

    if (offer.minimumNights && nights < offer.minimumNights) {
      continue;
    }

    if (offer.memberOnly && !isMember) {
      continue;
    }

    if (offer.expiresAt && !(Date.parse(offer.expiresAt) > todayTime)) {
      continue;
    }

    eligibleOffers[eligibleCount] = offer;
    eligibleCount += 1;
  }

  eligibleOffers.length = eligibleCount;
  return eligibleOffers;
}

export function applyBestOffer(basePrice, offers) {
  let bestPercentOff = 0;
  const offerCount = offers.length;

  for (let index = 0; index < offerCount; index += 1) {
    const percentOff = offers[index].percentOff ?? 0;

    if (percentOff > bestPercentOff) {
      bestPercentOff = percentOff;
    }
  }

  return Math.round(basePrice * (1 - bestPercentOff / 100));
}