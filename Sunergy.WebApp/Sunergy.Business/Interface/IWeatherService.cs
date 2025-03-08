using Sunergy.Shared.Common;
using Sunergy.Shared.DTOs.Weather.DataOut;

namespace Sunergy.Business.Interface
{
    public interface IWeatherService
    {
        Task<ResponsePackageNoData> SetForcastWeatherByPanelId(int panelId);
        Task<ResponsePackageNoData> SetHistoryWeatherByPanelId(int panelId);
        Task<ResponsePackage<PowerWeatherDataOut>> GetPowerWeather(DateTime dataIn);
        Task<ResponsePackage<ProfitWeatherDataOut>> GetProfitWeather(DateTime dataIn);
    }
}
