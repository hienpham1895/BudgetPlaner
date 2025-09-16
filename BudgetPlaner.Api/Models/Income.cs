namespace BudgetPlaner.Api.Models
{
    public class Income
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string? Category { get; set; } // optional
        public string? Note { get; set; }     // „Beschreibung“
    }
}
