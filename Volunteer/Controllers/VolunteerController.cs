using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volunteer.Entities;
using Volunteer.Repositories.Interfaces;

namespace Volunteer.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class VolunteerController : ControllerBase
    {
        private readonly IVolunteerRepository _repository;

        public VolunteerController(IVolunteerRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        [HttpGet] 
        [ProducesResponseType(typeof(IEnumerable<VolunteerInfo>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<VolunteerInfo>>> GetVolunteers()
        {
            var volunteers = await _repository.GetVolunteers();
            return Ok(volunteers);
        }

        [HttpGet("{id:length(24)}", Name = "GetVolunteer")] 
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VolunteerInfo>> GetVolunteerById(string id)
        {
            var volunteer = await _repository.GetVolunteer(id);
            if (volunteer == null)
            {
                return NotFound(null);
            }
            return Ok(volunteer);
        }

        [Route("[action]/{skills}")]
        [HttpGet] 
        [ProducesResponseType(typeof(IEnumerable<VolunteerInfo>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<VolunteerInfo>>> GetVolunteersBySkill(string skills)
        {
            var volunteers = await _repository.GetVolunteersBySkills(skills);
            return Ok(volunteers);
        }

        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<VolunteerInfo>), StatusCodes.Status201Created)]
        public async Task<ActionResult<VolunteerInfo>> CreateVolunteer([FromBody] VolunteerInfo volunteer)
        {
            await _repository.CreateVolunteer(volunteer);

            return CreatedAtRoute("GetVolunteer", new { id = volunteer.Id }, volunteer);
        }

        [HttpPut]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateVolunteer([FromBody] VolunteerInfo volunteer)
        {
            return Ok(await _repository.UpdateVolunteer(volunteer));
        }

        [HttpDelete("{id:length(24)}", Name = "DeleteVolunteer")]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteVolunteer(string id)
        {
            return Ok(await _repository.DeleteVolunteer(id));
        }
    }
}