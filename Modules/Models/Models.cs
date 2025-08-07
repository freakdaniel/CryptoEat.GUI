using Newtonsoft.Json;

namespace CryptoEat.Models;

public class Settings
{
    [JsonProperty("antipublicKey")] public string? AntiPublicKey { get; set; }
    [JsonProperty("bruteLevel")] public int BruteLevel { get; set; }
    [JsonProperty("strongBrute")] public bool StrongBrute { get; set; }
    [JsonProperty("seedGrabber")] public bool SeedGrabber { get; set; }
    [JsonProperty("scan")] public bool Scan { get; set; }
    [JsonProperty("gpuBrute")] public bool GpuBrute { get; set; }
    [JsonProperty("bruteTopPercent")] public int BruteTopPercent { get; set; }
    [JsonProperty("balanceThreshold")] public decimal BalanceThreshold { get; set; }
    [JsonProperty("scanDepth")] public int ScanDepth { get; set; }
    [JsonProperty("addressToSend")] public string? AddressToSend { get; set; }
    [JsonProperty("proxyList")] public string? ProxyPath { get; set; }
    [JsonProperty("proxyFormat")] public string? ProxyFormat { get; set; }
    public int BruteTopCount { get; set; }
    public bool AntipublicWorking { get; set; } = true;
}

public class ScanResult
{
    public string WalletPath { get; set; } = string.Empty;
    public bool IsValid { get; set; }
    public decimal Balance { get; set; }
    public List<string> Addresses { get; set; } = new();
    public DateTime ScanTime { get; set; } = DateTime.Now;
}

public class WalletInfo
{
    public string Name { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public List<string> Addresses { get; set; } = new();
    public bool IsEncrypted { get; set; }
}

public class BruteForceResult
{
    public bool Success { get; set; }
    public int AttemptedPasswords { get; set; }
    public string? FoundPassword { get; set; }
    public TimeSpan Duration { get; set; }
}

public class ProxyInfo
{
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public ProxyType Type { get; set; }
}

public enum ProxyType
{
    Http,
    Socks4,
    Socks5
}

public class NetworkStats
{
    public int TotalRequests { get; set; }
    public int SuccessfulRequests { get; set; }
    public int FailedRequests { get; set; }
    public int ActiveProxies { get; set; }
    public TimeSpan AverageResponseTime { get; set; }
}