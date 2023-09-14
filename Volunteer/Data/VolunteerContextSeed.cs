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
                    Id = "40fc9e55-b637-4689-9bd1-b5dab86b9b18",
                    FirstName = "Vlada",
                    LastName = "Batoćanin",
                    Email = "vladimir@wings.com",
                    Skills = new string[] { "programer", "kuvar", "ocd manager"}
                },
                new VolunteerInfo()
                {
                    Id = "bd636489-803a-4667-b739-b9bde3664d6b",
                    FirstName = "Džoni",
                    LastName = "Perić",
                    Email = "nikola.peric303@gmail.com",
                    Skills = new string[] { "programer", "muzicki poznavalac", "otelotvorenje rant-a"}
                },
                new VolunteerInfo()
                {
                    Id = "b36fd818-1ddb-4f3c-8ada-e791fee5993c",
                    FirstName = "Petar",
                    LastName = "Zečević",
                    Email = "petar.b.zecevic@gmail.com",
                    Skills = new string[] { "programer", "WoW entusiast", "skuplja račune i maramice po džepovima"}
                },
                new VolunteerInfo()
                {
                    Id = "ca982b53-48df-44b3-ba0b-6904ee92defc",
                    FirstName = "Aleksandra",
                    LastName = "Ružić",
                    Email = "ruzic.aleksandra@gmail.com",
                    Skills = new string[] { "programer", "aikidoka", "profesionalni pesimista"}
                }
            };
        }
    }
}