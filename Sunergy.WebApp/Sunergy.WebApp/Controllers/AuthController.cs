using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunergy.Shared.DTOs.User.DataIn;

namespace Sunergy.WebApp.Controllers
{
    public class AuthController : BaseController
    {
        public AuthController() { }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDataIn dataIn)
        {
            return Ok(dataIn);
        }
    }
}
