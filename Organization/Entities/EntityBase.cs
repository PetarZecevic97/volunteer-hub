using System;

namespace Organization.Entities
{
    public class EntityBase
    {
        public int Id { get; protected set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string LastModifiedBy { get; set; }

        public DateTime LastModifiedDate { get; set; }

        public EntityBase(int id, string createdBy, DateTime createdDate, string lastModifiedBy, DateTime lastModifiedDate)
        {
            Id = id;
            CreatedBy = createdBy ?? throw new ArgumentNullException(nameof(createdBy));
            CreatedDate = createdDate;
            LastModifiedBy = lastModifiedBy ?? throw new ArgumentNullException(nameof(lastModifiedBy));
            LastModifiedDate = lastModifiedDate;
        }
    }
}
