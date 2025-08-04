using Bus_Ticket_System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bus_Ticket_System.Models;
using Route = Bus_Ticket_System.Models.Route;

namespace Bus_Ticket_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RouteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RouteController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoutes() =>
          Ok(await _context.Routes.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> CreateRoute([FromBody] Route route)
        {
            _context.Routes.Add(route);
            await _context.SaveChangesAsync();
            return Ok(route);
        }
    }

}
