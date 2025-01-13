using AutoMapper;
using Sunergy.Data.Model;
using Sunergy.Shared.DTOs.Panel.DataOut;

namespace Sunergy.Data.Mappings
{
    public class PanelProfile : Profile
    {
        public PanelProfile()
        {
            CreateMap<SolarPowerPlant, PanelDto>()
                        .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                        .ForMember(dest => dest.Power, opt => opt.MapFrom(src => src.InstalledPower))
                        .ForMember(dest => dest.Efficiency, opt => opt.MapFrom(src => src.Efficiency))
                        .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Longitude))
                        .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Latitude));

            CreateMap<SolarPowerPlant, PanelDataOut>()
                        .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                        .ForMember(dest => dest.Power, opt => opt.MapFrom(src => src.InstalledPower))
                        .ForMember(dest => dest.Efficiency, opt => opt.MapFrom(src => src.Efficiency))
                        .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Longitude))
                        .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Latitude));

        }
    }
}
