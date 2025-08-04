using System.ComponentModel.DataAnnotations;

namespace Bus_Ticket_System.DTOs
{
    public class RegisterDto
    {
        public int? Id { get; set; } 

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        public string FullName { get; set; }

        [Phone]
        public string Phone { get; set; }
    }

}
