using System.Net;
using System.Net.Http;
using CryptoEat.Models;

namespace CryptoEat.Services;

public class NetworkService
{
    private readonly HttpClient _httpClient;
    private readonly SettingsService _settingsService;
    private readonly List<ProxyInfo> _proxies = new();

    public NetworkService(SettingsService settingsService)
    {
        _settingsService = settingsService;
        _httpClient = new HttpClient();
    }

    public async Task LoadProxiesAsync()
    {
        var settings = _settingsService.GetSettings();
        if (string.IsNullOrEmpty(settings.ProxyPath) || !File.Exists(settings.ProxyPath))
            return;

        var lines = await File.ReadAllLinesAsync(settings.ProxyPath);
        _proxies.Clear();

        foreach (var line in lines)
        {
            if (TryParseProxy(line, settings.ProxyFormat, out var proxy))
                _proxies.Add(proxy);
        }
    }

    private bool TryParseProxy(string line, string? format, out ProxyInfo proxy)
    {
        proxy = new ProxyInfo();
        var parts = line.Split(':');
        
        if (parts.Length < 2) return false;

        proxy.Host = parts[0];
        var proxyPort = proxy.Port;
        if (!int.TryParse(parts[1], out proxyPort)) return false;
        
        proxy.Port = proxyPort;
        
        if (parts.Length >= 4)
        {
            proxy.Username = parts[2];
            proxy.Password = parts[3];
        }

        proxy.Type = format?.ToLower() switch
        {
            "http" => ProxyType.Http,
            "socks4" => ProxyType.Socks4,
            "socks5" => ProxyType.Socks5,
            _ => ProxyType.Http
        };

        return true;
    }

    public async Task<HttpResponseMessage> SendRequestAsync(string url, ProxyInfo? proxy = null)
    {
        var handler = new HttpClientHandler();
        
        if (proxy != null)
        {
            var webProxy = new WebProxy($"{proxy.Host}:{proxy.Port}");
            if (!string.IsNullOrEmpty(proxy.Username))
            {
                webProxy.Credentials = new NetworkCredential(proxy.Username, proxy.Password);
            }
            handler.Proxy = webProxy;
            handler.UseProxy = true;
        }

        using var client = new HttpClient(handler);
        return await client.GetAsync(url);
    }

    public ProxyInfo? GetRandomProxy()
    {
        return _proxies.Count > 0 ? _proxies[Random.Shared.Next(_proxies.Count)] : null;
    }
}
