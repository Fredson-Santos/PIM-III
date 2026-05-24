using FluentValidation.TestHelper;
using PIM_III_Backend.Application.Dtos.Expenses;
using PIM_III_Backend.Application.Validators;
using Xunit;

namespace PIM_III_Backend.Tests.Unit.Validators;

public class CreateExpenseValidatorTests
{
    private readonly CreateExpenseValidator _validator;

    public CreateExpenseValidatorTests()
    {
        _validator = new CreateExpenseValidator();
    }

    [Fact]
    public void Should_Have_Error_When_Value_Is_Zero()
    {
        var model = new CreateExpenseRequest(1, "Desc", 0, DateTime.Now, "", false);
        var result = _validator.TestValidate(model);
        result.ShouldHaveValidationErrorFor(x => x.Value);
    }

    [Fact]
    public void Should_Have_Error_When_Description_Is_Empty()
    {
        var model = new CreateExpenseRequest(1, "", 10, DateTime.Now, "", false);
        var result = _validator.TestValidate(model);
        result.ShouldHaveValidationErrorFor(x => x.Description);
    }

    [Fact]
    public void Should_Not_Have_Error_When_Model_Is_Valid()
    {
        var model = new CreateExpenseRequest(1, "Almoço", 25.50m, DateTime.Now, "Obs", false);
        var result = _validator.TestValidate(model);
        result.ShouldNotHaveAnyValidationErrors();
    }
}
