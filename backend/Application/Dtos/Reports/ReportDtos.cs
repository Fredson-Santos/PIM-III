namespace PIM_III_Backend.Application.Dtos.Reports;

public record LargestExpenseDto(decimal Amount, string Description);

public record ReportSummaryResponse(
    decimal TotalBudget,
    decimal TotalSpent,
    decimal RemainingBudget,
    double OverallPercentage,
    LargestExpenseDto? LargestExpense
);

public record CategoryReportResponse(
    int CategoryId,
    string CategoryName,
    decimal TotalSpent,
    decimal? BudgetLimit,
    double PercentageUsed
);

public record TrendReportResponse(
    string Period, // Ex: "Jan/2026"
    decimal Value
);
