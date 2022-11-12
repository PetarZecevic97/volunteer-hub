using VolunteerHubCore.Entities;

namespace VolunteerHubCore.Services.Interfaces
{
    public interface IVolunteerService
    {
        Task<IEnumerable<VolunteerInfo>> GetVolunteers();

        Task<VolunteerInfo> GetVolunteer(string id);

        Task<IEnumerable<VolunteerInfo>> GetVolunteersBySkills(string skills);

        Task<VolunteerInfo> CreateVolunteer(VolunteerInfoCreate product);

        Task<bool> UpdateVolunteer(VolunteerInfo product);

        Task<bool> DeleteVolunteer(string id);
    }
}
