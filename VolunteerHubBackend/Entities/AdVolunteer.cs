using System;
namespace VolunteerHubBackend.Entities
{
	public class AdVolunteer
    {
        public string Id { get; set; }
        public string AdId { get; set; }
        public string VolunteerId { get; set; }

        public AdVolunteer()
		{
        }

        public AdVolunteer(string id, string adId, string volunteerId)
        {
            Id = id;
            AdId = adId;
            VolunteerId = volunteerId;
        }
    }
}

