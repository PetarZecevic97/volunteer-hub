﻿using System;

namespace Organization.Entities
{
    public class OrganizationEntity : EntityBase
    {
        public string OrganizationName { get; set; }
        public string OrganizationId { get; set; }
        public string Summary { get; set; }

        public OrganizationEntity(string id, string organizationName, string organizationId, string summary)            
        {
            Id = id;
            OrganizationName = organizationName ?? throw new ArgumentNullException(nameof(organizationName));
            OrganizationId = organizationId ?? throw new ArgumentNullException(nameof(organizationId));
            Summary = summary ?? throw new ArgumentNullException(nameof(summary));
            CreatedDate = DateTime.Now;
            LastModifiedDate = DateTime.Now;
        }
    }
}
