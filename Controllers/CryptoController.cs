using Microsoft.AspNetCore.Mvc;
using CryptoEat.Services;
using CryptoEat.Models;

namespace CryptoEat.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CryptoController : ControllerBase
{
    private readonly CryptoService _cryptoService;

    public CryptoController(CryptoService cryptoService)
    {
        _cryptoService = cryptoService;
    }

    [HttpPost("scan-wallet")]
    public async Task<ActionResult<ScanResult>> ScanWallet([FromBody] string walletPath)
    {
        var result = await _cryptoService.ScanWalletAsync(walletPath);
        return Ok(result);
    }

    [HttpPost("process-folder")]
    public async Task<ActionResult<List<WalletInfo>>> ProcessFolder([FromBody] string folderPath)
    {
        var results = await _cryptoService.ProcessWalletsAsync(folderPath);
        return Ok(results);
    }

    [HttpPost("brute-force")]
    public async Task<ActionResult<BruteForceResult>> BruteForce([FromBody] string target)
    {
        var result = await _cryptoService.PerformBruteForceAsync(target);
        return Ok(result);
    }
}
