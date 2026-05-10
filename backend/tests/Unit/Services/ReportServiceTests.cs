using FluentAssertions;
using Moq;
using PIM_III_Backend.Application.Services;
using PIM_III_Backend.Domain.Entities;
using PIM_III_Backend.Domain.Interfaces;
using Xunit;

namespace PIM_III_Backend.Tests.Unit.Services;

public class ReportServiceTests
{
    private readonly Mock<IExpenseRepository> _expenseRepoMock;
    private readonly ReportService _service;

    public ReportServiceTests()
    {
        _expenseRepoMock = new Mock<IExpenseRepository>();
        _service = new ReportService(_expenseRepoMock.Object);
    }

    [Fact]
    public async Task GetSummaryAsync_Should_Calculate_Correct_Totals()
    {
        // Arrange
        var userId = 1;
        var expenses = new List<Expense>
        {
            new Expense { Value = 100, Description = "Gasto 1" },
            new Expense { Value = 250, Description = "Gasto 2" },
            new Expense { Value = 50, Description = "Gasto 3" }
        };
        _expenseRepoMock.Setup(x => x.GetByUserIdAsync(userId, null, null, null)).ReturnsAsync(expenses);

        // Act
        var result = await _service.GetSummaryAsync(userId);

        // Assert
        result.TotalExpenses.Should().Be(400);
        result.HighestExpenseValue.Should().Be(250);
        result.HighestExpenseDescription.Should().Be("Gasto 2");
    }

    [Fact]
    public async Task GetByCategoryAsync_Should_Calculate_Percentages()
    {
        // Arrange
        var userId = 1;
        var expenses = new List<Expense>
        {
            new Expense { Value = 100, CategoryId = 1, Category = new Category { Name = "Alimentação" } },
            new Expense { Value = 300, CategoryId = 2, Category = new Category { Name = "Transporte" } }
        };
        _expenseRepoMock.Setup(x => x.GetByUserIdAsync(userId, null, null, null)).ReturnsAsync(expenses);

        // Act
        var result = await _service.GetByCategoryAsync(userId);

        // Assert
        result.Should().HaveCount(2);
        result.First(x => x.CategoryName == "Transporte").Percentage.Should().Be(75);
        result.First(x => x.CategoryName == "Alimentação").Percentage.Should().Be(25);
    }
}
