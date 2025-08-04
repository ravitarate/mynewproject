using Bus_Ticket_System.DTOs;
using Bus_Ticket_System.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bus_Ticket_System.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            try
            {
                var result = await _authService.RegisterAsync(model);
                return result.Succeeded ? Ok(result) : BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Registration Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var result = await _authService.LoginAsync(model);
            return string.IsNullOrEmpty(result?.Token) ? Unauthorized() : Ok(result);
        }
    }

}
