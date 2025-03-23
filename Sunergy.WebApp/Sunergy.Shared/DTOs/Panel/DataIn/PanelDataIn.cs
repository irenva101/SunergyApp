using Sunergy.Shared.Constants;

namespace Sunergy.Shared.DTOs.Panel.DataIn
{
    public class PanelDataIn
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double InstalledPower { get; set; }
        public double Efficiency { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public PanelType PanelType { get; set; }
    }
}
