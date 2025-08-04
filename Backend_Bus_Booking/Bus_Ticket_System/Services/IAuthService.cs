using Bus_Ticket_System.DTOs;
using Bus_Ticket_System.Models;
using Microsoft.AspNetCore.Identity;

namespace Bus_Ticket_System.Services
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterAsync(RegisterDto model);
        Task<AuthResult> LoginAsync(LoginDto model);
        Task<bool> UserExistsAsync(string email);
    }

}
