using Ecommerce.Model;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;
        public AuthController(UserService userservice , JwtService jwtService)
        {
            _userService = userservice;
            _jwtService = jwtService;
        }
        [HttpPost("register/Customer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] User user)
        {
            
            user.Role = "Customer";
            await _userService.CreateUser(user);
            User userr = await _userService.GetUser(user.Name, user.Password);
           
            var jwt = _jwtService.Generate(userr.Id);
            return Ok(jwt);


        }
        [HttpPost("register/Admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] User user)
        {
            user.Role = "Admin";
            await _userService.CreateUser(user);
            return Ok();
        }
        [HttpPost("login/Customer")]
        public async Task<IActionResult> LoginCustomer([FromBody] User user)
        {
            var existingUser = await _userService.GetUser(user.Name, user.Password);
            if (existingUser == null || existingUser.Role != "Customer")
            {
                return Unauthorized();
            }
            return Ok();
        }
        [HttpPost("login/Admin")]
        public async Task<IActionResult> LoginAdmin([FromBody] User user)
        {
            var existingUser = await _userService.GetUser(user.Name, user.Password);
            if (existingUser == null || existingUser.Role != "Admin")
            {
                return Unauthorized();
            }
            return Ok();
        }
        [HttpGet("all")]
        [Authorize]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsers();
            return Ok(users);
        }

       






    }
}