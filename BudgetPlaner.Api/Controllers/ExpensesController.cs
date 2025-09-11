using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BudgetPlaner.Api.Data;
using BudgetPlaner.Api.Models;

namespace BudgetPlaner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly BudgetContext _db;
    public ExpensesController(BudgetContext db) => _db = db;

    // GET /api/expenses
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Expense>>> Get()
        => Ok(await _db.Expenses
                       .OrderByDescending(e => e.Date)
                       .ToListAsync());

    // GET /api/expenses/5  (optional)
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Expense>> GetById(int id)
    {
        var e = await _db.Expenses.FindAsync(id);
        return e is null ? NotFound() : Ok(e);
    }

    // POST /api/expenses
    [HttpPost]
    public async Task<ActionResult<Expense>> Create([FromBody] Expense dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        _db.Expenses.Add(dto);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }
}