using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Volunteer.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Volunteer.Data
{
    public class VolunteerContext : IVolunteerContext
    {
        public VolunteerContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            var database = client.GetDatabase("Volunteer");
            Volunteers = database.GetCollection<VolunteerInfo>("VolunteersInfo");
            VolunteerCVs = database.GetCollection<VolunteerCV>("VolunteerCVs");
            VolunteerContextSeed.SeedData(Volunteers, VolunteerCVs);
        }

        public IMongoCollection<VolunteerInfo> Volunteers { get; }
        public IMongoCollection<VolunteerCV> VolunteerCVs { get; }
    }
}
