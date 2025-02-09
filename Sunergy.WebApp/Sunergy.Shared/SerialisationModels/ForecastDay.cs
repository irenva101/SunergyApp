using System.Text.Json.Serialization;

namespace Sunergy.Shared.SerialisationModels
{
    public class ForecastDay
    {
        [JsonPropertyName("avgtemp_c")]
        public double AverageTemp { get; set; }
        [JsonPropertyName("cloud")]
        public double AverageCloudiness { get; set; }
        public string Date { get; set; }
        public Astro Astro { get; set; }
        public List<HourlyData> Hour { get; set; }
    }
}
