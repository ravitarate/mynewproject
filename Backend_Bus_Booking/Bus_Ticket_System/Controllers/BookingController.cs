using Bus_Ticket_System.DTOs;
using Bus_Ticket_System.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bus_Ticket_System.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingDto booking)
        {
            var result = await _bookingService.CreateBookingAsync(booking);
            return Ok(result);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBookingsByUser(int userId)
        {
            var bookings = await _bookingService.GetBookingsByUserAsync(userId);
            return Ok(bookings);
        }

        [HttpDelete("{bookingId}")]
        public async Task<IActionResult> CancelBooking(int bookingId)
        {
            var cancelled = await _bookingService.CancelBookingAsync(bookingId);
            return cancelled ? Ok() : NotFound();
        }
    }

}
