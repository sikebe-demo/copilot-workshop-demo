using System.Text.Json;
using BookingApp;

var dataDirectory = FindDataDirectory();
var serializerOptions = new JsonSerializerOptions(JsonSerializerDefaults.Web);
var bookings = ReadJson<Booking[]>(Path.Combine(dataDirectory, "bookings.json"), serializerOptions);
var offers = ReadJson<Offer[]>(Path.Combine(dataDirectory, "offers.json"), serializerOptions);

foreach (var booking in bookings)
{
    var errors = BookingService.ValidateBooking(booking);
    if (errors.Count > 0)
    {
        Console.WriteLine($"{booking.GuestName ?? "Unknown"}: {string.Join(", ", errors)}");
        continue;
    }

    var eligibleOffers = DiscountService.FilterEligibleOffers(offers, new OfferContext(
        Today: "2026-06-21",
        Nights: 2,
        IsMember: booking.IsMember));
    var price = DiscountService.ApplyBestOffer(booking.BasePrice, eligibleOffers);

    Console.WriteLine($"{BookingService.SummarizeBooking(booking)} => {price}");
}

static T ReadJson<T>(string path, JsonSerializerOptions options)
{
    using var stream = File.OpenRead(path);
    return JsonSerializer.Deserialize<T>(stream, options)
        ?? throw new InvalidOperationException($"Could not read JSON from {path}.");
}

static string FindDataDirectory()
{
    var current = new DirectoryInfo(AppContext.BaseDirectory);
    while (current is not null)
    {
        var dataDirectory = Path.Combine(current.FullName, "data");
        if (Directory.Exists(dataDirectory))
        {
            return dataDirectory;
        }

        current = current.Parent;
    }

    throw new DirectoryNotFoundException("Could not find the data directory.");
}