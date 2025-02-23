namespace Sunergy.Shared.DTOs.Panel.DataOut
{
    public class PanelDataOut
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public double? Power { get; set; }
        public double? Efficiency { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public double? Production1Day { get; set; } = 0;
        public double? Production7Days { get; set; } = 0;
        public double? Production30Days { get; set; } = 0;
        public double? TotalProduction { get; set; } = 0;
        public Dictionary<DateTime, double> ProductionPerTime { get; set; }


    }
}
