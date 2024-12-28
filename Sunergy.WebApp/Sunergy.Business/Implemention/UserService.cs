using Sunergy.Business.Interface;
using Sunergy.Data.Context;
using Sunergy.Shared.Common;
using Sunergy.Shared.DTOs.User.DataIn;
using Sunergy.Shared.DTOs.User.DataOut;

namespace Sunergy.Business.Implemention
{
    public class UserService : IUserService
    {
        private readonly SolarContext _dbContext;
        private readonly IMapper _mapper;

        public Task<ResponsePackage<UserDto>> GetByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public Task<ResponsePackageNoData> Save(UserDataIn dataIn)
        {
            throw new NotImplementedException();
        }
    }
}
