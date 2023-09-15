using System;
using System.Linq;
using EventBus.Messages.Events;
using Microsoft.Extensions.Configuration;
using Notification.MailClient;
using Notification.Services.Interfaces;

namespace Notification.Notification
{
	public class NotificationService : INotificationService
	{
        private readonly IVolunteerService _volunteerService;
        private readonly IMailClientService _mailClientService;
        private readonly IConfiguration _configuration;

        public NotificationService(IConfiguration configuration, IVolunteerService volunteerService, IMailClientService mailClientService)
		{
            _configuration = configuration;
            _volunteerService = volunteerService;
            _mailClientService = mailClientService;
		}

        public async void SendUrgentMessage(AdNotificationEvent message)
        {
            var volunteers = await _volunteerService.GetVolunteers();
            var volunteerMails = volunteers.Select(x => x.Email).ToArray();
            var subject = "Urgent";
            var body = $"Your help is needed immediately! Check the details below:" +
                $"\n {_configuration.GetValue<string>("VolunteerHubLink")}/ad/{message.AdId}";
            var mailMessage = new MailClientEntity(volunteerMails, subject, body);
            _mailClientService.SendMessage(mailMessage);
        }
    }
}

