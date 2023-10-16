using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CrownPoly.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("UserLogin")]
        public async Task<IActionResult> UserLogin(User user)
        {
            var existingUser = await _unitOfWork.Users.GetByIdAsync(user.Id);

            if (existingUser != null)
            {
                var isLoginSuccessful = CheckCredentials(existingUser, user);
                if (isLoginSuccessful)
                {
                    return Ok(new { message = "Login successful" });
                }
            }
            return Unauthorized(new { message = "Incorrect username or password" });
        }
        private bool CheckCredentials(User existingUser, User user)
        {
            // need to work on it
            return true;
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser(User user)
        {
            var userData = await _unitOfWork.Users.AddAsync(user);
            if (userData == 0)
            {
                return BadRequest(new { message = "Failed to add the user." });
            }
            return Ok(new { message = "User added successfully", data = userData });
        }
    }
}
