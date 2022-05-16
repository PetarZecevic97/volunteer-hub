using System;

namespace Organization.Entities
{
    public class AdvertEntity : EntityBase
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string EventLocation { get; set; }
        public DateTime EventDate { get; set; }

        public AdvertEntity(string title, string description, string eventLocation, DateTime eventDate)
        {
            Title = title ?? throw new ArgumentNullException(nameof(title));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            EventLocation = eventLocation ?? throw new ArgumentNullException(nameof(eventLocation));
            EventDate = eventDate;
        }
    }
}
