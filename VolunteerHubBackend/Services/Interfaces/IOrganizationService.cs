using System.Collections.Generic;
using System.Threading.Tasks;
using VolunteerHubBackend.Entities;

namespace VolunteerHubBackend.Services.Interfaces
{
    public interface IOrganizationService
    {
        Task<IEnumerable<Organization>> GetAllOrganizations();

        Task<Organization> GetOrganizationById(int Id);

        Task<Organization> CreateOrganization(OrganizationCreate product);

        Task<string> UpdateOrganization(Organization product);

        Task<string> DeleteOrganization(Organization product);
    }
}
