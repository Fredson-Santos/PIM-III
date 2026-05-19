using PIM_III_Backend.Application.Dtos.Incomes;
using PIM_III_Backend.Domain.Entities;
using PIM_III_Backend.Domain.Interfaces;

namespace PIM_III_Backend.Application.Services;

public class IncomeService : IIncomeService
{
    private readonly IIncomeRepository _repository;

    public IncomeService(IIncomeRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<IncomeResponse>> GetUserIncomesAsync(int userId, DateTime? start = null, DateTime? end = null)
    {
        var incomes = await _repository.GetByUserIdAsync(userId, start, end);
        return incomes.Select(MapToResponse);
    }

    public async Task<IncomeResponse?> GetByIdAsync(int id, int userId)
    {
        var income = await _repository.GetByIdAsync(id);
        if (income == null || income.UserId != userId)
            return null;

        return MapToResponse(income);
    }

    public async Task<IncomeResponse> CreateAsync(int userId, CreateIncomeRequest request)
    {
        if (request.Amount <= 0)
            throw new ArgumentException("O valor da entrada deve ser maior que zero");

        if (request.TransactionDate > DateTime.UtcNow)
            throw new ArgumentException("A data da entrada não pode ser no futuro");

        var income = new Income
        {
            UserId = userId,
            Description = request.Description,
            Amount = request.Amount,
            TransactionDate = request.TransactionDate,
            CreatedAt = DateTime.UtcNow
        };

        await _repository.AddAsync(income);

        return MapToResponse(income);
    }

    public async Task DeleteAsync(int id, int userId)
    {
        var income = await _repository.GetByIdAsync(id);
        if (income == null || income.UserId != userId)
            throw new Exception("Entrada não encontrada ou sem permissão");

        await _repository.DeleteAsync(id);
    }

    private static IncomeResponse MapToResponse(Income income)
    {
        return new IncomeResponse(
            income.Id,
            income.UserId,
            income.Description,
            income.Amount,
            income.TransactionDate,
            income.CreatedAt
        );
    }
}
