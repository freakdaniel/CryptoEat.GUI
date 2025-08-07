using Microsoft.AspNetCore.Mvc;
using CryptoEat.Services;
using CryptoEat.Models;

namespace CryptoEat.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly SettingsService _settingsService;

    public SettingsController(SettingsService settingsService)
    {
        _settingsService = settingsService;
    }

    [HttpGet]
    public async Task<ActionResult<Settings>> GetSettings()
    {
        await _settingsService.LoadSettingsAsync();
        return Ok(_settingsService.GetSettings());
    }

    [HttpPost]
    public async Task<ActionResult> SaveSettings([FromBody] Settings settings)
    {
        await _settingsService.SaveSettingsAsync(settings);
        return Ok();
    }

    [HttpPost("validate-key")]
    public async Task<ActionResult<bool>> ValidateAntiPublicKey()
    {
        var isValid = await _settingsService.ValidateAntiPublicKeyAsync();
        return Ok(isValid);
    }
}
