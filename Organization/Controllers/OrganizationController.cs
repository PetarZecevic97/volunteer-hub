using Organization.Repositories.Interfaces;
using Organization.Entities;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Organization.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrganizationController : ControllerBase
    {

        private readonly IAsyncRepository<OrganizationEntity> _organizationRepository;

        public OrganizationController(IAsyncRepository<OrganizationEntity> organizationRepository)
        {
            _organizationRepository = organizationRepository ?? throw new ArgumentNullException(nameof(organizationRepository));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OrganizationEntity>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<OrganizationEntity>>> GetAllOrganizations()
        {
            var organizations = await _organizationRepository.GetAllAsync();
            return Ok(organizations);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(IEnumerable<OrganizationEntity>), StatusCodes.Status200OK)]
        public async Task<ActionResult<OrganizationEntity>> GetOrganizationById(string id)
        {
            var result = await _organizationRepository.GetByIdAsync(id);
            return Ok(result);  
        }
        
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<OrganizationEntity>), StatusCodes.Status201Created)]
        public async Task<ActionResult<OrganizationEntity>> CreateOrganization([FromBody] OrganizationEntity organization)
        {            
            var res = await _organizationRepository.AddAsync(organization);
            return Ok(res);

        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<ActionResult<OrganizationEntity>> UpdateOrganization([FromBody] OrganizationEntity organization, [FromRoute]string id)
        {
            //NOTE: Request body should contain entity with existing Id and updated properties (see UpdateAsync())
            OrganizationEntity res = await _organizationRepository.UpdateAsync(organization, id);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteOrganization(string id)
        {
            await _organizationRepository.DeleteAsync(id);
            return Ok("Organization deleted!");
        }

        
        //TDOD: Implement DeleteOrganizationById() function (action needs to be support by Repository as well)

    }
}
