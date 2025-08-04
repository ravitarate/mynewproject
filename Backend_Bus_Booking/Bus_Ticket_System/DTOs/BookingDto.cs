using System.ComponentModel.DataAnnotations;

namespace Bus_Ticket_System.DTOs
{
    public class BookingDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int RouteId { get; set; }

        public DateTime TravelDate { get; set; }

        [Required]
        public string PassengerName { get; set; }

        [Range(1, 120)]
        public int PassengerAge { get; set; }

        [Required]
        public string PassengerGender { get; set; }

        [Phone]
        public string PassengerPhone { get; set; }

        [Required]
        public string SeatNumbers { get; set; }

        [Required]
        public decimal TotalFare { get; set; }
    }

}
