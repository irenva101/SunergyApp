using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sunergy.Business.Interface;
using Sunergy.Data.Context;
using Sunergy.Data.Model;
using Sunergy.Shared.Common;
using Sunergy.Shared.Constants;
using Sunergy.Shared.DTOs.Panel.DataIn;
using Sunergy.Shared.DTOs.Panel.DataOut;

namespace Sunergy.Business.Implemention
{
    public class PanelService : IPanelService
    {
        private readonly SolarContext _dbContext;
        private readonly IMapper _mapper;

        public PanelService(SolarContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<ResponsePackageNoData> Delete(int panelId)
        {
            var powerPlant = await _dbContext.PowerPlants.FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == panelId);
            if (powerPlant != null)
            {
                return new ResponsePackageNoData(ResponseStatus.BadRequest, "Panel with given email doesn't exist.");
            }
            powerPlant.IsDeleted = true;
            await _dbContext.SaveChangesAsync();
            return new ResponsePackageNoData(ResponseStatus.OK, "Panel deleted succesfully");

        }

        public async Task<ResponsePackage<List<PanelDto>>> GetAllPanelsByUserId(int? userId, Role? role)
        {
            try
            {
                var panelsFromDB = await _dbContext.PowerPlants.Where(x => !x.IsDeleted && x.UserId == userId).OrderByDescending(x => x.Created).Select(x => new PanelDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Longitude = x.Longitude,
                    Latitude = x.Latitude,

                }).AsNoTracking()
                .ToListAsync();
                return new ResponsePackage<List<PanelDto>>(panelsFromDB, ResponseStatus.OK);
            }
            catch (Exception ex)
            {
                return new ResponsePackage<List<PanelDto>>(ResponseStatus.BadRequest, "Something went wrong.");
            }
        }

        public Task<ResponsePackage<PanelInfoOut>> GetById(int panelId, int? userId, Role? role)
        {
            try
            {
                var panelFromDB = _dbContext.PowerPlants.Where(x => !x.IsDeleted && x.Id == panelId).Select(x => new PanelInfoOut
                {
                    Name = x.Name,
                    Latitude = x.Latitude,
                    Longitude = x.Longitude,
                    Efficiency = x.Efficiency,
                    Created = x.Created,
                    InstalledPower = x.InstalledPower,
                    Updated = x.LastUpdateTime,
                    PanelType = x.PanelType

                }).FirstOrDefault();
                return Task.FromResult(new ResponsePackage<PanelInfoOut>(panelFromDB, ResponseStatus.OK));

            }
            catch (Exception ex)
            {
                return Task.FromResult(new ResponsePackage<PanelInfoOut>(ResponseStatus.BadRequest, "Somwthing went wrong."));
            }
        }

        public async Task<ResponsePackage<List<PanelDto>>> Query(DataIn<string> dataIn, int? userId, Role? role)
        {
            var allPanels = _dbContext.PowerPlants.Where(x => x.IsDeleted == false);

            if (role != null && role == Role.User)
                allPanels = allPanels.Where(x => x.UserId == userId);

            var users = await allPanels.OrderByDescending(x => x.Id)
                .Skip((dataIn.CurrentPage - 1) * dataIn.PageSize)
                .Take(dataIn.PageSize)
                .AsNoTracking()
                .ToListAsync();

            var dataDto = _mapper.Map<List<PanelDto>>(users);
            return new ResponsePackage<List<PanelDto>>
            {
                Status = ResponseStatus.OK,
                Data = dataDto,
            };
        }

        public async Task<ResponsePackageNoData> Save(PanelDataIn dataIn, int? userId)
        {
            if (dataIn != null && dataIn.Id != 0)
            {
                var user = await _dbContext.PowerPlants.FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == userId);

                user.InstalledPower = dataIn.InstalledPower;
                user.Name = dataIn.Name;
                user.Longitude = dataIn.Longitude;
                user.Latitude = dataIn.Latitude;
                user.PanelType = dataIn.PanelType;
                user.LastUpdateTime = DateTime.UtcNow;
            }
            else
            {
                var panel = new SolarPowerPlant()
                {
                    Name = dataIn.Name,
                    Longitude = dataIn.Longitude,
                    Latitude = dataIn.Latitude,
                    InstalledPower = dataIn.InstalledPower,
                    UserId = userId,
                    Created = DateTime.UtcNow,
                    LastUpdateTime = DateTime.UtcNow,

                };
                await _dbContext.PowerPlants.AddAsync(panel);
            }
            await _dbContext.SaveChangesAsync();
            return new ResponsePackageNoData(ResponseStatus.OK, "Successfully saved");
        }
    }
}
