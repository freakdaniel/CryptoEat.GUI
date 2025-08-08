using ElectronNET.API;
using ElectronNET.API.Entities;
using CryptoEat.Services;
using Microsoft.Extensions.FileProviders;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddSingleton<SettingsService>();
builder.Services.AddSingleton<CryptoService>();
builder.Services.AddSingleton<NetworkService>();

// Configure Electron
builder.WebHost.UseElectron(args);

// Configure port to match electron.manifest.json
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(8001);
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Configure static files to serve React build
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ClientApp", "build")),
    RequestPath = ""
});

// Also serve static files with /static prefix for React assets
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ClientApp", "build", "static")),
    RequestPath = "/static"
});

app.UseRouting();
app.MapControllers();

// Fallback to index.html for SPA routes
app.MapFallbackToFile("index.html", new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ClientApp", "build"))
});

// Open the Electron window BEFORE app.Run()
if (HybridSupport.IsElectronActive)
{
    Task.Run(async () =>
    {
        // Wait for the web server to start
        await Task.Delay(2000);
        
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

        window.OnReadyToShow += () => window.Show();
        window.OnClosed += () => Electron.App.Quit();
    });
}

app.Run();
