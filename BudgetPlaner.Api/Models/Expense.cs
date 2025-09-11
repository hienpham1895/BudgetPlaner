using System.ComponentModel.DataAnnotations;

namespace BudgetPlaner.Api.Models;

public class Expense
{
    public int Id
    {
        get; set;
    }

    [Required]
    public DateOnly Date
    {
        get; set;
    }

    [Required]
    public decimal Amount
    {
        get; set;
    }

    [Required]
    public String Category
    {
        get; set;
    }
    = string.Empty;

    public string? Note
    {
        get; set;
    }


}