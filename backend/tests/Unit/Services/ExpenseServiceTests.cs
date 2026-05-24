using FluentAssertions;
using Moq;
using PIM_III_Backend.Application.Dtos.Expenses;
using PIM_III_Backend.Application.Services;
using PIM_III_Backend.Domain.Entities;
using PIM_III_Backend.Domain.Interfaces;
using Xunit;

namespace PIM_III_Backend.Tests.Unit.Services;

public class ExpenseServiceTests
{
    private readonly Mock<IExpenseRepository> _repositoryMock;
    private readonly ExpenseService _service;

    public ExpenseServiceTests()
    {
        _repositoryMock = new Mock<IExpenseRepository>();
        _service = new ExpenseService(_repositoryMock.Object);
    }

    [Fact]
    public async Task CreateAsync_Should_Return_ExpenseResponse()
    {
        // Arrange
        var userId = 1;
        var request = new CreateExpenseRequest(1, "Teste", 100, DateTime.Now, "", false);
        var expense = new Expense { Id = 1, UserId = userId, CategoryId = 1, Description = "Teste", Value = 100 };
        
        _repositoryMock.Setup(x => x.AddAsync(It.IsAny<Expense>())).Returns(Task.CompletedTask);
        _repositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<int>())).ReturnsAsync(expense);

        // Act
        var result = await _service.CreateAsync(userId, request);

        // Assert
        result.Should().NotBeNull();
        result.Value.Should().Be(100);
        _repositoryMock.Verify(x => x.AddAsync(It.IsAny<Expense>()), Times.Once);
    }

    [Fact]
    public async Task GetUserExpensesAsync_Should_Filter_By_User()
    {
        // Arrange
        var userId = 1;
        var expenses = new List<Expense> 
        { 
            new Expense { Id = 1, UserId = userId, Value = 50, Category = new Category { Name = "Cat1" } } 
        };
        _repositoryMock.Setup(x => x.GetByUserIdAsync(userId, null, null, null)).ReturnsAsync(expenses);

        // Act
        var result = await _service.GetUserExpensesAsync(userId);

        // Assert
        result.Should().HaveCount(1);
        result.First().Value.Should().Be(50);
    }
}
