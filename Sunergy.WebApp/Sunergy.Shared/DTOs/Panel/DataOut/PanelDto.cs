using Sunergy.Shared.DTOs.User.DataOut;

namespace Sunergy.Shared.DTOs.Panel.DataOut
{
    public class PanelDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public double? Power { get; set; }
        public double? Efficiency { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public int? UserId { get; set; }
        public UserDto User { get; set; }
    }
}
