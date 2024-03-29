﻿using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Volunteer.Entities
{
    public class VolunteerInfo
    {
        [BsonId]
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string[] Skills { get; set; }
    }
}
