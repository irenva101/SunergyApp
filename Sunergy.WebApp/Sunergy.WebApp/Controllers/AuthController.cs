using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Sunergy.WebApp.Controllers
{
    public class AuthController : BaseController
    {
        public AuthController() { }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login()
        {
            return Ok();
        }
    }
}
