using System.Text.Json.Serialization;

namespace BookingApp;

public sealed class Booking
{
    [JsonPropertyName("guestName")]
    public string? GuestName { get; set; }

    [JsonPropertyName("checkInDate")]
    public string? CheckInDate { get; set; }

    [JsonPropertyName("checkOutDate")]
    public string? CheckOutDate { get; set; }

    [JsonPropertyName("guests")]
    public int? Guests { get; set; }

    [JsonPropertyName("isMember")]
    public bool IsMember { get; set; }

    [JsonPropertyName("basePrice")]
    public decimal BasePrice { get; set; }
}

public sealed class Offer
{
    [JsonPropertyName("code")]
    public string? Code { get; set; }

    [JsonPropertyName("percentOff")]
    public decimal? PercentOff { get; set; }

    [JsonPropertyName("memberOnly")]
    public bool MemberOnly { get; set; }

    [JsonPropertyName("minimumNights")]
    public int? MinimumNights { get; set; }

    [JsonPropertyName("expiresAt")]
    public string? ExpiresAt { get; set; }
}

public sealed record OfferContext(string Today, int Nights, bool IsMember);