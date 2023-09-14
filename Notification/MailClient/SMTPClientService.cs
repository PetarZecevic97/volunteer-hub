using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Notification.EventBusConsumers;

namespace Notification.MailClient
{
	public class SMTPClientService : IMailClientService
	{
        private SmtpClient Client;
        private readonly ILogger<SMTPClientService> _logger;

        public SMTPClientService(ILogger<SMTPClientService> logger)
		{
            _logger = logger;
            Client = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("", ""),
                EnableSsl = true,
            };
        }

        public void SendMessage(MailClientEntity message)
        {
            MailMessage Msg = new MailMessage();
            MailAddress fromMail = new MailAddress("");
            Msg.From = fromMail;
            Msg.Subject = message.Subject;
            Msg.Body = message.Body;
            foreach (var address in message.To)
            {
                Msg.To.Add(address);
            }
            Client.Send(Msg);
        }
    }
}

