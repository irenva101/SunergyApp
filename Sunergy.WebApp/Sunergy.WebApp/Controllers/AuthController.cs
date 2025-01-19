using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunergy.Business.Interface;
using Sunergy.Shared.Common;
using Sunergy.Shared.Constants;
using Sunergy.Shared.DTOs.User.DataIn;
using Sunergy.WebApp.Helper;

namespace Sunergy.WebApp.Controllers
{
    public class AuthController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IMD5Service _md5Service;
        public AuthController(IUserService userService, IMD5Service md5Service)
        {
            _userService = userService;
            _md5Service = md5Service;
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(ResponsePackage<string>), 200)]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDataIn dataIn)
        {
            var ret = new ResponsePackage<string>();

            var userData = await _userService.GetByEmail(dataIn.Email);
            if (userData.Status == ResponseStatus.OK)
            {
                if (userData.Data.Password != _md5Service.GetMd5Hash(dataIn.Password))
                {
                    ret.Status = ResponseStatus.BadRequest;
                    ret.Message = "Wront credentials, please check your credentials.";
                    return Ok(ret);
                }
            }
            else
            {
                ret.Status = ResponseStatus.BadRequest;
                ret.Message = userData.Message;
                return Ok(ret);
            }
            ret.Status = ResponseStatus.OK;
            ret.Message = "Successfuly login";
            ret.Data = JwtManager.GetToken(userData.Data);
            return Ok(ret);
        }
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterDataIn dataIn)
        {
            var ret = await _userService.Save(new UserDataIn()
            {
                Password = _md5Service.GetMd5Hash(dataIn.Password),
                Email = dataIn.Email,
                FirstName = dataIn.FirstName,
                LastName = dataIn.LastName,
                Role = Role.User
            });
            return Ok(ret);
        }
    }
}
