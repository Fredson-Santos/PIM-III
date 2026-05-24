namespace PIM_III_Backend.Application.Dtos.Incomes;

public record IncomeResponse(
    int Id,
    int UserId,
    string Description,
    decimal Amount,
    DateTime TransactionDate,
    DateTime CreatedAt
);

public record CreateIncomeRequest(
    string Description,
    decimal Amount,
    DateTime TransactionDate
);
