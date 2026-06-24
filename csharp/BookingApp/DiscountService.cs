namespace BookingApp;

public static class DiscountService
{
    public static IReadOnlyList<Offer> FilterEligibleOffers(IEnumerable<Offer> offers, OfferContext booking)
    {
        var today = DateOnly.Parse(booking.Today);

        return offers.Where(offer =>
        {
            if (offer.MinimumNights is not null && booking.Nights < offer.MinimumNights)
            {
                return false;
            }

            if (offer.MemberOnly && !booking.IsMember)
            {
                return false;
            }

            if (offer.ExpiresAt is not null && DateOnly.Parse(offer.ExpiresAt) < today)
            {
                return false;
            }

            return true;
        }).ToList();
    }

    public static decimal ApplyBestOffer(decimal basePrice, IEnumerable<Offer> offers)
    {
        var best = offers.Select(offer => offer.PercentOff ?? 0).DefaultIfEmpty(0).Max();
        return Math.Round(basePrice * (1 - best / 100), MidpointRounding.AwayFromZero);
    }
}