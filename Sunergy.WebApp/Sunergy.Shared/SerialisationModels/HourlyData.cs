using System.Text.Json.Serialization;

namespace Sunergy.Shared.SerialisationModels
{
    public class HourlyData
    {
        public string Time { get; set; }
        [JsonPropertyName("temp_c")]
        public double TempC { get; set; }
        public int Cloud { get; set; }
    }
}
