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
        public static void SeedData(IMongoCollection<VolunteerInfo> volunteerCollection, IMongoCollection<VolunteerCV> volunteerCvCollection)
        {
            var existVolunteers = volunteerCollection.Find(v => true).Any();
            if (!existVolunteers)
            {
                volunteerCollection.InsertManyAsync(GetPreconfiguredVolunteers());
            }

            IEnumerable<string> volunteerIds = volunteerCollection.Find(v => true).ToEnumerable().Select(v => v.Id);
            volunteerCvCollection.DeleteMany(v => true);
            if (volunteerIds.Any())
            {
                volunteerCvCollection.InsertManyAsync(GetPreconfiguredVolunteerCVs(volunteerIds));
            }
        }

        private static IEnumerable<VolunteerInfo> GetPreconfiguredVolunteers()
        {
            return new List<VolunteerInfo>() 
            {
                new VolunteerInfo()
                {
                    FirstName = "Vlada",
                    LastName = "Batoćanin",
                    Skills = new string[] { "programer", "kuvar", "ocd manager"},
                    Adress = "Cerak or some shit 53"
                },
                new VolunteerInfo()
                {
                    FirstName = "Džoni",
                    LastName = "Perić",
                    Skills = new string[] { "programer", "muzicki poznavalac", "otelotvorenje rant-a"},
                    Adress = "Negde u Ripnju 42"
                },
                new VolunteerInfo()
                {
                    FirstName = "Petar",
                    LastName = "Zečević",
                    Skills = new string[] { "programer", "WoW entusiast", "skuplja račune i maramice po džepovima"},
                    Adress = "Odakle je i kompletara 69"
                },
                new VolunteerInfo()
                {
                    FirstName = "Aleksandra",
                    LastName = "Ružić",
                    Skills = new string[] { "programer", "aikidoka", "profesionalni pesimista"},
                    Adress = "rodjena beogradjanka 25"
                }
            };
        }

        private static IEnumerable<VolunteerCV> GetPreconfiguredVolunteerCVs(IEnumerable<string> volunteerIds)
        {
            return new List<VolunteerCV>() 
            {
                new VolunteerCV()
                {
                    Id = volunteerIds.ElementAt(0),
                    Resume = File.ReadAllBytes(@"/app/VladimirBatocaninCV.pdf")
                },
                new VolunteerCV()
                {
                    Id = volunteerIds.ElementAt(1),
                    Resume = File.ReadAllBytes(@"/app/NikolaPericCV.pdf")
                },
                new VolunteerCV()
                {
                    Id = volunteerIds.ElementAt(2),
                    Resume = File.ReadAllBytes(@"/app/PetarZecevicCV.pdf")
                },
                new VolunteerCV()
                {
                    Id = volunteerIds.ElementAt(3),
                    Resume = File.ReadAllBytes(@"/app/AleksandraRuzicCV.pdf")
                }
            };
        }
    }
}