using Microsoft.EntityFrameworkCore;
using Sunergy.Data.Model;

namespace Sunergy.Data.Context
{
    public class SolarContext : DbContext
    {
        public SolarContext(DbContextOptions<SolarContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }
        public DbSet<User> Users { get; set; }
        public DbSet<SolarPowerPlant> PowerPlants { get; set; }
        public DbSet<PanelWeather> PanelWeathers { get; set; }
        public DbSet<PanelWeatherHours> PanelWeatherHours { get; set; }
    }
}
