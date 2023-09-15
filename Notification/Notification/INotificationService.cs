using System;
using EventBus.Messages.Events;

namespace Notification.Notification
{
	public interface INotificationService
	{
        void SendUrgentMessage(AdNotificationEvent message);
    }
}

