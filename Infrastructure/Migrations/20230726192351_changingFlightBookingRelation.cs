using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class changingFlightBookingRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        { 
            migrationBuilder.DropIndex(
                name: "IX_Bookings_FlightId",
                table: "Bookings");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_FlightId",
                table: "Bookings",
                column: "FlightId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_FlightId",
                table: "Bookings");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_FlightId",
                table: "Bookings",
                column: "FlightId",
                unique: true);
        }
    }
}
