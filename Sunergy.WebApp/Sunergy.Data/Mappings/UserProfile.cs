using AutoMapper;
using Sunergy.Data.Model;

namespace Sunergy.Data.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
                        .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                        .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                        .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));
        }
    }
}
