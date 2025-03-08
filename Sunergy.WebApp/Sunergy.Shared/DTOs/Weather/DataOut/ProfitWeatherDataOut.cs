namespace Sunergy.Shared.DTOs.Weather.DataOut
{
    public class ProfitWeatherDataOut
    {
        public List<double> Powers { get; set; }
        public List<double> Prices { get; set; }
        public List<double> Profit { get; set; }

        public ProfitWeatherDataOut()
        {
            Powers = new List<double>();
            Prices = new List<double>();
            Profit = new List<double>();
        }
    }
}
