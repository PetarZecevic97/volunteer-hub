using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Volunteer.Entities
{
    public class VolunteerCV
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.Binary)]
        public byte[] Resume { get; set; }
    }
}
