using Bus_Ticket_System.Data;
using Bus_Ticket_System.DTOs;
using Bus_Ticket_System.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Bus_Ticket_System.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthService(
              ApplicationDbContext context,
              IConfiguration config,
              UserManager<ApplicationUser> userManager,
              SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
        }



        public async Task<IdentityResult> RegisterAsync(RegisterDto model)
        {
            var exists = await _context.Profiles.AnyAsync(p => p.Email == model.Email);
            if (exists)
                return IdentityResult.Failed(new IdentityError { Description = "Email already registered" });

            var user = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Email,
                PhoneNumber = model.Phone,
                FullName = model.FullName
            };
            var result = await _userManager.CreateAsync(user, model.Password);


            if (!result.Succeeded)
                return result;

            var profile = new Profile
            {
                
                Email = model.Email,
                FullName = model.FullName,
                Phone = model.Phone,
                Role = "user",
                ApplicationUserId = user.Id
            };
           

            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();

            return IdentityResult.Success;
        }

        public async Task<AuthResult> LoginAsync(LoginDto model)
        {
            Console.WriteLine($"Login attempt: {model.Email} / {model.Password}");
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return null;

            var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.Email == model.Email);

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
                return null;

            // Password handling skipped for brevity — assume validated externally or through Supabase.
            var jwtKey = _config["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
                throw new InvalidOperationException("JWT key is not configured.");

            var key = Encoding.ASCII.GetBytes(jwtKey);

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            //return tokenHandler.WriteToken(token);
            return new AuthResult
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo,
                Role = profile?.Role,
                UserName = profile?.FullName
            };
        }

        public async Task<bool> UserExistsAsync(string email) =>
      await _userManager.FindByEmailAsync(email) != null;

    }

}
