using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Bus_Ticket_System.Models
{
    public class Profile
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ApplicationUser")]
        public string ApplicationUserId { get; set; } // Link to Identity
        public ApplicationUser ApplicationUser { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        [Phone]
        public string Phone { get; set; }

        [Required]
        public string Role { get; set; }
    }

}
