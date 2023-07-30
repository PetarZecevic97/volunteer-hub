using System;
namespace Ads.Entities
{
	public class AdEntity
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Skills { get; set; }
        public bool IsOpen { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationId { get; set; }
        public DateTime OpenedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }

        public AdEntity(string id, string summary, string title, string skills, bool isOpen, string organizationName, string organizationId)
        {
            Id = id;
            Title = title ?? throw new ArgumentNullException(nameof(title));
            Summary = summary ?? throw new ArgumentNullException(nameof(summary));
            Skills = skills ?? throw new ArgumentNullException(nameof(skills));
            IsOpen = isOpen;
            OrganizationName = organizationName ?? throw new ArgumentNullException(nameof(organizationName));
            OrganizationId = organizationId ?? throw new ArgumentNullException(nameof(organizationId));
            OpenedDate = DateTime.Now;
            LastModifiedDate = DateTime.Now;
        }
    }
}

