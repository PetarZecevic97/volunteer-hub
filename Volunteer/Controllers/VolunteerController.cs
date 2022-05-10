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

        [HttpDelete(Name = "DeleteAllVolunteer")]
        [ProducesResponseType(typeof(IEnumerable<VolunteerInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteAllVolunteers()
        {
            return Ok(await _repository.DeleteAllVolunteers());
        }

        [HttpGet("cv", Name = "GetAllCVs")] 
        [ProducesResponseType(typeof(IEnumerable<VolunteerCV>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<VolunteerCV>>> GetCVs()
        {
            var CVs = await _repository.GetCVs();
            return Ok(CVs);
        }

        [HttpDelete("cv", Name = "DeleteAllCVs")]
        [ProducesResponseType(typeof(IEnumerable<VolunteerCV>), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteAllCVs()
        {
            return Ok(await _repository.DeleteCVs());
        }

        [HttpGet("cv/{id:length(24)}", Name = "GetCV")] 
        [ProducesResponseType(typeof(VolunteerCV), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(VolunteerCV), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VolunteerCV>> GetCV(string id)
        {
            var cv = await _repository.GetCV(id);
            if (cv == null)
            {
                return NotFound(null);
            }
            return Ok(cv);
        }

        [HttpDelete("cv/{id:length(24)}", Name = "DeleteCV")]
        [ProducesResponseType(typeof(VolunteerCV), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteCV(string id)
        {
            return Ok(await _repository.DeleteCV(id));
        }

        [HttpPut("cv", Name = "ReplaceCV")]
        [ProducesResponseType(typeof(VolunteerCV), StatusCodes.Status200OK)]
        public async Task<IActionResult> ReplaceCV(string id, IFormFile newCV)
        {
            var volunteer = await _repository.GetVolunteer(id);
            if (volunteer == null)
            {
                return NotFound(null);
            }
            return Ok(await _repository.ChangeCV(id, newCV));
        }

        [HttpPost("cv")]
        [ProducesResponseType(typeof(IEnumerable<VolunteerCV>), StatusCodes.Status201Created)]
        public async Task<ActionResult<VolunteerCV>> UploadCV(string Id, IFormFile newCV)
        {
            var volunteer = await _repository.GetVolunteer(Id);
            if (volunteer == null)
            {
                return NotFound(null);
            }
            var newResumeSaved = await _repository.UploadCV(Id, newCV);
            return CreatedAtRoute("GetCV", new { id = Id }, newResumeSaved);
        }
    }
}