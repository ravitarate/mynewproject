using Microsoft.AspNetCore.Identity;

namespace Bus_Ticket_System.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        public string Role { get; set; } = "user";


    }

}
