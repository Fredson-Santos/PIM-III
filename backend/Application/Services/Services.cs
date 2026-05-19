using PIM_III_Backend.Application.Dtos.Categories;
using PIM_III_Backend.Application.Dtos.Expenses;
using PIM_III_Backend.Domain.Entities;
using PIM_III_Backend.Domain.Interfaces;

namespace PIM_III_Backend.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repository;
    private readonly IBudgetRepository _budgetRepository;

    public CategoryService(ICategoryRepository repository, IBudgetRepository budgetRepository)
    {
        _repository = repository;
        _budgetRepository = budgetRepository;
    }

    public async Task<IEnumerable<CategoryResponse>> GetAllAsync(int userId)
    {
        var now = DateTime.UtcNow;
        var categories = await _repository.GetAllAsync();
        var budgets = await _budgetRepository.GetByUserIdAsync(userId);
        var currentBudgets = budgets.Where(x => x.PeriodYear == now.Year && x.PeriodMonth == now.Month).ToList();
        if (!currentBudgets.Any() && budgets.Any()) currentBudgets = budgets.ToList();

        return categories.Select(c => 
        {
            var budget = currentBudgets.FirstOrDefault(b => b.CategoryId == c.Id);
            return new CategoryResponse(c.Id, c.Name, c.Description, c.ColorCode, c.Icon, c.CreatedAt, budget?.LimitValue);
        });
    }

    public async Task<CategoryResponse?> GetByIdAsync(int id, int userId)
    {
        var now = DateTime.UtcNow;
        var c = await _repository.GetByIdAsync(id);
        if (c == null) return null;

        var budget = await _budgetRepository.GetByUserAndCategoryAsync(userId, id, now.Month, now.Year);
        return new CategoryResponse(c.Id, c.Name, c.Description, c.ColorCode, c.Icon, c.CreatedAt, budget?.LimitValue);
    }

    public async Task<CategoryResponse> CreateAsync(CreateCategoryRequest request, int userId)
    {
        var now = DateTime.UtcNow;
        var category = new Category
        {
            Name = request.Name,
            Description = request.Description,
            ColorCode = request.ColorCode,
            Icon = request.Icon
        };

        await _repository.AddAsync(category);

        if (request.BudgetLimit.HasValue && request.BudgetLimit.Value > 0)
        {
            var budget = new Budget
            {
                UserId = userId,
                CategoryId = category.Id,
                LimitValue = request.BudgetLimit.Value,
                PeriodMonth = now.Month,
                PeriodYear = now.Year,
                CreatedAt = now,
                UpdatedAt = now
            };
            await _budgetRepository.AddAsync(budget);
        }

        return new CategoryResponse(category.Id, category.Name, category.Description, category.ColorCode, category.Icon, category.CreatedAt, request.BudgetLimit);
    }

    public async Task UpdateAsync(int id, UpdateCategoryRequest request, int userId)
    {
        var now = DateTime.UtcNow;
        var category = await _repository.GetByIdAsync(id);
        if (category == null) throw new Exception("Category not found");

        category.Name = request.Name;
        category.Description = request.Description;
        category.ColorCode = request.ColorCode;
        category.Icon = request.Icon;

        await _repository.UpdateAsync(category);

        if (request.BudgetLimit.HasValue)
        {
            var budget = await _budgetRepository.GetByUserAndCategoryAsync(userId, id, now.Month, now.Year);
            if (budget != null)
            {
                budget.LimitValue = request.BudgetLimit.Value;
                budget.UpdatedAt = now;
                await _budgetRepository.UpdateAsync(budget);
            }
            else if (request.BudgetLimit.Value > 0)
            {
                var newBudget = new Budget
                {
                    UserId = userId,
                    CategoryId = id,
                    LimitValue = request.BudgetLimit.Value,
                    PeriodMonth = now.Month,
                    PeriodYear = now.Year,
                    CreatedAt = now,
                    UpdatedAt = now
                };
                await _budgetRepository.AddAsync(newBudget);
            }
        }
    }

    public async Task DeleteAsync(int id, int userId)
    {
        var category = await _repository.GetByIdAsync(id);
        if (category == null) throw new Exception("Category not found");
        
        // TODO: Adicionar validação adicional se necessário (ex: verificar se há gastos na categoria)
        await _repository.DeleteAsync(id);
    }
}
