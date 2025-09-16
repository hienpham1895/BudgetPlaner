using BudgetPlaner.Api.Data;
using BudgetPlaner.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetPlaner.Api.Endpoints;

public static class IncomesEndpoints
{
    public static IEndpointRouteBuilder MapIncomesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/incomes").WithTags("Incomes");

        group.MapGet("", async (BudgetContext db) =>
            await db.Incomes.OrderByDescending(x => x.Date).ToListAsync());

        group.MapPost("", async (Income dto, BudgetContext db) =>
        {
            db.Incomes.Add(dto);
            await db.SaveChangesAsync();
            return Results.Created($"/api/incomes/{dto.Id}", dto);
        });

        group.MapPut("/{id:int}", async (int id, Income dto, BudgetContext db) =>
        {
            var entity = await db.Incomes.FindAsync(id);
            if (entity is null) return Results.NotFound();

            entity.Date = dto.Date;
            entity.Amount = dto.Amount;
            entity.Category = dto.Category;
            entity.Note = dto.Note;

            await db.SaveChangesAsync();
            return Results.Ok(entity);
        });

        group.MapDelete("/{id:int}", async (int id, BudgetContext db) =>
        {
            var entity = await db.Incomes.FindAsync(id);
            if (entity is null) return Results.NotFound();

            db.Incomes.Remove(entity);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        return app;
    }
}
