using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityServer.Migrations
{
    public partial class AddedRolesToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0e2269af-5a03-4901-9730-39299a7da4f1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a4bad20a-75a5-47f1-9ce7-9b055a0b1a8a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f3339783-faf0-4292-a6a5-547f14d6dd63");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "41067355-0056-4bf4-8a13-798f89679295", "a52c245e-3173-4957-8856-febd34d6153e", "Organization", "ORGANIZATION" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2d0a48c7-e050-468c-a6e4-b08bd2dc60db", "eeb92bac-311b-4be6-8916-72c04df418c3", "Volunteer", "VOLUNTEER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ba2a6af7-8dd7-4186-bc05-161cb337d821", "61f5baad-a22f-4b2e-8105-9a21fde16d7e", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2d0a48c7-e050-468c-a6e4-b08bd2dc60db");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "41067355-0056-4bf4-8a13-798f89679295");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ba2a6af7-8dd7-4186-bc05-161cb337d821");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a4bad20a-75a5-47f1-9ce7-9b055a0b1a8a", "8ef28514-2e37-45a1-a6fc-16d687fab6cd", "Organization", "Organization" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0e2269af-5a03-4901-9730-39299a7da4f1", "aab57248-d8c1-4385-8ce9-c6a557a47a2a", "Volunteer", "Volunteer" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f3339783-faf0-4292-a6a5-547f14d6dd63", "53102951-6911-41a2-a53b-d188fdbbdb1b", "Administrator", "ADMINISTRATOR" });
        }
    }
}
