using Sunergy.Shared.Common;

namespace Sunergy.Business.Interface
{
    public interface IWeatherService
    {
        Task<ResponsePackageNoData> SetForcastWeatherByPanelId(int panelId);
        Task<ResponsePackageNoData> SetHistoryWeatherByPanelId(int panelId);
    }
}
