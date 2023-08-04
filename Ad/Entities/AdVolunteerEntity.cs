using System;
namespace Ads.Entities
{
	public class AdVolunteerEntity
	{
		public string Id { get; set; }
		public string VolunteerId { get; set; }
        public string AdId { get; set; }

        public AdVolunteerEntity()
        {
        }

        public AdVolunteerEntity(string id, string volunteerId, string adId)
		{
			Id = id;
			VolunteerId = volunteerId;
			AdId = adId;
		}
    }
}

