using Microsoft.AspNetCore.Mvc;
using Sunergy.Business.Interface;
using Sunergy.Shared.Common;
using Sunergy.Shared.DTOs.Weather.DataOut;

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

        [HttpGet("getPowerWeather")]
        [ProducesResponseType(typeof(ResponsePackage<PowerWeatherDataOut>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetPowerWeather(DateTime dataIn, int id)
        {
            var result = await _weatherService.GetPowerWeather(dataIn, id);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch power weather data.");
            }
            return Ok(result);
        }

        [HttpGet("getProfitWeather")]
        [ProducesResponseType(typeof(ResponsePackage<ProfitWeatherDataOut>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetProfitWeather(DateTime dataIn, int id)
        {
            var result = await _weatherService.GetProfitWeather(dataIn, id);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch profit weather data.");
            }
            return Ok(result);
        }

        [HttpGet("getCurrentTemp")]
        [ProducesResponseType(typeof(ResponsePackage<double>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetCurrentTemp(int panelId)
        {
            var result = await _weatherService.GetCurrentTemp(panelId);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch current temperature.");
            }
            return Ok(result);
        }

        [HttpGet("getCurrentClouds")]
        [ProducesResponseType(typeof(ResponsePackage<double>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetCurrentClouds(int panelId)
        {
            var result = await _weatherService.GetCurrentClouds(panelId);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch current clouds.");
            }
            return Ok(result);
        }

        [HttpGet("getGeneratedPowerSum")]
        [ProducesResponseType(typeof(ResponsePackage<double>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetGeneratedPowerSum(int panelId)
        {
            var result = await _weatherService.GetGeneratedPowerSum(panelId);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch generated power sum.");
            }
            return Ok(result);
        }

        [HttpGet("getCurrentPower")]
        [ProducesResponseType(typeof(ResponsePackage<double>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetCurrentPower(int panelId)
        {
            var result = await _weatherService.GetCurrentPower(panelId);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch current power.");
            }
            return Ok(result);
        }

        [HttpGet("getCurrentPrice")]
        [ProducesResponseType(typeof(ResponsePackage<double>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetCurrentPrice(int panelId)
        {
            var result = await _weatherService.GetCurrentPrice(panelId);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch current price.");
            }
            return Ok(result);
        }

        [HttpGet("getGeneratedProfitSum")]
        [ProducesResponseType(typeof(ResponsePackage<double>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetGeneratedProfitSum(int panelId)
        {
            var result = await _weatherService.GetGeneratedProfitSum(panelId);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch generated profit sum.");
            }
            return Ok(result);
        }

        [HttpGet("getCumulativePower")]
        [ProducesResponseType(typeof(ResponsePackage<double>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetCumulativePower(int userId)
        {
            var result = await _weatherService.GetCumulativePower(userId);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch cumualted power.");
            }
            return Ok(result);
        }

        [HttpGet("getCumulativeProfit")]
        [ProducesResponseType(typeof(ResponsePackage<double>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetCumulativeProfit(int userId)
        {
            var result = await _weatherService.GetCumulativeProfit(userId);
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch cumualted power.");
            }
            return Ok(result);
        }


    }
}
