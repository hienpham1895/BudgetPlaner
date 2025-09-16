using Microsoft.EntityFrameworkCore;
using BudgetPlaner.Api.Models;


namespace BudgetPlaner.Api.Data;

public class BudgetContext : DbContext
{
    public BudgetContext(DbContextOptions<BudgetContext> options) : base(options) { }
    public DbSet<Expense> Expenses => Set<Expense>();

    public DbSet<Income> Incomes => Set<Income>();

}