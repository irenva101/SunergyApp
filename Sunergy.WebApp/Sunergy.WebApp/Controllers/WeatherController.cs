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
        public async Task<IActionResult> GetPowerWeather(DateTime dataIn)
        {
            var result = await _weatherService.GetPowerWeather(dataIn);
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
        public async Task<IActionResult> GetProfitWeather(DateTime dataIn)
        {
            var result = await _weatherService.GetProfitWeather(dataIn);
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
        public async Task<IActionResult> GetCurrentTemp()
        {
            var result = await _weatherService.GetCurrentTemp();
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
        public async Task<IActionResult> GetCurrentClouds()
        {
            var result = await _weatherService.GetCurrentClouds();
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
        public async Task<IActionResult> GetGeneratedPowerSum()
        {
            var result = await _weatherService.GetGeneratedPowerSum();
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
        public async Task<IActionResult> GetCurrentPower()
        {
            var result = await _weatherService.GetCurrentPower();
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
        public async Task<IActionResult> GetCurrentPrice()
        {
            var result = await _weatherService.GetCurrentPrice();
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
        public async Task<IActionResult> GetGeneratedProfitSum()
        {
            var result = await _weatherService.GetGeneratedProfitSum();
            if (result == null)
            {
                return StatusCode((int)Response.StatusCode, $"Failed to fetch generated profit sum.");
            }
            return Ok(result);
        }

    }
}
