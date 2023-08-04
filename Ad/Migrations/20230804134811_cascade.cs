using Microsoft.EntityFrameworkCore.Migrations;

namespace Ad.Migrations
{
    public partial class cascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdsVolunteers_Ads_ad_id",
                table: "AdsVolunteers");

            migrationBuilder.AddForeignKey(
                name: "FK_AdsVolunteers_Ads_ad_id",
                table: "AdsVolunteers",
                column: "ad_id",
                principalTable: "Ads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdsVolunteers_Ads_ad_id",
                table: "AdsVolunteers");

            migrationBuilder.AddForeignKey(
                name: "FK_AdsVolunteers_Ads_ad_id",
                table: "AdsVolunteers",
                column: "ad_id",
                principalTable: "Ads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
