using ElectronNET.API;
using ElectronNET.API.Entities;
using CryptoEat.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddSingleton<SettingsService>();
builder.Services.AddSingleton<CryptoService>();
builder.Services.AddSingleton<NetworkService>();

// Configure Electron
builder.WebHost.UseElectron(args);

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

// Serve React app for non-Electron mode
if (!HybridSupport.IsElectronActive)
{
    app.MapFallbackToFile("index.html");
}

// Configure Electron if active
if (HybridSupport.IsElectronActive)
{
    Task.Run(async () =>
    {
        // Wait for the web server to start
        await Task.Delay(1000);
        
        var window = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
        {
            Width = 1400,
            Height = 900,
            Show = false,
            AutoHideMenuBar = true,
            WebPreferences = new WebPreferences
            {
                NodeIntegration = false,
                ContextIsolation = true,
                EnableRemoteModule = false
            }
        });

        await window.WebContents.Session.ClearCacheAsync();
        window.OnReadyToShow += () => window.Show();
        window.OnClosed += () => Electron.App.Quit();
    });
}

await app.RunAsync();
