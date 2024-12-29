namespace Sunergy.Data.Model
{
    public class SolarPanel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? Power { get; set; }
        public double? Efficiency { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public List<WeatherState> WeatherStates { get; set; }
        public DateTime Created { get; set; }
    }
}
