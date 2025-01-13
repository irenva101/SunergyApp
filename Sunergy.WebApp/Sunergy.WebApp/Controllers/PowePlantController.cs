﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunergy.Business.Interface;
using Sunergy.Shared.Common;
using Sunergy.Shared.DTOs.Panel.DataIn;

namespace Sunergy.WebApp.Controllers
{
    public class PowePlantController : BaseController
    {
        private readonly IPanelService _panelService;
        public PowePlantController(IPanelService panelService)
        {
            _panelService = panelService;
        }
        [HttpPost("query")]
        public async Task<IActionResult> GetAll(DataIn<string> dataIn)
        {
            return Ok(await _panelService.Query(dataIn, GetUserId().GetValueOrDefault(), GetUserRole().GetValueOrDefault()));
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
    }
}
