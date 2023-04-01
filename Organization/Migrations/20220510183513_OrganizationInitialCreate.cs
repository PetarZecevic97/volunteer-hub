using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Organization.Migrations
{
    public partial class OrganizationInitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence(
                name: "organizationseq",
                incrementBy: 10);

            migrationBuilder.CreateTable(
                name: "Organization",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    organization_name = table.Column<string>(type: "VARCHAR(30)", nullable: false),
                    organization_id = table.Column<string>(type: "VARCHAR(30)", nullable: true),
                    summary = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    created_by = table.Column<string>(type: "VARCHAR(30)", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    last_Modified_by = table.Column<string>(type: "VARCHAR(30)", nullable: true),
                    last_modified_date = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organization", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Organization");

            migrationBuilder.DropSequence(
                name: "organizationseq");
        }
    }
}
