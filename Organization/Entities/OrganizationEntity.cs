using System;

namespace Organization.Entities
{
    public class OrganizationEntity : EntityBase
    {
        public string OrganizationName { get; set; }
        public string OrganizationId { get; private set; }
        public string Description { get; set; }

        public OrganizationEntity(int id, string createdBy, DateTime createdDate, string lastModifiedBy, DateTime lastModifiedDate, string organizationName, string organizationId, string description)
            :base(id, createdBy, createdDate, lastModifiedBy, lastModifiedDate)
        {
            OrganizationName = organizationName ?? throw new ArgumentNullException(nameof(organizationName));
            OrganizationId = organizationId ?? throw new ArgumentNullException(nameof(organizationId));
            Description = description ?? throw new ArgumentNullException(nameof(description));
        }
    }
}
