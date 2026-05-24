namespace PIM_III_Backend.Domain.Entities;

public class Income
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime TransactionDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
