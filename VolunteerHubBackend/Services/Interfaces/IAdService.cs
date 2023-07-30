using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using VolunteerHubBackend.Entities;

namespace VolunteerHubBackend.Services.Interfaces
{
    public interface IAdService
    {
        Task<IEnumerable<Ad>> GetAllAds();

        Task<Ad> GetAdById(string Id);

        Task<Ad> CreateAd(AdCreate product);

        Task<Ad> UpdateAd(Ad product);

        Task<HttpResponseMessage> DeleteAd(string Id);
    }
}
