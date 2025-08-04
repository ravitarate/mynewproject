using System.ComponentModel.DataAnnotations;

namespace Bus_Ticket_System.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int RouteId { get; set; }

        [Required]
        public DateTime BookingDate { get; set; }

        [Required]
        public DateTime TravelDate { get; set; }

        [Required]
        [MaxLength(100)]
        public required string PassengerName { get; set; }

        [Range(1, 120)]
        public int PassengerAge { get; set; }

        [Required]
        public required string PassengerGender { get; set; }

        [Phone]
        public required string PassengerPhone { get; set; }

        [Required]
        public required string SeatNumbers { get; set; }  

        [Range(0, double.MaxValue)]
        public decimal TotalFare { get; set; }

        [Required]
        public required string BookingStatus { get; set; }

        [Required]
        public required string PaymentStatus { get; set; }
    }

}
