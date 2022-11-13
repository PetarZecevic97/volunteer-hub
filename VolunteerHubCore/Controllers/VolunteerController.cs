using Microsoft.AspNetCore.Mvc;
using VolunteerHubCore.Entities;
using VolunteerHubCore.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VolunteerHubCore.Controllers
{
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

        [HttpGet("{id:length(24)}", Name = "GetProduct")]
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

        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<VolunteerInfo>), StatusCodes.Status201Created)]
        public async Task<ActionResult<VolunteerInfo>> CreateVolunteer([FromBody] VolunteerInfoCreate volunteer)
        {
            var product = await _service.CreateVolunteer(volunteer);

            return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
        }

        [HttpPut]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateVolunteer([FromBody] VolunteerInfo volunteer)
        {
            return Ok(await _service.UpdateVolunteer(volunteer));
        }

        [HttpDelete("{id:length(24)}", Name = "DeleteProduct")]
        [ProducesResponseType(typeof(VolunteerInfo), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteVolunteer(string id)
        {
            return Ok(await _service.DeleteVolunteer(id));
        }
    }
}
