using System.Net;
using System.Net.Http;
using CryptoEat.Models;

namespace CryptoEat.Modules.Network;

public class Proxy
{
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public ProxyType Type { get; set; }

    public static Proxy? InitFromString(string proxyString, string format)
    {
        var parts = proxyString.Split(':');
        if (parts.Length < 2) return null;

        var proxy = new Proxy
        {
            Host = parts[0],
            Type = format?.ToLower() switch
            {
                "http" => ProxyType.Http,
                "socks4" => ProxyType.Socks4,
                "socks5" => ProxyType.Socks5,
                _ => ProxyType.Http
            }
        };

        var proxyPort = proxy.Port;
        if (!int.TryParse(parts[1], out proxyPort)) return null;

        proxy.Port = proxyPort;
        
        if (parts.Length >= 4)
        {
            proxy.Username = parts[2];
            proxy.Password = parts[3];
        }

        return proxy;
    }

    public bool Check()
    {
        try
        {
            using var handler = new HttpClientHandler();
            var webProxy = new WebProxy($"{Host}:{Port}");

            if (!string.IsNullOrEmpty(Username))
            {
                webProxy.Credentials = new NetworkCredential(Username, Password);
            }

            handler.Proxy = webProxy;
            handler.UseProxy = true;

            using var client = new HttpClient(handler);
            client.Timeout = TimeSpan.FromSeconds(10);

            var response = client.GetAsync("http://httpbin.org/ip").Result;
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }
}