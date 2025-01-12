using Ecommerce.Model;
using Ecommerce.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;
        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryService.GetCategories();
            return Ok(categories);
        }
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] Category category)
        {
            await _categoryService.CreateCategory(category);
            return Ok();
        }
        [HttpPut("{name}")]
        public async Task<IActionResult> UpdateCategory(string name, [FromBody] Category category)
        {
            await _categoryService.UpdateCategory(name, category);
            return Ok();
        }
        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteCategory(string name)
        {
            await _categoryService.DeleteCategory(name);
            return Ok();
        }






    }
}
