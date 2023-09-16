using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using VolunteerHubBackend.Entities;
using VolunteerHubBackend.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VolunteerHubBackend.Controllers
{
    [Authorize(Roles = "Organization,Volunteer")]
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteerController : ControllerBase
    {
        private readonly IVolunteerService _service;

        public VolunteerController(IVolunteerService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<VolunteerInfo>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<VolunteerInfo>>> GetVolunteers()
        {
            var products = await _service.GetVolunteers();
            return Ok(products);
        }

        [HttpGet("{id}", Name = "GetProduct")]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        public async Task<ActionResult<VolunteerInfo>> GetVolunteerById(string id)
        {
            var products = await _service.GetVolunteer(id);
            return Ok(products);
        }

        [Route("[action]/{skills}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<VolunteerInfo>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<VolunteerInfo>>> GetVolunteersBySkill(string skills)
        {
            var products = await _service.GetVolunteersBySkills(skills);
            return Ok(products);
        }

        [Authorize(Roles = "Volunteer")]
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<VolunteerInfo>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ContentResult), StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<VolunteerInfo>> CreateVolunteer([FromBody] VolunteerInfoCreate volunteerRequest)

        {
            VolunteerInfo volunteer = new VolunteerInfo()
            {
                Id = User.FindFirst("id").Value,
                FirstName = volunteerRequest.FirstName,
                LastName = volunteerRequest.LastName,
                Email = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value,
                Skills = volunteerRequest.Skills
            };          
            var product = await _service.CreateVolunteer(volunteer);
            return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
        }

        [Authorize(Roles = "Volunteer")]
        [HttpPut("{id}", Name = "UpdateVolunteer")]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ContentResult), StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<VolunteerInfo>> UpdateVolunteer([FromRoute] string id, [FromBody] VolunteerInfo volunteer)
        {
            if (User.FindFirst("id").Value != volunteer.Id)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "Cannot update other volunteer profile.",
                    ContentType = "text/plain"
                };
            }
            if (User.FindFirst("id").Value != id)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "ID value from Route must match ID value from jwt token.",
                    ContentType = "text/plain"
                };
            }
            return Ok(await _service.UpdateVolunteer(volunteer));
        }

        [Authorize(Roles = "Volunteer")]
        [HttpDelete("{id}", Name = "DeleteProduct")]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ContentResult), StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> DeleteVolunteer(string id)
        {
            if (User.FindFirst("id").Value != id)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "Cannot delete other volunteer profile.",
                    ContentType = "text/plain"
                };
            }
            return Ok(await _service.DeleteVolunteer(id));
        }
    }
}
