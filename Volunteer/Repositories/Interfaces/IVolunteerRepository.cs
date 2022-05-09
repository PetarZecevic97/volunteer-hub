using Volunteer.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Volunteer.Repositories.Interfaces
{
    public interface IVolunteerRepository
    {
        Task<IEnumerable<VolunteerInfo>> GetVolunteers();
        Task<bool> DeleteAllVolunteers();

        Task<VolunteerInfo> GetVolunteer(string id);

        Task<IEnumerable<VolunteerInfo>> GetVolunteersBySkills(string skills);

        Task CreateVolunteer(VolunteerInfo product);

        Task<bool> UpdateVolunteer(VolunteerInfo product);

        Task<bool> DeleteVolunteer(string id);
    }
}
