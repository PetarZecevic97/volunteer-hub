using System;
using System.Collections.Generic;

namespace Organization.Entities
{
    public class OrganizationEntity : EntityBase
    {
        public string OrganizationName { get; set; }
        public string OrganizationId { get; private set; }
        public string Summary { get; set; }

        private readonly List<AdvertEntity> _adverts = new List<AdvertEntity>();
        public IReadOnlyCollection<AdvertEntity> Adverts => _adverts;

        public OrganizationEntity(string organizationName, string organizationId, string summary)            
        {
            OrganizationName = organizationName ?? throw new ArgumentNullException(nameof(organizationName));
            OrganizationId = organizationId ?? throw new ArgumentNullException(nameof(organizationId));
            Summary = summary ?? throw new ArgumentNullException(nameof(summary));
        }

        public void AddAdvert(string title, string description, string eventLocation, DateTime eventDate) 
        {             
            var advert = new AdvertEntity(title, description, eventLocation, eventDate);
            _adverts.Add(advert);
        }
        
    }
}
