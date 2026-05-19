using Microsoft.AspNetCore.Mvc;
using PIM_III_Backend.Application.Dtos.Categories;
using PIM_III_Backend.Application.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace PIM_III_Backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _service;

    public CategoriesController(ICategoryService service)
    {
        _service = service;
    }

    private int GetCurrentUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetAll()
    {
        return Ok(await _service.GetAllAsync(GetCurrentUserId()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryResponse>> GetById(int id)
    {
        var category = await _service.GetByIdAsync(id, GetCurrentUserId());
        if (category == null) return NotFound();
        return Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<CategoryResponse>> Create(CreateCategoryRequest request)
    {
        var category = await _service.CreateAsync(request, GetCurrentUserId());
        return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateCategoryRequest request)
    {
        try
        {
            await _service.UpdateAsync(id, request, GetCurrentUserId());
            return NoContent();
        }
        catch (Exception)
        {
            return NotFound();
        }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id, GetCurrentUserId());
        return NoContent();
    }
}
