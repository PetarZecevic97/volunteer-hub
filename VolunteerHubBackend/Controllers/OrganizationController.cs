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

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Organization>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Organization>>> GetAllOrganizations()
        {
            var organizations = await _organizationService.GetAllOrganizations();
            return Ok(organizations);
        }


        [HttpGet("{id}", Name = "GetOrganization")]
        [ProducesResponseType(typeof(IEnumerable<Organization>), StatusCodes.Status200OK)]
        public async Task<ActionResult<Organization>> GetOrganizationById(string id)
        {
            var result = await _organizationService.GetOrganizationById(id);
            if (result.Id == null)
            {
                return NotFound(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "Organization")]
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Organization>), StatusCodes.Status201Created)]
        public async Task<ActionResult<Organization>> CreateOrganization([FromBody] OrganizationCreate organization)
        {
            if (User.FindFirst("id").Value != organization.Id)
            {
                return Forbid();
            }
            var res = await _organizationService.CreateOrganization(organization);
            if(res.Id == null)
            {
                return NotFound(res);
            }
            return Ok(res);

        }

        [Authorize(Roles = "Organization")]
        [HttpPut("{id}", Name = "PutOrganization")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<ActionResult<Organization>> UpdateOrganization([FromRoute] string id, [FromBody] Organization organization)
        {
            if (User.FindFirst("id").Value != organization.Id)
            {
                return Forbid();
            }
            if (User.FindFirst("id").Value != id)
            {
                return Forbid();
            }
            Organization  result = await _organizationService.UpdateOrganization(organization);
            return Ok(result);
        }

        [Authorize(Roles = "Organization")]
        [HttpDelete("{id}", Name = "DeleteOrganization")]
        [ProducesResponseType(typeof(string), StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteOrganization(String id)
        {
            if (User.FindFirst("id").Value != id)
            {
                return Forbid();
            }
            await _organizationService.DeleteOrganization(id);
            return Ok("Organization deleted!");
        }


    }
}
