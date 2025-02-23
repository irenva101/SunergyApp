using Sunergy.Shared.Constants;

namespace Sunergy.Shared.DTOs.Panel.DataOut
{
    public class PanelInfoOut
    {
        public string Name { get; set; }
        public double? InstalledPower { get; set; }
        public double? Efficiency { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public PanelType PanelType { get; set; }
    }
}
