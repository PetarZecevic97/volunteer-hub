using System;

namespace Organization.Entities
{
    public class Organization
    {
        public int Id { get; private set; }
        public string OrganizationName { get; private set; }
        public string OrganizationId { get; private set; }
        public DateTime JoinedOn { get; private set; }
        public string Description { get; private set; }
    }
}
