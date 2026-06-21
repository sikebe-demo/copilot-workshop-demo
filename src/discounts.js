export function filterEligibleOffers(offers, booking) {
  const today = new Date(booking.today);

  return offers.filter((offer) => {
    if (offer.minimumNights && booking.nights < offer.minimumNights) {
      return false;
    }

    if (offer.memberOnly && !booking.isMember) {
      return false;
    }

    if (offer.expiresAt && new Date(offer.expiresAt) < today) {
      return false;
    }

    return true;
  });
}

export function selectBestOffer(offers) {
  return offers.reduce((best, offer) => {
    if ((offer.percentOff ?? 0) > (best?.percentOff ?? 0)) {
      return offer;
    }
    return best;
  }, null);
}

export function applyBestOffer(basePrice, offers) {
  const best = selectBestOffer(offers)?.percentOff ?? 0;
  return Math.round(basePrice * (1 - best / 100));
}