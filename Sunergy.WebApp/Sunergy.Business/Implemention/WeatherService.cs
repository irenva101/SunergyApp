using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Sunergy.Business.Interface;
using Sunergy.Data.Context;
using Sunergy.Data.Model;
using Sunergy.Shared.Common;
using Sunergy.Shared.Constants;
using Sunergy.Shared.DTOs.Weather.DataOut;
using Sunergy.Shared.SerialisationModels;
using System.Text.Json;

namespace Sunergy.Business.Implemention
{
    public class WeatherService : IWeatherService
    {
        private readonly SolarContext _dbContext;
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;


        public WeatherService(SolarContext dbContext, HttpClient httpClient, IOptions<AppSettings> appSettings)
        {
            _dbContext = dbContext;
            _httpClient = httpClient;
            _apiKey = appSettings.Value.OpenWeatherApiKey;
        }

        public async Task<ResponsePackage<PowerWeatherDataOut>> GetPowerWeather(DateTime dataIn)
        {
            try
            {
                var resultForDate = await _dbContext.PanelWeatherHours
                    .Where(p => EF.Functions.DateDiffDay(p.Time, dataIn) == 0)
                    .ToListAsync();

                var result = new PowerWeatherDataOut()
                {
                    Powers = resultForDate.Select(p => p.Produced).ToList(),
                    Temperatures = resultForDate.Select(p => p.Temperature).ToList(),
                    Clouds = resultForDate.Select(p => p.Cloudiness).ToList(),
                };

                return new ResponsePackage<PowerWeatherDataOut>() { Data = result, Message = "Successfully fetched weather data." };
            }
            catch (Exception ex)
            {
                return new ResponsePackage<PowerWeatherDataOut>() { Message = ex.Message };
            }

        }

        public async Task<ResponsePackage<ProfitWeatherDataOut>> GetProfitWeather(DateTime dataIn)
        {
            try
            {
                var resultForDate = await _dbContext.PanelWeatherHours
                    .Where(p => EF.Functions.DateDiffDay(p.Time, dataIn) == 0)
                    .ToListAsync();

                var result = new ProfitWeatherDataOut()
                {
                    Powers = resultForDate.Select(p => p.Produced).ToList(),
                    Prices = resultForDate.Select(p => p.CurrentPrice).ToList(),
                    Profit = resultForDate.Select(p => p.CurrentPrice).ToList(),
                };

                return new ResponsePackage<ProfitWeatherDataOut>() { Data = result, Message = "Successfully fetched weather data." };
            }
            catch (Exception ex)
            {
                return new ResponsePackage<ProfitWeatherDataOut>() { Message = ex.Message };
            }
        }

