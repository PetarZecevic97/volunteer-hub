using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VolunteerHubBackend.Entities;
using VolunteerHubBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace VolunteerHubBackend.Controllers
{
    [Authorize(Roles = "Organization,Volunteer")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdController : ControllerBase
    {

        private readonly IAdService _adService;

        public AdController(IAdService adService)
        {
            _adService = adService ?? throw new ArgumentNullException(nameof(adService));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Ad>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Ad>>> GetAllAds()
        {
            var ads = await _adService.GetAllAds();
            return Ok(ads);
        }


        [HttpGet("{id}", Name = "GetAd")]
        [ProducesResponseType(typeof(IEnumerable<Ad>), StatusCodes.Status200OK)]
        public async Task<ActionResult<Ad>> GetAdById(string id)
        {
            var result = await _adService.GetAdById(id);
            if (result.Id == null)
            {
                return NotFound(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "Organization")]
        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<Ad>), StatusCodes.Status201Created)]
        public async Task<ActionResult<Ad>> CreateAd([FromBody] AdCreate ad)
        {
            var res = await _adService.CreateAd(ad);
            if(res.Id == null)
            {
                return NotFound(res);
            }
            return Ok(res);

        }

        [Authorize(Roles = "Organization")]
        [HttpPut("{id}", Name = "PutAd")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<ActionResult<Ad>> UpdateAd([FromBody] Ad ad)
        {
            if (User.FindFirst("id").Value != ad.OrganizationId)
            {
                return Forbid("Wrong org!");
            }
            Ad  result = await _adService.UpdateAd(ad);
            return Ok(result);
        }

        [Authorize(Roles = "Organization")]
        [HttpDelete("{id}", Name = "DeleteAd")]
        [ProducesResponseType(typeof(string), StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteAd(String id)
        {
            //if (User.FindFirst("id").Value != id)
            //{
            //    return Forbid();
            //}
            await _adService.DeleteAd(id);
            return Ok("Ad deleted!");
        }


    }
}
