using System;
namespace VolunteerHubBackend.Entities
{
	public class AdVolunteerCreate
	{
		public string AdId { get; set; }
        public string VolunteerId { get; set; }

        public AdVolunteerCreate()
		{
        }

        public AdVolunteerCreate(string adId, string volunteerId)
        {
            AdId = adId;
            VolunteerId = volunteerId;
        }
    }
}

