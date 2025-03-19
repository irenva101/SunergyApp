using Sunergy.Shared.Common;
using Sunergy.Shared.DTOs.Weather.DataOut;

namespace Sunergy.Business.Interface
{
    public interface IWeatherService
    {
        Task<ResponsePackageNoData> SetForcastWeatherByPanelId(int panelId);
        Task<ResponsePackageNoData> SetHistoryWeatherByPanelId(int panelId);
        Task<ResponsePackage<PowerWeatherDataOut>> GetPowerWeather(DateTime dataIn, int id);
        Task<ResponsePackage<ProfitWeatherDataOut>> GetProfitWeather(DateTime dataIn);
        Task<ResponsePackage<double>> GetCurrentTemp();
        Task<ResponsePackage<double>> GetCurrentClouds();
        Task<ResponsePackage<double>> GetGeneratedPowerSum();
        Task<ResponsePackage<double>> GetCurrentPower();
        Task<ResponsePackage<double>> GetCurrentPrice();
        Task<ResponsePackage<double>> GetGeneratedProfitSum();

    }
}
