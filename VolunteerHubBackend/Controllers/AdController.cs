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
        [ProducesResponseType(typeof(Ad), StatusCodes.Status200OK)]
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
        [ProducesResponseType(typeof(Ad), StatusCodes.Status201Created)]
        public async Task<ActionResult<Ad>> CreateAd([FromBody] AdCreate ad)
        {
            //System.Diagnostics.Debug.WriteLine(User.FindFirst("id").Value);
            //System.Diagnostics.Debug.WriteLine(ad.OrganizationId);

            if (User.FindFirst("id").Value != ad.OrganizationId)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "ID value from jwt token does not match OrganizationId value from request body.",
                    ContentType = "text/plain"
                };
            }
            var res = await _adService.CreateAd(ad);
            if(res.Id == null)
            {
                return NotFound(res);
            }
            return Ok(res);

        }

        [Authorize(Roles = "Organization")]
        [HttpPut("{id}", Name = "PutAd")]
        [ProducesResponseType(typeof(Ad), StatusCodes.Status200OK)]
        public async Task<ActionResult<Ad>> UpdateAd([FromBody] Ad ad)
        {
            if (User.FindFirst("id").Value != ad.OrganizationId)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "Cannot update ad that is created by another organization.",
                    ContentType = "text/plain"
                };
            }
            Ad  result = await _adService.UpdateAd(ad);
            return Ok(result);
        }

        [Authorize(Roles = "Organization")]
        [HttpDelete("{id}", Name = "DeleteAd")]
        [ProducesResponseType(typeof(string), StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteAd(String id)
        {
            var existingAd = await _adService.GetAdById(id);
            if (existingAd == null)
            {
                return NotFound();
            }

            if (User.FindFirst("id").Value != existingAd.OrganizationId)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "Cannot delete ad that is created by another organization.",
                    ContentType = "text/plain"
                };
            }
            await _adService.DeleteAd(id);
            return Ok("Ad deleted!");
        }

        [Authorize(Roles = "Volunteer")]
        [HttpPost("{id}/{volunteerId}", Name = "AddVolunteer")]
        [ProducesResponseType(typeof(Ad), StatusCodes.Status201Created)]
        public async Task<ActionResult<Ad>> AddVolunteer([FromBody] AdVolunteerCreate adVolunteer, [FromRoute] string id, [FromRoute] string volunteerId)
        {
            if (User.FindFirst("id").Value != volunteerId)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "Volunteer ID value from jwt token must match volunteer ID value from Route.",
                    ContentType = "text/plain"
                };
            }
            if (User.FindFirst("id").Value != adVolunteer.VolunteerId)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "Volunteer ID value from jwt token must match volunteer ID value from request body.",
                    ContentType = "text/plain"
                };
            }
            if (volunteerId != adVolunteer.VolunteerId)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "Volunteer ID value from request body must match volunteer ID value from Route.",
                    ContentType = "text/plain"
                };
            }
            if (id != adVolunteer.AdId)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "Ad ID value from request body must match ad ID value from Route.",
                    ContentType = "text/plain"
                };
            }
            var res = await _adService.AddVolunteer(adVolunteer);
            if (res.Id == null)
            {
                return NotFound(res);
            }
            return Ok(res);
        }

        [Authorize(Roles = "Volunteer")]
        [HttpDelete("{id}/{volunteerId}", Name = "DeleteVolunteer")]
        [ProducesResponseType(typeof(Ad), StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteVolunteer(string id, string volunteerId)
        {
            var existingAd = await _adService.GetAdById(id);
            if (existingAd == null)
            {
                return NotFound();
            }

            if (User.FindFirst("id").Value != volunteerId)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status403Forbidden,
                    Content = "Cannot delete other volunteer from ad.",
                    ContentType = "text/plain"
                };
            }

            // TODO: Da li ovde treba provera da je volonter prijavljen na Add??
            //       Ili ovo ipak treba da radi organizacija za svoje Add-ove??
            if (User.FindFirst("id").Value != existingAd.OrganizationId)
            {
                return Forbid();
            }
            var res = await _adService.DeleteVolunteer(id, volunteerId);
            return Ok(res);
        }

    }
}
