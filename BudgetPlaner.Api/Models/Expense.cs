using System.ComponentModel.DataAnnotations;

namespace BudgetPlaner.Api.Models;

public class Expense
{
    public int Id
    {
        get; set;
    }

    [Required]
    public DateTime Date
    {
        get; set;
    }

    [Required]
    public decimal Amount
    {
        get; set;
    }

    [Required]
    public string? Category
    {
        get; set;
    }
    = string.Empty;

    public string? Note
    {
        get; set;
    }


}