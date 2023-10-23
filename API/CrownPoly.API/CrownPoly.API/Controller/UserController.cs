﻿using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CrownPoly.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly JwtToken _jwtToken;

        public UserController(IUnitOfWork unitOfWork, IConfiguration configuration, JwtToken jwtToken)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _jwtToken = jwtToken;
        }

       

        [HttpPost]
        [Route("UserLogin")]
        public async Task<IActionResult> UserLogin(User userLogin)
        {
            try
            {
                var authenticatedUser = await _unitOfWork.Users.Login(new User
                {
                    FirstName = userLogin.FirstName,
                    LastName = userLogin.LastName,
                    Pin = userLogin.Pin
                });

                if (authenticatedUser != null)
                {
                    var token = _jwtToken.GenerateJwtToken(userLogin);

                    return Ok(new { User = authenticatedUser, Token = token });
                }
                else
                {
                    return BadRequest("Invalid username or password");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred during login: " + ex.Message);
            }
        }



        [Authorize]
        [HttpPost]
        [Route("AddUser")]
        public async Task<IActionResult> AddUser(User user)
        {
            var userData = await _unitOfWork.Users.AddAsync(user);
            if (userData == 0)
            {
                return BadRequest(new { message = "Failed to add the user." });
            }
            return Ok(new { message = "User added successfully", data = userData });
        }

        [Authorize]
        [HttpPost]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _unitOfWork.Users.GetAllAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpGet]
        [Route("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(id);
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }

        [Authorize]
        [HttpPost]
        [Route("UpdateUser")]
        public async Task<IActionResult> UpdateUser(User user)
        {
            var affectedRows = await _unitOfWork.Users.UpdateAsync(user);
            if (affectedRows > 0)
            {
                return Ok(new { message = "User updated successfully", data = user });
            }
            return BadRequest("Failed to update the user.");
        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var affectedRows = await _unitOfWork.Users.DeleteAsync(id);
            if (affectedRows > 0)
            {
                return Ok(new { message = "User deleted successfully" });
            }
            return BadRequest("Failed to delete the user.");
        }

       
    }
}
