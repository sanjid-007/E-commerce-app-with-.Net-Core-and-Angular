using Ecommerce.Model;
using Ecommerce.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly UserService _userService;
        public ProductController(ProductService productService, UserService userService)
        {
            _productService = productService;
            _userService = userService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetProducts();
            return Ok(products);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetProduct(string name)
        {
            var product = await _productService.GetProduct(name);
            return Ok(product);
        }
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Product product, [FromHeader] string userName, [FromHeader] string password)
        {
            User user = await _userService.GetUser(userName, password);
            if (user == null || user.Role != "Admin")
            {
                return Unauthorized();
            }
            await _productService.CreateProduct(product);
            return Ok();
        }
        [HttpPut("{name}")]
        public async Task<IActionResult> UpdateProduct(string name, [FromBody] Product product, [FromHeader] string userName, [FromHeader] string password)
        {
            User user = await _userService.GetUser(userName, password);
            if (user == null || user.Role != "Admin")
            {
                return Unauthorized();
            }
            await _productService.UpdateProduct(name, product);
            return Ok();
        }

        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteProduct(string name, [FromHeader] string userName, [FromHeader] string password)
        {
            User user = await _userService.GetUser(userName, password);
            if (user == null || user.Role != "Admin")
            {
                return Unauthorized();
            }
            await _productService.DeleteProduct(name);
            return Ok();
        }






    }
}