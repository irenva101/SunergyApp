using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Sunergy.Business.Interface;
using Sunergy.Data.Context;
using Sunergy.Data.Model;
using Sunergy.Shared.Common;
using Sunergy.Shared.Constants;
using Sunergy.Shared.DTOs.User.DataIn;
using Sunergy.Shared.DTOs.User.DataOut;

namespace Sunergy.Business.Implemention
{
    public class UserService : IUserService
    {
        private readonly SolarContext _dbContext;
        private readonly IMapper _mapper;

        public UserService(SolarContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<ResponsePackage<UserDto>> GetByEmail(string email)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email && x.IsDeleted == false);
            if (user == null)
            {
                return new ResponsePackage<UserDto>()
                {
                    Status = ResponseStatus.NotFound,
                    Message = "User doesn't exist in database."
                };
            }
            else
            {
                var dataDto = _mapper.Map<UserDto>(user);
                return new ResponsePackage<UserDto>()
                {
                    Status = ResponseStatus.OK,
                    Data = dataDto
                };
            }
        }

        public async Task<ResponsePackageNoData> Save(UserDataIn dataIn)
        {
            if (dataIn.Id != null && dataIn.Id != 0)
            {
                var tempUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == dataIn.Id);
                var emailTempUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.IsDeleted == false && x.Email.ToLower() == dataIn.Email.ToLower());
                if (emailTempUser == null && tempUser.Email.ToLower() != dataIn.Email.ToLower())
                    return new ResponsePackageNoData(ResponseStatus.BadRequest, "User with given email already exist.");
                else if (tempUser.Email.ToLower() != dataIn.Email.ToLower())
                    tempUser.Email = dataIn.Email;

                if (!dataIn.Password.IsNullOrEmpty())
                    tempUser.Password = dataIn.Password;
                tempUser.FirstName = dataIn.FirstName;
                tempUser.LastName = dataIn.LastName;
                tempUser.Role = dataIn.Role;
            }
            else
            {
                var tempUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.IsDeleted == false && x.Email.ToLower() == dataIn.Email.ToLower());
                if (tempUser != null)
                {
                    return new ResponsePackageNoData(ResponseStatus.BadRequest, "User with given email already exist.");
                }
                var user = new User()
                {
                    FirstName = dataIn.FirstName,
                    LastName = dataIn.LastName,
                    Password = dataIn.Password,
                    Email = dataIn.Email,
                    Role = dataIn.Role
                };
                await _dbContext.Users.AddAsync(user);
            }
            await _dbContext.SaveChangesAsync();
            return new ResponsePackageNoData(ResponseStatus.OK, "Succesfully saved");
        }
    }
}
