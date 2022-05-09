using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volunteer.Entities;
using System.IO;

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
            string appDataPath = @"/app";
            Console.WriteLine(Directory.Exists(appDataPath));

            return new List<VolunteerInfo>() 
            {
                new VolunteerInfo()
                {
                    FirstName = "Vlada",
                    LastName = "Batoćanin",
                    Skills = new string[] { "programer", "kuvar", "ocd manager"},
                    Adress = "Cerak or some shit 53",
                    Resume = File.ReadAllBytes(@"/app/AleksandraRuzicCV.pdf")
                },
                new VolunteerInfo()
                {
                    FirstName = "Džoni",
                    LastName = "Perić",
                    Skills = new string[] { "programer", "muzicki poznavalac", "otelotvorenje rant-a"},
                    Adress = "Negde u Ripnju 42",
                    Resume = File.ReadAllBytes(@"/app/AleksandraRuzicCV.pdf")
                },
                new VolunteerInfo()
                {
                    FirstName = "Petar",
                    LastName = "Zečević",
                    Skills = new string[] { "programer", "WoW entusiast", "skuplja račune i maramice po džepovima"},
                    Adress = "Odakle je i kompletara 69",
                    Resume = File.ReadAllBytes(@"/app/AleksandraRuzicCV.pdf")
                },
                new VolunteerInfo()
                {
                    FirstName = "Aleksandra",
                    LastName = "Ružić",
                    Skills = new string[] { "programer", "aikidoka", "profesionalni pesimista"},
                    Adress = "rodjena beogradjanka 25",
                    Resume = File.ReadAllBytes(@"/app/AleksandraRuzicCV.pdf")
                }
            };
        }
    }
}