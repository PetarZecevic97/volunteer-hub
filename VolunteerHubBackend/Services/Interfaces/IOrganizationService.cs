using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using VolunteerHubBackend.Entities;

namespace VolunteerHubBackend.Services.Interfaces
{
    public interface IOrganizationService
    {
        Task<IEnumerable<Organization>> GetAllOrganizations();

        Task<Organization> GetOrganizationById(string Id);

        Task<Organization> CreateOrganization(OrganizationCreate product);

        Task<Organization> UpdateOrganization(Organization product);

        Task<HttpResponseMessage> DeleteOrganization(string Id);
    }
}
