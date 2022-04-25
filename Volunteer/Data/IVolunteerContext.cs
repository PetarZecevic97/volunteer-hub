using MongoDB.Driver;
using Volunteer.Entities;

namespace Volunteer.Data
{
    public interface IVolunteerContext
    {
        IMongoCollection<VolunteerInfo> Volunteers { get; }
    }
}
