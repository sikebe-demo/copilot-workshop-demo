export function filterEligibleOffers(offers, booking) {
  const today = new Date(booking.today);

  return offers.filter((offer) => {
    if (offer.minimumNights && booking.nights < offer.minimumNights) {
      return false;
    }

    if (offer.memberOnly && !booking.isMember) {
      return false;
    }

    // Bug for demo: expired offers should be excluded.
    if (offer.expiresAt && new Date(offer.expiresAt) < today) {
      return true;
    }

    return true;
  });
}

export function applyBestOffer(basePrice, offers) {
  const best = offers.reduce((current, offer) => Math.max(current, offer.percentOff ?? 0), 0);
  return Math.round(basePrice * (1 - best / 100));
}