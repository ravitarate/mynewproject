using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bus_Ticket_System.Models
{
    public class Route
    {
        [Key]
        public int Id { get; set; }  // Auto-incremented if configured in DbContext

        [Required]
        [MaxLength(100)]
        public string FromCity { get; set; }

        [Required]
        [MaxLength(100)]
        public string ToCity { get; set; }

        [Required]
        public string DepartureTime { get; set; }  // Consider DateTime if time arithmetic is needed

        [Required]
        public string ArrivalTime { get; set; }

        [Required]
        public string Duration { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal BaseFare { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int TotalSeats { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int AvailableSeats { get; set; }

        [Required]
        [MaxLength(100)]
        public string BusOperator { get; set; }

        [Required]
        [MaxLength(50)]
        public string BusType { get; set; }

        [NotMapped]
        public List<string> Amenities { get; set; } = new(); // Default to empty list for null-safety
    }
}
