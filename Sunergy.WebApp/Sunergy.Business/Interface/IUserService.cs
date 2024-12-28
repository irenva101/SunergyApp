using Sunergy.Shared.Common;
using Sunergy.Shared.DTOs.User.DataIn;
using Sunergy.Shared.DTOs.User.DataOut;

namespace Sunergy.Business.Interface
{
    public interface IUserService
    {
        Task<ResponsePackage<UserDto>> GetByEmail(string email);
        Task<ResponsePackageNoData> Save(UserDataIn dataIn);
        //Task<ResponsePackageNoData> Delete(int userIn);
        //Task<ResponsePackage<List<UserDto>>> GetAll(DataIn<string> dataIn);
    }
}
