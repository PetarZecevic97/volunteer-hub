using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Volunteer.Entities
{
    public class VolunteerInfo
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string[] Skills { get; set; }
    }
}
