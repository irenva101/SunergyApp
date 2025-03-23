using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Sunergy.Business.Interface;
using Sunergy.Shared.Common;
using Sunergy.Shared.Constants;
using Sunergy.Shared.DTOs.Panel.DataIn;
using Sunergy.Shared.DTOs.Panel.DataOut;

namespace Sunergy.WebApp.Controllers
{
    public class PowePlantController : BaseController
    {
        private readonly IPanelService _panelService;
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public PowePlantController(IPanelService panelService, HttpClient httpClient, IOptions<AppSettings> appSettings)
        {
            _panelService = panelService;
            _httpClient = httpClient;
            _apiKey = appSettings.Value.OpenWeatherApiKey;
        }
        [HttpPost("query")]
        [ProducesResponseType(typeof(ResponsePackage<List<PanelDto>>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _panelService.Query(GetUserId().GetValueOrDefault(), GetUserRole().GetValueOrDefault()));
        }

        [HttpPost("getAllPanels")]
        [ProducesResponseType(typeof(ResponsePackage<List<PanelAdministratorDataOut>>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAllPanels()
        {
            var response = await _panelService.GetAllPanels();
            if (response.Status != ResponseStatus.OK)
                return StatusCode((int)response.StatusCode, $"Failed to fetch users.");
            else
                return Ok(response);
        }

        [HttpGet("blockPanel")]
        [ProducesResponseType(typeof(ResponsePackage<string>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> BlockUser(int panelId)
        {
            var response = await _panelService.BlockPanel(panelId);
            if (response.Status != ResponseStatus.OK)
                return StatusCode((int)response.StatusCode, $"Failed to fetch users.");
            else
                return Ok(response);
        }

        [HttpGet("unblockPanel")]
        [ProducesResponseType(typeof(ResponsePackage<string>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> UnblockUser(int panelId)
        {
            var response = await _panelService.UnblockPanel(panelId);
            if (response.Status != ResponseStatus.OK)
                return StatusCode((int)response.StatusCode, $"Failed to fetch users.");
            else
                return Ok(response);
        }


        [HttpPost("save")]
        [AllowAnonymous]
        public async Task<IActionResult> Save(PanelDataIn dataIn)
        {
            return Ok(await _panelService.Save(dataIn, GetUserId().GetValueOrDefault()));
        }
        [HttpGet("delete/{panelId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Delete(int panelId)
        {
            return Ok(await _panelService.Delete(panelId));
        }
        [HttpGet("getWeather")]
        [ProducesResponseType(typeof(ResponsePackage<string>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Get()
        {
            var latitude = 19.833549;
            var longitude = 45.267136;
            var url = $"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{latitude},{longitude}?key={_apiKey}&contentType=json";

            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                var errorDetails = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, $"Failed to fetch weather data: {errorDetails}");
            }

            var data = await response.Content.ReadAsStringAsync();
            var responseData = new ResponsePackage<string> { Data = data };
            return Ok(responseData);
        }

        [HttpGet("getById/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _panelService.GetById(id, GetUserId().GetValueOrDefault(), GetUserRole().GetValueOrDefault()));
        }

        [HttpGet("getAllPanelsByUserId")]
        [ProducesResponseType(typeof(ResponsePackage<List<PanelDto>>), 200)]
        [ProducesResponseType(typeof(ResponsePackage<string>), 400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAllPanelsByUserId()
        {
            return Ok(await _panelService.GetAllPanelsByUserId(GetUserId().GetValueOrDefault(), GetUserRole().GetValueOrDefault()));
        }


    }
}
