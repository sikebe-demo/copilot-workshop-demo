using BookingApp;

var tests = new (string Name, Action Run)[]
{
    ("Valid booking has no errors", ValidBookingHasNoErrors),
    ("Requires guest name and dates", RequiresGuestNameAndDates),
    ("Rejects invalid guest count", RejectsInvalidGuestCount),
    ("Rejects checkout date before checkin date", RejectsCheckoutDateBeforeCheckinDate),
    ("Rejects checkout date equal to checkin date", RejectsCheckoutDateEqualToCheckinDate),
    ("Rejects missing guests count", RejectsMissingGuestsCount),
    ("Filters member-only offers for non-members", FiltersMemberOnlyOffersForNonMembers),
    ("Excludes expired offers", ExcludesExpiredOffers),
    ("Applies the best percentage discount", AppliesBestPercentageDiscount),
};

var failures = new List<string>();

foreach (var test in tests)
{
    try
    {
        test.Run();
        Console.WriteLine($"PASS {test.Name}");
    }
    catch (Exception exception)
    {
        failures.Add($"FAIL {test.Name}: {exception.Message}");
        Console.WriteLine(failures[^1]);
    }
}

if (failures.Count > 0)
{
    Console.WriteLine();
    Console.WriteLine($"{failures.Count} test(s) failed.");
    return 1;
}

Console.WriteLine();
Console.WriteLine($"All {tests.Length} C# tests passed.");
return 0;

static void ValidBookingHasNoErrors()
{
    var errors = BookingService.ValidateBooking(new Booking
    {
        GuestName = "Aki Tanaka",
        CheckInDate = "2026-07-01",
        CheckOutDate = "2026-07-03",
        Guests = 2,
    });

    AssertSequenceEqual([], errors);
}

static void RequiresGuestNameAndDates()
{
    var errors = BookingService.ValidateBooking(new Booking { Guests = 1 });

    AssertContains("guestName must be provided", errors);
    AssertContains("checkInDate must be provided", errors);
    AssertContains("checkOutDate must be provided", errors);
}

static void RejectsInvalidGuestCount()
{
    var errors = BookingService.ValidateBooking(new Booking
    {
        GuestName = "Aki Tanaka",
        CheckInDate = "2026-07-01",
        CheckOutDate = "2026-07-03",
        Guests = 0,
    });

    AssertContains("guests must be at least 1", errors);
}

static void RejectsCheckoutDateBeforeCheckinDate()
{
    var errors = BookingService.ValidateBooking(new Booking
    {
        GuestName = "Aki Tanaka",
        CheckInDate = "2026-07-05",
        CheckOutDate = "2026-07-03",
        Guests = 2,
    });

    AssertContains("checkOutDate must be after checkInDate", errors);
}

static void RejectsCheckoutDateEqualToCheckinDate()
{
    var errors = BookingService.ValidateBooking(new Booking
    {
        GuestName = "Aki Tanaka",
        CheckInDate = "2026-07-03",
        CheckOutDate = "2026-07-03",
        Guests = 2,
    });

    AssertContains("checkOutDate must be after checkInDate", errors);
}

static void RejectsMissingGuestsCount()
{
    var errors = BookingService.ValidateBooking(new Booking
    {
        GuestName = "Aki Tanaka",
        CheckInDate = "2026-07-01",
        CheckOutDate = "2026-07-03",
    });

    AssertContains("guests must be at least 1", errors);
}

static void FiltersMemberOnlyOffersForNonMembers()
{
    var result = DiscountService.FilterEligibleOffers(CreateOffers(), new OfferContext(
        Today: "2026-06-21",
        Nights: 2,
        IsMember: false));

    AssertSequenceEqual(["WEEKEND5"], result.Select(offer => offer.Code));
}

static void ExcludesExpiredOffers()
{
    var result = DiscountService.FilterEligibleOffers(CreateOffers(), new OfferContext(
        Today: "2026-06-21",
        Nights: 3,
        IsMember: true));

    AssertFalse(result.Any(offer => offer.Code == "SPRING25"), "SPRING25 should be excluded.");
}

static void AppliesBestPercentageDiscount()
{
    var result = DiscountService.ApplyBestOffer(10000, [
        new Offer { PercentOff = 10 },
        new Offer { PercentOff = 20 },
    ]);

    AssertEqual(8000, result);
}

static IReadOnlyList<Offer> CreateOffers() =>
[
    new Offer { Code = "MEMBER10", PercentOff = 10, MemberOnly = true, MinimumNights = 1, ExpiresAt = "2026-12-31" },
    new Offer { Code = "SPRING25", PercentOff = 25, MemberOnly = false, MinimumNights = 2, ExpiresAt = "2026-04-30" },
    new Offer { Code = "WEEKEND5", PercentOff = 5, MemberOnly = false, MinimumNights = 1, ExpiresAt = "2026-12-31" },
];

static void AssertContains<T>(T expected, IEnumerable<T> actual)
{
    if (!actual.Contains(expected))
    {
        throw new InvalidOperationException($"Expected collection to contain {expected}.");
    }
}

static void AssertSequenceEqual<T>(IEnumerable<T> expected, IEnumerable<T> actual)
{
    var expectedArray = expected.ToArray();
    var actualArray = actual.ToArray();

    if (!expectedArray.SequenceEqual(actualArray))
    {
        throw new InvalidOperationException($"Expected [{string.Join(", ", expectedArray)}], got [{string.Join(", ", actualArray)}].");
    }
}

static void AssertEqual<T>(T expected, T actual)
    where T : IEquatable<T>
{
    if (!actual.Equals(expected))
    {
        throw new InvalidOperationException($"Expected {expected}, got {actual}.");
    }
}

static void AssertFalse(bool condition, string message)
{
    if (condition)
    {
        throw new InvalidOperationException(message);
    }
}