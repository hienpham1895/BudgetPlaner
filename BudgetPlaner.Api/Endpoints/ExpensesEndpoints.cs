using BudgetPlaner.Api.Data;
using BudgetPlaner.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetPlaner.Api.Endpoints;

public static class ExpensesEndpoints
{
    public static IEndpointRouteBuilder MapExpensesEndpoints(this IEndpointRouteBuilder app)
    {
        var g = app.MapGroup("/api/expenses").WithTags("Expenses");

        g.MapGet("", async (BudgetContext db) =>
            await db.Expenses.OrderByDescending(x => x.Date).ToListAsync());

        g.MapPost("", async (Expense dto, BudgetContext db) =>
        {
            db.Expenses.Add(dto);
            await db.SaveChangesAsync();
            return Results.Created($"/api/expenses/{dto.Id}", dto);
        });

        // ⬇️ HIER der Update-Endpoint
        g.MapPut("/{id:int}", async (int id, Expense dto, BudgetContext db) =>
        {
            var entity = await db.Expenses.FindAsync(id);
            if (entity is null) return Results.NotFound();

            entity.Date = dto.Date;
            entity.Amount = dto.Amount;
            entity.Category = dto.Category;
            entity.Note = dto.Note;

            await db.SaveChangesAsync();
            return Results.Ok(entity);
        });

        g.MapDelete("/{id:int}", async (int id, BudgetContext db) =>
        {
            var entity = await db.Expenses.FindAsync(id);
            if (entity is null) return Results.NotFound();

            db.Expenses.Remove(entity);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        return app;
    }
}
