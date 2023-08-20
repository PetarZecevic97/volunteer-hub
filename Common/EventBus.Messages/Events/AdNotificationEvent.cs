using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.Messages.Events
{
    public class AdNotificationEvent : IntegrationBaseEvent
    {
        public string AdId { get; set; }
        public string AdTitle { get; set; }

        public AdNotificationEvent(string adId, string adTitle) : base()
        {
            AdId = adId;
            AdTitle = adTitle;
        }
    }


}
