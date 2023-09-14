using System.Collections.Generic;
using System.Threading.Tasks;
using Notification.Entities;

namespace Notification.Services.Interfaces
{
    public interface IVolunteerService
    {
        Task<IEnumerable<VolunteerInfo>> GetVolunteers();

        Task<VolunteerInfo> GetVolunteer(string id);

        Task<IEnumerable<VolunteerInfo>> GetVolunteersBySkills(string skills);

        Task<VolunteerInfo> CreateVolunteer(VolunteerInfo product);

        Task<VolunteerInfo> UpdateVolunteer(VolunteerInfo product);

        Task<bool> DeleteVolunteer(string id);
    }
}
