using BudgetPlaner.Api.Data;
using Microsoft.EntityFrameworkCore;
using BudgetPlaner.Api.Endpoints; // ← für MapExpensesEndpoints/MapIncomesEndpoints

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BudgetContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("frontend", p => p
        .WithOrigins(builder.Configuration["FrontendOrigin"] ?? "http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("frontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => Results.Ok("BudgetPlaner API läuft"));

// 💡 hier nur noch aufrufen:
app.MapExpensesEndpoints();
app.MapIncomesEndpoints();

app.Run();
