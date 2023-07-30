using System;

namespace VolunteerHubBackend.Entities
{
    public class Ad
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
    }
}
