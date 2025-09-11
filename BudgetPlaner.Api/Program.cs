using Microsoft.EntityFrameworkCore;
using BudgetPlaner.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS erlauben (Vite-Dev-Server)
const string FrontendOrigin = "http://localhost:5173";
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(FrontendOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// DbContext registrieren mit SQLite
builder.Services.AddDbContext<BudgetContext>(options =>
    options.UseSqlite("Data Source=budget.db"));

// .NET 9: Generiert die OpenAPI-JSON
builder.Services.AddOpenApi();

var app = builder.Build();

// Pipeline

// OpenAPI-JSON unter /openapi/v1.json
app.MapOpenApi();


//Swagger-UI
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", () => Results.Ok("BudgetPlaner API läuft"));

app.UseAuthorization();

app.MapControllers();

app.Run();


