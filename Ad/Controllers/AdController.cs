using Ads.Repositories.Interfaces;
using Ads.Entities;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ad.Migrations;

namespace Ads.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AdController : ControllerBase
    {

        private readonly IAsyncRepository<AdEntity> _adRepository;

        public AdController(IAsyncRepository<AdEntity> adRepository)
        {
            _adRepository = adRepository ?? throw new ArgumentNullException(nameof(adRepository));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<AdEntity>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<AdEntity>>> GetAllAds()
        {
            var Ads = await _adRepository.GetAllAsync();
            return Ok(Ads);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(IEnumerable<AdEntity>), StatusCodes.Status200OK)]
        public async Task<ActionResult<AdEntity>> GetAdById(string id)
        {
            var result = await _adRepository.GetByIdAsync(id);
            return Ok(result);  
        }
        
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<AdEntity>), StatusCodes.Status201Created)]
        public async Task<ActionResult<AdEntity>> CreateAd([FromBody] AdEntity Ad)
        {            
            var res = await _adRepository.AddAsync(Ad);
            return Ok(res);

        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<ActionResult<AdEntity>> UpdateAd([FromBody] AdEntity Ad, [FromRoute]string id)
        {
            //NOTE: Request body should contain entity with existing Id and updated properties (see UpdateAsync())
            AdEntity res = await _adRepository.UpdateAsync(Ad, id);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteAd(string id)
        {
            await _adRepository.DeleteAsync(id);
            return Ok("Ad deleted!");
        }

        [HttpPost("{id}/{volunteerId}")]
        [ProducesResponseType(typeof(AdEntity), StatusCodes.Status200OK)]
        public async Task<ActionResult<AdEntity>> AddVolunteer([FromBody] AdVolunteerEntity volunteer,
                                                                [FromRoute] string id, [FromRoute] string volunteerId)
        {
            AdEntity res = await _adRepository.AddVolunteer(volunteer);
            if(res == null || res.Id == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        [HttpDelete("{id}/{volunteerId}")]
        [ProducesResponseType(typeof(AdEntity), StatusCodes.Status200OK)]
        public async Task<ActionResult<AdEntity>> RemoveVolunteer([FromRoute] string id, [FromRoute] string volunteerId)
        {
            AdEntity res = await _adRepository.DeleteVolunteer(id, volunteerId);
            if (res == null || res.Id == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

    }
}
