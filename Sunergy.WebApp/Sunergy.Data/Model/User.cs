using Sunergy.Shared.Constants;

namespace Sunergy.Data.Model
{
    public class User : Entity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Role Role { get; set; }
        public List<SolarPowerPlant> SolarPanels { get; set; }
    }
}
