using CryptoEat.Models;

using Newtonsoft.Json;

namespace CryptoEat.Services;

public class SettingsService
{
    private Settings _settings = new();
    private readonly string _settingsPath = "settings.json";

    public Settings GetSettings() => _settings;

    public async Task LoadSettingsAsync()
    {
        try
        {
            if (File.Exists(_settingsPath))
            {
                var json = await File.ReadAllTextAsync(_settingsPath);
                _settings = JsonConvert.DeserializeObject<Settings>(json) ?? new Settings();
            }
        }
        catch (Exception)
        {
            _settings = new Settings();
        }
    }

    public async Task SaveSettingsAsync(Settings settings)
    {
        _settings = settings;
        var json = JsonConvert.SerializeObject(_settings, Formatting.Indented);
        await File.WriteAllTextAsync(_settingsPath, json);
    }

    public async Task<bool> ValidateAntiPublicKeyAsync()
    {
        // TODO: Implement validation logic without Leaf.xNet
        return !string.IsNullOrEmpty(_settings.AntiPublicKey);
    }
}
