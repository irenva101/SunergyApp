using Sunergy.Shared.Common;
using Sunergy.Shared.DTOs.Weather.DataOut;

namespace Sunergy.Business.Interface
{
    public interface IWeatherService
    {
        Task<ResponsePackageNoData> SetForcastWeatherByPanelId(int panelId);
        Task<ResponsePackageNoData> SetHistoryWeatherByPanelId(int panelId);
        Task<ResponsePackage<PowerWeatherDataOut>> GetPowerWeather(DateTime dataIn, int id);
        Task<ResponsePackage<ProfitWeatherDataOut>> GetProfitWeather(DateTime dataIn, int id);
        Task<ResponsePackage<double>> GetCurrentTemp(int panelId);
        Task<ResponsePackage<double>> GetCurrentClouds(int panelId);
        Task<ResponsePackage<double>> GetGeneratedPowerSum(int panelId);
        Task<ResponsePackage<double>> GetCurrentPower(int panelId);
        Task<ResponsePackage<double>> GetCurrentPrice(int panelId);
        Task<ResponsePackage<double>> GetGeneratedProfitSum(int panelId);
        Task<ResponsePackage<double>> GetCumulativePower(int userId);
        Task<ResponsePackage<double>> GetCumulativeProfit(int userId);

    }
}
