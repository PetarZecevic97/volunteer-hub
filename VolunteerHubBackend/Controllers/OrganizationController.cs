using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VolunteerHubBackend.Entities;
using VolunteerHubBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace VolunteerHubBackend.Controllers
{
    [Authorize(Roles = "Organization,Volunteer")]
    [ApiController]
    [Route("api/[controller]")]
    public class OrganizationController : ControllerBase
    {

        private readonly IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService ?? throw new ArgumentNullException(nameof(organizationService));
        }

        [Route("[action]")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Organization>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Organization>>> GetAllOrganizations()
        {
            var organizations = await _organizationService.GetAllOrganizations();
            return Ok(organizations);
        }


        [Route("[action]/{id}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Organization>), StatusCodes.Status200OK)]
        public async Task<ActionResult<Organization>> GetOrganizationById(string id)
        {
            var result = await _organizationService.GetOrganizationById(id);
            return Ok(result);
        }

        [Authorize(Roles = "Organization")]
        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Organization>), StatusCodes.Status201Created)]
        public async Task<ActionResult<Organization>> CreateOrganization([FromBody] OrganizationCreate organization)
        {
            if (User.FindFirst(ClaimTypes.NameIdentifier).Value != organization.Id)
            {
                return Forbid();
            }
            var res = await _organizationService.CreateOrganization(organization);
            return Ok(res);

        }

        [Authorize(Roles = "Organization")]
        [Route("[action]")]
        [HttpPut]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateOrganization([FromBody] Organization organization)
        {
            if (User.FindFirst(ClaimTypes.NameIdentifier).Value != organization.Id)
            {
                return Forbid();
            }
            await _organizationService.UpdateOrganization(organization);
            return Ok("Organization updated!");
        }

        [Authorize(Roles = "Organization")]
        [Route("[action]")]
        [HttpDelete]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteOrganization([FromBody] Organization organization)
        {
            if (User.FindFirst(ClaimTypes.NameIdentifier).Value != organization.Id)
            {
                return Forbid();
            }
            await _organizationService.DeleteOrganization(organization);
            return Ok("Organization deleted!");
        }


    }
}
