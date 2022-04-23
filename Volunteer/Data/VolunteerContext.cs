using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Volunteer.Entities;

namespace Volunteer.Data
{
    public class VolunteerContext : IVolunteerContext
    {
        public VolunteerContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            var database = client.GetDatabase("Volunteer");
            Volunteers = database.GetCollection<VolunteerInfo>("VolunteersInfo");
            VolunteerContextSeed.SeedData(Volunteers);
        }

        public IMongoCollection<VolunteerInfo> Volunteers { get; }
    }
}
