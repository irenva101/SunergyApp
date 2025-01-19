using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Sunergy.Business.Implemention;
using Sunergy.Business.Interface;
using Sunergy.Data.Context;
using Sunergy.Data.Mappings;
using Sunergy.WebApp.Helper;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("SunergyDb");

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.SetIsOriginAllowed(origin => true)
           .AllowAnyHeader()
           .AllowAnyMethod()
           .AllowCredentials();
})
);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = JwtManager.GetTokenValidationParameters();
});
builder.Services.AddDbContext<SolarContext>(x => x.UseSqlServer(connectionString,
    opts =>
    {
        opts.CommandTimeout((int)TimeSpan.FromMinutes(10).TotalSeconds);
        opts.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery);
    })
    .EnableSensitiveDataLogging()
);

builder.Services.AddTransient<SolarContext>();
// Add services to the container.
builder.Services.AddTransient<IMD5Service, MD5Service>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IPanelService, PanelService>();

//Mappings
builder.Services.AddAutoMapper(typeof(PanelProfile));
builder.Services.AddAutoMapper(typeof(UserProfile));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("MyPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