        public async Task<ResponsePackageNoData> SetForcastWeatherByPanelId(int panelId)
        {
            //Fetching the power plant from DB
            var powerPlant = await _dbContext.PowerPlants.FirstOrDefaultAsync
                (x => x.IsDeleted == false && x.Id == panelId);

            var panelType = 0.0;
            if (powerPlant.PanelType == PanelType.ThinFilm)
            {
                panelType = 0.12;
            }
            else if (powerPlant.PanelType == PanelType.Monocrystalline)
            {
                panelType = 0.2;
            }
            else if (powerPlant.PanelType == PanelType.Polycrystalline)
            {
                panelType = 0.15;
            }
            else
            {
                panelType = 0.23;
            }

            if (powerPlant == null)
            {
                return new ResponsePackageNoData(ResponseStatus.BadRequest, "Panel with given id doesn't exist.");
            }

            var next3days = DateTime.Now.AddDays(+2).ToString("yyyy-MM-dd");

            var urlForecast = $"https://api.weatherapi.com/v1/forecast.json?key={_apiKey}&q={powerPlant.Latitude},{powerPlant.Longitude}&days=2&hourly=1&alerts=no";
            var responseForecast = await _httpClient.GetAsync(urlForecast);


            if (!responseForecast.IsSuccessStatusCode)
            {
                var errorDetails = await responseForecast.Content.ReadAsStringAsync();
                return new ResponsePackageNoData(ResponseStatus.BadRequest, errorDetails);
            }

            var dataForecast = await responseForecast.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var weatherForecast = JsonSerializer.Deserialize<WeatherApiResponse>(dataForecast, options);

            if (weatherForecast?.Forecast.ForecastDay != null)
            {
                List<PanelWeather> forecasts = new();
                foreach (var day in weatherForecast.Forecast.ForecastDay)
                {
                    var forecast = new PanelWeather
                    {
                        PanelId = panelId,
                        Day = DateTime.Parse(day.Date),
                        SunriseTime = DateTime.Parse(day.Astro.Sunrise),
                        SunsetTime = DateTime.Parse(day.Astro.Sunset),
                        Hours = new List<PanelWeatherHours>(),
                        AverageTemp = Math.Round(day.Hour.Average(h => h.TempC), 2),
                        AverageCloudiness = Math.Round(day.Hour.Average(h => h.Cloud), 2),
                        LastUpdateTime = DateTime.Now,
                    };


                    foreach (var hour in day.Hour)
                    {
                        //power calculation 
                        var k = 0 * hour.Cloud / 100 + 3 / 85 * hour.TempC + 3.0588;

                        var produced = (powerPlant.InstalledPower ?? 0 / panelType) *
                            (powerPlant.Efficiency ?? 0) *
                            (1 - (hour.Cloud / 100.0)) *
                             (hour.TempC + k * (1 - hour.Cloud / 100));


                        //price calculation
                        double price = 0;
                        string timeString = hour.Time; // "2025-03-08 00:00"
                        DateTime parsedTime = DateTime.ParseExact(timeString, "yyyy-MM-dd HH:mm", null);
                        int hourAsInt = parsedTime.Hour;
                        if (hourAsInt >= 23 || hourAsInt < 6)
                        {
                            // Between 23h and 6h
                            price = 0.05;
                        }
                        else if (hourAsInt >= 6 && hourAsInt < 10)
                        {
                            // Between 06h and 10h
                            price = 0.10;
                        }
                        else if (hourAsInt >= 10 && hourAsInt < 19)
                        {
                            // Between 10h and 19h
                            price = 0.20;
                        }
                        else if (hourAsInt >= 19 && hourAsInt < 23)
                        {

                            // Between 19h and 23h
                            price = 0.10;
                        }

                        //mapping
                        forecast.Hours.Add(new PanelWeatherHours
                        {
                            Time = DateTime.Parse(hour.Time),
                            Temperature = hour.TempC,
                            Cloudiness = hour.Cloud,
                            LastUpdateTime = DateTime.Now,
                            Produced = produced,
                            CurrentPrice = price,
                            Earning = produced / 1000 * price
                        });
                        forecasts.Add(forecast);
                    }
                }

                _dbContext.PanelWeathers.AddRange(forecasts);
                await _dbContext.SaveChangesAsync();

                return new ResponsePackageNoData(ResponseStatus.OK, "Successfully saved weather data.");
            }
            return new ResponsePackageNoData(ResponseStatus.InternalServerError, "Something went wrong when trying to parse JSON to database.");

        }

