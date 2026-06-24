namespace BookingApp;

public static class BookingService
{
    public static IReadOnlyList<string> ValidateBooking(Booking? input)
    {
        if (input is null)
        {
            return ["booking is required"];
        }

        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(input.GuestName))
        {
            errors.Add("guestName must be provided");
        }

        if (string.IsNullOrWhiteSpace(input.CheckInDate))
        {
            errors.Add("checkInDate must be provided");
        }

        if (string.IsNullOrWhiteSpace(input.CheckOutDate))
        {
            errors.Add("checkOutDate must be provided");
        }

        if (input.CheckInDate is not null
            && input.CheckOutDate is not null
            && DateOnly.Parse(input.CheckOutDate) <= DateOnly.Parse(input.CheckInDate))
        {
            errors.Add("checkOutDate must be after checkInDate");
        }

        if (input.Guests is null or < 1)
        {
            errors.Add("guests must be at least 1");
        }

        return errors;
    }

    public static string SummarizeBooking(Booking input)
    {
        var checkInDate = DateOnly.Parse(input.CheckInDate!);
        var checkOutDate = DateOnly.Parse(input.CheckOutDate!);
        var nights = Math.Max(1, checkOutDate.DayNumber - checkInDate.DayNumber);

        return $"{input.GuestName}: {nights} night(s), {input.Guests} guest(s)";
    }
}