namespace VolunteerHubCore.Entities
{
    public class Organization
    {
        public int Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationId { get; set; }
        public string Summary { get; set; }
    }
}
