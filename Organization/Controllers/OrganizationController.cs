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

        [Route("[action]")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OrganizationEntity>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<OrganizationEntity>>> GetAllOrganizations()
        {
            var organizations = await _organizationRepository.GetAllAsync();
            return Ok(organizations);
        }


        [Route("[action]/{id}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OrganizationEntity>), StatusCodes.Status200OK)]
        public async Task<ActionResult<OrganizationEntity>> GetOrganizationById(int id)
        {
            var result = await _organizationRepository.GetByIdAsync(id);
            return Ok(result);  
        }
        
        //TODO: Return type should be URL to new object
        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<OrganizationEntity>), StatusCodes.Status201Created)]
        public async Task<ActionResult<OrganizationEntity>> CreateOrganization([FromBody] OrganizationEntity organization)
        {            
            var res = await _organizationRepository.AddAsync(organization);
            return Ok(res);

        }

        [Route("[action]")]
        [HttpPut]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateOrganization([FromBody] OrganizationEntity organization)
        {
            //NOTE: Request body should contain entity with existing Id and updated properties (see UpdateAsync())
            await _organizationRepository.UpdateAsync(organization);
            return Ok("Organization updated!");
        }

        [Route("[action]")]
        [HttpDelete]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteOrganization([FromBody] OrganizationEntity organization)
        {
            await _organizationRepository.DeleteAsync(organization);
            return Ok("Organization deleted!");
        }

        
        //TDOD: Implement DeleteOrganizationById() function (action needs to be support by Repository as well)

    }
}
