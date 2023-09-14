using EventBus.Messages.Events;
using MassTransit;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.Extensions.Logging;
using Notification.Notification;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Notification.EventBusConsumers
{
    public class AdNotificationConsumer : IConsumer<AdNotificationEvent>
    {
        private readonly ILogger<AdNotificationConsumer> _logger;
        private readonly INotificationService _notificationService;

        public AdNotificationConsumer(ILogger<AdNotificationConsumer> logger, INotificationService notificationService)
        {
            _notificationService = notificationService;
            _logger = logger;
        }

        public Task Consume(ConsumeContext<AdNotificationEvent> context)
        {
            _logger.LogInformation($"Ad notification received with id: {context.Message.AdId} and title: {context.Message.AdTitle}");
            _notificationService.SendUrgentMessage(context.Message);
            return Task.CompletedTask;
        }
    }
}
