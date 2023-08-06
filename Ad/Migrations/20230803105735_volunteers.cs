using Microsoft.EntityFrameworkCore.Migrations;

namespace Ad.Migrations
{
    public partial class volunteers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdsVolunteers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ad_id = table.Column<string>(type: "NVARCHAR(450)", nullable: true),
                    volunteer_id = table.Column<string>(type: "VARCHAR(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdsVolunteers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdsVolunteers_Ads_ad_id",
                        column: x => x.ad_id,
                        principalTable: "Ads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdsVolunteers_ad_id",
                table: "AdsVolunteers",
                column: "ad_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdsVolunteers");
        }
    }
}
