using System;
using System.Collections.Generic;

namespace Ads.Entities
{
	public class AdEntity
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Skills { get; set; }
        public bool IsOpen { get; set; }
        public string Location { get; set; }
        public string OrganizationId { get; set; }
        public bool IsEmergency { get; set; }
        public ICollection<AdVolunteerEntity> Volunteers { get; set; }
        public DateTime OpenedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }

        public AdEntity(string id, string summary, string title, string skills, bool isOpen, string location, string organizationId, bool isEmergency)
        {
            Id = id;
            Title = title ?? throw new ArgumentNullException(nameof(title));
            Summary = summary ?? throw new ArgumentNullException(nameof(summary));
            Skills = skills ?? throw new ArgumentNullException(nameof(skills));
            IsOpen = isOpen;
            Location = location ?? throw new ArgumentNullException(nameof(location));
            OrganizationId = organizationId ?? throw new ArgumentNullException(nameof(organizationId));
            IsEmergency = isEmergency;
            Volunteers = new List<AdVolunteerEntity>();
            OpenedDate = DateTime.Now;
            LastModifiedDate = DateTime.Now;
        }
    }
}

