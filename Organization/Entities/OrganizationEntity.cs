using System;

namespace Organization.Entities
{
    public class OrganizationEntity
    {
        public int Id { get; private set; }
        public string OrganizationName { get; set; }
        public string OrganizationId { get; private set; }
        public DateTime JoinedOn { get; set; }
        public string Description { get; set; }

        public OrganizationEntity(int id, string organizationName, string organizationId, DateTime joinedOn, string description)
        {
            Id = id;
            OrganizationName = organizationName ?? throw new ArgumentNullException(nameof(organizationName));
            OrganizationId = organizationId ?? throw new ArgumentNullException(nameof(organizationId));
            JoinedOn = joinedOn;
            Description = description ?? throw new ArgumentNullException(nameof(description));
        }
    }
}
