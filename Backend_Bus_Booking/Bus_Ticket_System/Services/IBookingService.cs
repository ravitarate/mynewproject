using Bus_Ticket_System.DTOs;
using Bus_Ticket_System.Models;

namespace Bus_Ticket_System.Services
{
    public interface IBookingService
    {
        Task<Booking> CreateBookingAsync(BookingDto bookingDto);
        Task<IEnumerable<Booking>> GetBookingsByUserAsync(int userId);
        Task<bool> CancelBookingAsync(int bookingId);
    }

}
