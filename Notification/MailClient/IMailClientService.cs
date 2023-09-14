using System;
using System.Threading.Tasks;

namespace Notification.MailClient
{
	public interface IMailClientService
	{
        void SendMessage(MailClientEntity message);
    }
}

