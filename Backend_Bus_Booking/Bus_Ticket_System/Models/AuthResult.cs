namespace Bus_Ticket_System.Models
{
    public class AuthResult
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public string Role { get; set; }
        public string UserName { get; set; }
    }
}
