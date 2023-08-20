using EventBus.Messages.Events;
using MassTransit;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Notification.EventBusConsumers
{
    public class AdNotificationConsumer : IConsumer<AdNotificationEvent>
    {
        private readonly ILogger<AdNotificationConsumer> _logger;

        public AdNotificationConsumer(ILogger<AdNotificationConsumer> logger)
        {
            _logger = logger;
        }

        public Task Consume(ConsumeContext<AdNotificationEvent> context)
        {
            _logger.LogInformation($"Ad notification received with id: {context.Message.AdId} and title: {context.Message.AdTitle}");
            string fromMail = "";
            string fromPassword = "";
            MailMessage message = new MailMessage(
            "",
            "",
            "",
            "");
            SmtpClient client = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };
            client.Send(message);
            return Task.CompletedTask;
        }
    }
}
