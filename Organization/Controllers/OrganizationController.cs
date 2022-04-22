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
        public async Task<ActionResult<IEnumerable<OrganizationEntity>>> GetOrganizations()
        {
            var organizations = await _organizationRepository.GetAllAsync();
            return Ok(organizations);
        }

    }
}
