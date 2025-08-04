using Bus_Ticket_System.Data;
using Bus_Ticket_System.DTOs;
using Bus_Ticket_System.Models;
using Microsoft.EntityFrameworkCore;

namespace Bus_Ticket_System.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Booking> CreateBookingAsync(BookingDto dto)
        {
            var booking = new Booking
            {
               
                UserId = dto.UserId,
                RouteId = dto.RouteId,
                BookingDate = DateTime.UtcNow,
                TravelDate = dto.TravelDate,
                PassengerName = dto.PassengerName,
                PassengerAge = dto.PassengerAge,
                PassengerGender = dto.PassengerGender,
                PassengerPhone = dto.PassengerPhone,
                SeatNumbers = dto.SeatNumbers,
                TotalFare = dto.TotalFare,
                BookingStatus = "confirmed",
                PaymentStatus = "paid"
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return booking;
        }

        public async Task<IEnumerable<Booking>> GetBookingsByUserAsync(int userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .ToListAsync();
        }

        public async Task<bool> CancelBookingAsync(int bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null) return false;

            booking.BookingStatus = "cancelled";
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
