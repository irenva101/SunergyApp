using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sunergy.Data.Migrations
{
    /// <inheritdoc />
    public partial class SolarPowerPlantFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_States_Panels_SolarPanelId",
                table: "States");

            migrationBuilder.DropTable(
                name: "Panels");

            migrationBuilder.RenameColumn(
                name: "SolarPanelId",
                table: "States",
                newName: "SolarPowerPlantId");

            migrationBuilder.RenameIndex(
                name: "IX_States_SolarPanelId",
                table: "States",
                newName: "IX_States_SolarPowerPlantId");

            migrationBuilder.CreateTable(
                name: "PowerPlants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InstalledPower = table.Column<double>(type: "float", nullable: true),
                    Efficiency = table.Column<double>(type: "float", nullable: true),
                    Longitude = table.Column<double>(type: "float", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PanelType = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastUpdateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PowerPlants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PowerPlants_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PowerPlants_UserId",
                table: "PowerPlants",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_States_PowerPlants_SolarPowerPlantId",
                table: "States",
                column: "SolarPowerPlantId",
                principalTable: "PowerPlants",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_States_PowerPlants_SolarPowerPlantId",
                table: "States");

            migrationBuilder.DropTable(
                name: "PowerPlants");

            migrationBuilder.RenameColumn(
                name: "SolarPowerPlantId",
                table: "States",
                newName: "SolarPanelId");

            migrationBuilder.RenameIndex(
                name: "IX_States_SolarPowerPlantId",
                table: "States",
                newName: "IX_States_SolarPanelId");

            migrationBuilder.CreateTable(
                name: "Panels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Efficiency = table.Column<double>(type: "float", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: true),
                    Longitude = table.Column<double>(type: "float", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Power = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Panels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Panels_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Panels_UserId",
                table: "Panels",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_States_Panels_SolarPanelId",
                table: "States",
                column: "SolarPanelId",
                principalTable: "Panels",
                principalColumn: "Id");
        }
    }
}