        public async Task<ResponsePackageNoData> SetHistoryWeatherByPanelId(int panelId)
        {
            //Fetching the power plant from DB
            var powerPlant = await _dbContext.PowerPlants.FirstOrDefaultAsync
                (x => x.IsDeleted == false && x.Id == panelId);

            var panelType = 0.0;
            if (powerPlant.PanelType == PanelType.ThinFilm)
            {
                panelType = 0.12;
            }
            else if (powerPlant.PanelType == PanelType.Monocrystalline)
            {
                panelType = 0.2;
            }
            else if (powerPlant.PanelType == PanelType.Polycrystalline)
            {
                panelType = 0.15;
            }
            else
            {
                panelType = 0.23;
            }

            if (powerPlant == null)
            {
                return new ResponsePackageNoData(ResponseStatus.BadRequest, "Panel with given id doesn't exist.");
            }

            var yesterday = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd");
            var urlHistory = $"https://api.weatherapi.com/v1/history.json?key={_apiKey}&q={powerPlant.Latitude},{powerPlant.Longitude}&dt={yesterday}&hourly=1&alerts=no";
            var responseHistory = await _httpClient.GetAsync(urlHistory);

            if (!responseHistory.IsSuccessStatusCode)
            {
                var errorDetails = await responseHistory.Content.ReadAsStringAsync();
                return new ResponsePackageNoData(ResponseStatus.BadRequest, errorDetails);
            }
            var dataHistory = await responseHistory.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var weatherForecast = JsonSerializer.Deserialize<WeatherApiResponse>(dataHistory, options);

            if (weatherForecast?.Forecast.ForecastDay != null)
            {
                List<PanelWeather> historys = new();
                foreach (var day in weatherForecast.Forecast.ForecastDay)
                {
                    var history = new PanelWeather
                    {
                        PanelId = panelId,
                        Day = DateTime.Parse(day.Date),
                        SunriseTime = DateTime.Parse(day.Astro.Sunrise),
                        SunsetTime = DateTime.Parse(day.Astro.Sunset),
                        Hours = new List<PanelWeatherHours>(),
                        AverageTemp = Math.Round(day.Hour.Average(h => h.TempC), 2),
                        AverageCloudiness = Math.Round(day.Hour.Average(h => h.Cloud), 2),
                        LastUpdateTime = DateTime.Now,
                    };

                    foreach (var hour in day.Hour)
                    {
                        //power calculation 
                        var k = 0 * hour.Cloud / 100 + 3 / 85 * hour.TempC + 3.0588;

                        var produced = (powerPlant.InstalledPower ?? 0 / panelType) *
                            (powerPlant.Efficiency ?? 0) *
                            (1 - (hour.Cloud / 100.0)) *
                             (hour.TempC + k * (1 - hour.Cloud / 100));


                        //price calculation
                        double price = 0;
                        string timeString = hour.Time; // "2025-03-08 00:00"
                        DateTime parsedTime = DateTime.ParseExact(timeString, "yyyy-MM-dd HH:mm", null);
                        int hourAsInt = parsedTime.Hour;
                        if (hourAsInt >= 23 || hourAsInt < 6)
                        {
                            // Between 23h and 6h
                            price = 0.05;
                        }
                        else if (hourAsInt >= 6 && hourAsInt < 10)
                        {
                            // Between 06h and 10h
                            price = 0.10;
                        }
                        else if (hourAsInt >= 10 && hourAsInt < 19)
                        {
                            // Between 10h and 19h
                            price = 0.20;
                        }
                        else if (hourAsInt >= 19 && hourAsInt < 23)
                        {

                            // Between 19h and 23h
                            price = 0.10;
                        }

                        //mapping
                        history.Hours.Add(new PanelWeatherHours
                        {
                            Time = DateTime.Parse(hour.Time),
                            Temperature = hour.TempC,
                            Cloudiness = hour.Cloud,
                            LastUpdateTime = DateTime.Now,
                            Produced = produced,
                            CurrentPrice = price,
                            Earning = produced / 1000 * price
                        });

                        historys.Add(history);
                    }
                }

                try
                {
                    _dbContext.PanelWeathers.AddRange(historys);
                    await _dbContext.SaveChangesAsync();

                }
                catch (Exception ex) { }

                return new ResponsePackageNoData(ResponseStatus.OK, "Successfully saved weather data.");
            }
            return new ResponsePackageNoData(ResponseStatus.InternalServerError, "Something went wrong when trying to parse JSON to database.");

        }
    }
}
