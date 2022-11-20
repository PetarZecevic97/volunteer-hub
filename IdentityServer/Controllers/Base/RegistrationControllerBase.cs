﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using AutoMapper;
using IdentityServer.Entities;
using System.Threading.Tasks;
using IdentityServer.DTOs;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace IdentityServer.Controllers.Base
{
    public class RegistrationControllerBase: ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RegistrationControllerBase(ILogger<AuthenticationController> logger, IMapper mapper, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        protected async Task<IActionResult> RegisterNewUserWithRoles(NewUserDto newUser, IEnumerable<string> roles)
        {
            var user = _mapper.Map<User>(newUser);

            var result = await _userManager.CreateAsync(user, newUser.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            _logger.LogInformation($"Successfully registered user: {user.UserName}.");

            foreach (var role in roles)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);
                if (roleExists)
                {
                    await _userManager.AddToRoleAsync(user, role);
                    _logger.LogInformation($"Added a role {role} to user: {user.UserName}.");
                }
                else
                {
                    _logger.LogInformation($"Role {role} does not exist.");
                }
            }

            return StatusCode(StatusCodes.Status201Created);
        }
    }
}
