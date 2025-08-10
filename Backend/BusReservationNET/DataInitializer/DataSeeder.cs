﻿using BusReservationNET.Models;
using BusReservationNET.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BrickStoreBackend.DataInitializer
{
    public class DataSeeder : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public DataSeeder(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
                var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher<User>>();

                var existingAdmin = await userRepository.GetUserByEmailAsync("admin@gmail.com");
                if (existingAdmin == null)
                {
                    var adminUser = new User
                    {
                        Name = "Admin",
                        Email = "admin@gmail.com",
                        Contact = "9876567898",
                        Address = "Mumbai, India",
                        Role = "ROLE_ADMIN"
                    };

                    adminUser.Password = passwordHasher.HashPassword(adminUser, "admin@123");

                    await userRepository.RegisterUserAsync(adminUser);
                    Console.WriteLine(" Admin user added successfully.");
                }
                else
                {
                    Console.WriteLine(" Admin user already exists.");
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
