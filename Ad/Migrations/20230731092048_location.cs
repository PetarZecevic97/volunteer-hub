using Microsoft.EntityFrameworkCore.Migrations;

namespace Ad.Migrations
{
    public partial class location : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "organization_name",
                table: "Ads",
                newName: "location");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "location",
                table: "Ads",
                newName: "organization_name");
        }
    }
}
