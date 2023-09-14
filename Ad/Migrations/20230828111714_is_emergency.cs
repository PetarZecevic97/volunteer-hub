using Microsoft.EntityFrameworkCore.Migrations;

namespace Ad.Migrations
{
    public partial class is_emergency : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_emergency",
                table: "Ads",
                type: "BIT",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_emergency",
                table: "Ads");
        }
    }
}
