using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ad.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ads",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    title = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    summary = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    skills = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    is_open = table.Column<bool>(type: "BIT", nullable: false),
                    organization_name = table.Column<string>(type: "VARCHAR(30)", nullable: false),
                    organization_id = table.Column<string>(type: "VARCHAR(30)", nullable: true),
                    opened_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    last_modified_date = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ads", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ads");
        }
    }
}
