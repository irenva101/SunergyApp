using Sunergy.Shared.Constants;

namespace Sunergy.Data.Model
{
    public class SolarPowerPlant : Entity
    {
        public int? UserId { get; set; }
        public string Name { get; set; }
        public double? InstalledPower { get; set; }
        public double? Efficiency { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public User User { get; set; }
        public List<PanelWeather> PanelWeathers { get; set; }
        public DateTime Created { get; set; }
        public PanelType PanelType { get; set; }

    }
}
