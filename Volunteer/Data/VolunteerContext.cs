using MongoDB.Driver;
using Volunteer.Entities;

namespace Volunteer.Data
{
    public class VolunteerContext : IVolunteerContext
    {
        public VolunteerContext()
        {
            var client = new MongoClient("mongo://localhost:27017");
            var database = client.GetDatabase("Volunteer");
            Volunteers = database.GetCollection<VolunteerInfo>("VolunteersInfo");
        }

        public IMongoCollection<VolunteerInfo> Volunteers { get; }
    }
}
