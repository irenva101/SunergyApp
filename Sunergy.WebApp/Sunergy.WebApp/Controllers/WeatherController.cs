using Microsoft.AspNetCore.Mvc;
using Sunergy.Business.Interface;
using Sunergy.Shared.Common;

namespace Sunergy.WebApp.Controllers
{
    public class WeatherController : Controller
    {
        private readonly IWeatherService _weatherService;

        public WeatherController(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpPost("setForecastWeather")]
        [ProducesResponseType(typeof(ResponsePackage<string>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> SetForecastWeather(int id)
        {
            var result = await _weatherService.SetForcastWeatherByPanelId(id);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch weather data.");
            }
            return Ok(result);
        }

        [HttpPost("setHistoryWeather")]
        [ProducesResponseType(typeof(ResponsePackage<string>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> SetHistoryWeather(int id)
        {
            var result = await _weatherService.SetHistoryWeatherByPanelId(id);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch weather data.");
            }
            return Ok(result);
        }

    }
}
