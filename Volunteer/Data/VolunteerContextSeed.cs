using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volunteer.Entities;

namespace Volunteer.Data
{
    public class VolunteerContextSeed
    {
        public static void SeedData(IMongoCollection<VolunteerInfo> volunteerCollection)
        {
            var existProducts = volunteerCollection.Find(v => true).Any();
            if (!existProducts)
            {
                volunteerCollection.InsertManyAsync(GetPreconfiguredProducts());
            }
        }

        private static IEnumerable<VolunteerInfo> GetPreconfiguredProducts()
        {
            return new List<VolunteerInfo>() 
            {
                new VolunteerInfo()
                {
                    FirstName = "Vlada",
                    LastName = "Batoćanin",
                    Skills = new string[] { "programer", "kuvar", "ocd manager"}
                },
                new VolunteerInfo()
                {
                    FirstName = "Džoni",
                    LastName = "Perić",
                    Skills = new string[] { "programer", "muzicki poznavalac", "otelotvorenje rant-a"}
                },
                new VolunteerInfo()
                {
                    FirstName = "Petar",
                    LastName = "Zečević",
                    Skills = new string[] { "programer", "WoW entusiast", "skuplja račune i maramice po džepovima"}
                },
                new VolunteerInfo()
                {
                    FirstName = "Aleksandra",
                    LastName = "Ružić",
                    Skills = new string[] { "programer", "aikidoka", "profesionalni pesimista"}
                }
            };
        }
    }
}