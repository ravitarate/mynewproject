using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bus_Ticket_System.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RouteId = table.Column<int>(type: "int", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TravelDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PassengerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PassengerAge = table.Column<int>(type: "int", nullable: false),
                    PassengerGender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PassengerPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SeatNumbers = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalFare = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BookingStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Profiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Routes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromCity = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ToCity = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DepartureTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArrivalTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BaseFare = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalSeats = table.Column<int>(type: "int", nullable: false),
                    AvailableSeats = table.Column<int>(type: "int", nullable: false),
                    BusOperator = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BusType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Routes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Profiles");

            migrationBuilder.DropTable(
                name: "Routes");
        }
    }
}
