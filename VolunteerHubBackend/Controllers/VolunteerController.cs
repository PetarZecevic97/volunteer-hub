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
        public async Task<ActionResult<VolunteerInfo>> CreateVolunteer([FromBody] VolunteerInfo volunteer)
        {
            if (User.FindFirst("id").Value != volunteer.Id)
            {
                return Forbid("ID value from jwt token does not match ID value from request body.");
            }
            var product = await _service.CreateVolunteer(volunteer);

            return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
        }

        [Authorize(Roles = "Volunteer")]
        [HttpPut("{id}", Name = "UpdateVolunteer")]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        public async Task<ActionResult<VolunteerInfo>> UpdateVolunteer([FromRoute] string id, [FromBody] VolunteerInfo volunteer)
        {
            //Console.WriteLine("Ljeks pocetak");
            //Console.WriteLine(volunteer.Id);
            //Console.WriteLine("Ljeks kraj");
            if (User.FindFirst("id").Value != volunteer.Id)
            {
                return Forbid("Cannot update other volunteer profile");
            }
            if (User.FindFirst("id").Value != id)
            {
                return Forbid("ID value from Route must match ID value from jwt token.");
            }
            return Ok(await _service.UpdateVolunteer(volunteer));
        }

        [Authorize(Roles = "Volunteer")]
        [HttpDelete("{id}", Name = "DeleteProduct")]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteVolunteer(string id)
        {
            if (User.FindFirst("id").Value != id)
            {
                return Forbid("Cannot delete other volunteer profile");
            }
            return Ok(await _service.DeleteVolunteer(id));
        }
    }
}
