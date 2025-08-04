using Bus_Ticket_System.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Route = Bus_Ticket_System.Models.Route;

namespace Bus_Ticket_System.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
          : base(options) { }

        public DbSet<Route> Routes { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Profile> Profiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Keep Identity config intact

            // 🔗 Add your Profile-ApplicationUser relationship here
            modelBuilder.Entity<Profile>()
                .HasOne(p => p.ApplicationUser)
                .WithMany() // Or `.WithOne()` if it's 1:1 mapping
                .HasForeignKey(p => p.ApplicationUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }

}
