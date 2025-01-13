using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sunergy.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedPanelWeatherAndPanelWeatherHoursTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.CreateTable(
                name: "PanelWeathers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Day = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PanelId = table.Column<int>(type: "int", nullable: true),
                    SunriseTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SunsetTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AverageTemp = table.Column<double>(type: "float", nullable: false),
                    AverageCloudiness = table.Column<double>(type: "float", nullable: false),
                    Produced = table.Column<double>(type: "float", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastUpdateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PanelWeathers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PanelWeathers_PowerPlants_PanelId",
                        column: x => x.PanelId,
                        principalTable: "PowerPlants",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PanelWeatherHours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PanelWeatherId = table.Column<int>(type: "int", nullable: true),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Temperature = table.Column<double>(type: "float", nullable: false),
                    IsDay = table.Column<bool>(type: "bit", nullable: false),
                    Cloudiness = table.Column<double>(type: "float", nullable: false),
                    Produced = table.Column<double>(type: "float", nullable: false),
                    Earning = table.Column<double>(type: "float", nullable: false),
                    CurrentPrice = table.Column<double>(type: "float", nullable: false),
                    SunDurationPercentage = table.Column<double>(type: "float", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastUpdateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PanelWeatherHours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PanelWeatherHours_PanelWeathers_PanelWeatherId",
                        column: x => x.PanelWeatherId,
                        principalTable: "PanelWeathers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PanelWeatherHours_PanelWeatherId",
                table: "PanelWeatherHours",
                column: "PanelWeatherId");

            migrationBuilder.CreateIndex(
                name: "IX_PanelWeathers_PanelId",
                table: "PanelWeathers",
                column: "PanelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PanelWeatherHours");

            migrationBuilder.DropTable(
                name: "PanelWeathers");

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastUpdateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SolarPowerPlantId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.Id);
                    table.ForeignKey(
                        name: "FK_States_PowerPlants_SolarPowerPlantId",
                        column: x => x.SolarPowerPlantId,
                        principalTable: "PowerPlants",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_States_SolarPowerPlantId",
                table: "States",
                column: "SolarPowerPlantId");
        }
    }
}
