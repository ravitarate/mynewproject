﻿namespace BusReservationNET.Configuration
{
    public class JWTSettings
    {
        public string SecretKey { get; set; } = null!;
        public string Issuer { get; set; } = null!;
        public string Audience { get; set; } = null!;
        public int ExpiryInMinutes { get; set; }
    }
}
