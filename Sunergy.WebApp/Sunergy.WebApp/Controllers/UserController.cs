using Microsoft.AspNetCore.Mvc;
using Sunergy.Business.Interface;
using Sunergy.Shared.Common;
using Sunergy.Shared.Constants;
using Sunergy.Shared.DTOs.User.DataOut;

namespace Sunergy.WebApp.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getAllUsers")]
        [ProducesResponseType(typeof(ResponsePackage<List<UserDataOut>>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAllUsers()
        {
            var response = await _userService.GetAllUsers();
            if (response.Status != ResponseStatus.OK)
                return StatusCode((int)response.StatusCode, $"Failed to fetch users.");
            else
                return Ok(response);
        }
        [HttpGet("blockUser")]
        [ProducesResponseType(typeof(ResponsePackage<string>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> BlockUser(int userId)
        {
            var response = await _userService.BlockUser(userId);
            if (response.Status != ResponseStatus.OK)
                return StatusCode((int)response.StatusCode, $"Failed to fetch users.");
            else
                return Ok(response);
        }

        [HttpGet("unblockUser")]
        [ProducesResponseType(typeof(ResponsePackage<string>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> UnblockUser(int userId)
        {
            var response = await _userService.UnblockUser(userId);
            if (response.Status != ResponseStatus.OK)
                return StatusCode((int)response.StatusCode, $"Failed to fetch users.");
            else
                return Ok(response);
        }



    }
}
