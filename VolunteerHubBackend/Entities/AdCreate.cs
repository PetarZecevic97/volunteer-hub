using System;

namespace VolunteerHubBackend.Entities
{
    public class AdCreate
    {
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Skills { get; set; }
        public string Location { get; set; }
        public string OrganizationId { get; set; }
        public bool IsEmergency { get; set; }
    }
}
