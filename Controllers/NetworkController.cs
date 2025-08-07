using Microsoft.AspNetCore.Mvc;
using CryptoEat.Services;
using CryptoEat.Models;

namespace CryptoEat.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NetworkController : ControllerBase
{
    private readonly NetworkService _networkService;

    public NetworkController(NetworkService networkService)
    {
        _networkService = networkService;
    }

    [HttpPost("load-proxies")]
    public async Task<ActionResult> LoadProxies()
    {
        await _networkService.LoadProxiesAsync();
        return Ok();
    }

    [HttpGet("test-connection")]
    public async Task<ActionResult<bool>> TestConnection([FromQuery] string url)
    {
        try
        {
            var response = await _networkService.SendRequestAsync(url);
            return Ok(response.IsSuccessStatusCode);
        }
        catch
        {
            return Ok(false);
        }
    }

    [HttpGet("proxy-status")]
    public ActionResult<object> GetProxyStatus()
    {
        var proxy = _networkService.GetRandomProxy();
        return Ok(new { HasProxies = proxy != null });
    }
}
