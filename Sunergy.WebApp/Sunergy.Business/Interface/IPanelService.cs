﻿using Sunergy.Shared.Common;
using Sunergy.Shared.Constants;
using Sunergy.Shared.DTOs.Panel.DataIn;
using Sunergy.Shared.DTOs.Panel.DataOut;

namespace Sunergy.Business.Interface
{
    public interface IPanelService
    {
        Task<ResponsePackageNoData> Save(PanelDataIn dataIn, int? userId);
        Task<ResponsePackageNoData> Delete(int panelId);
        Task<ResponsePackage<List<PanelDto>>> Query(DataIn<string> dataIn, int? userId, Role? role);
        Task<ResponsePackage<PanelInfoOut>> GetById(int panelId, int? userId, Role? role);
        Task<ResponsePackage<List<PanelDto>>> GetAllPanelsByUserId(int? userId, Role? role);
    }
}
