using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VolunteerHubBackend.Entities;
using VolunteerHubBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace VolunteerHubBackend.Controllers
{
    [Authorize(Roles = "User")]
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
        public async Task<ActionResult<Organization>> GetOrganizationById(int id)
        {
            var result = await _organizationService.GetOrganizationById(id);
            return Ok(result);
        }

        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Organization>), StatusCodes.Status201Created)]
        public async Task<ActionResult<Organization>> CreateOrganization([FromBody] OrganizationCreate organization)
        {
            var res = await _organizationService.CreateOrganization(organization);
            return Ok(res);

        }

        [Route("[action]")]
        [HttpPut]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateOrganization([FromBody] Organization organization)
        {
            await _organizationService.UpdateOrganization(organization);
            return Ok("Organization updated!");
        }

        [Route("[action]")]
        [HttpDelete]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteOrganization([FromBody] Organization organization)
        {
            await _organizationService.DeleteOrganization(organization);
            return Ok("Organization deleted!");
        }


    }
}
