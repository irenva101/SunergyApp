namespace Sunergy.Shared.DTOs.Weather.DataOut
{
    public class PowerWeatherDataOut
    {
        public List<double> Powers { get; set; }
        public List<double> Temperatures { get; set; }
        public List<double> Clouds { get; set; }

        public DateTime Sunset { get; set; }
        public DateTime Sunrise { get; set; }

        public PowerWeatherDataOut()
        {
            Powers = new List<double>();
            Temperatures = new List<double>();
            Clouds = new List<double>();
            Sunset = new DateTime();
            Sunrise = new DateTime();
        }
    }
}
