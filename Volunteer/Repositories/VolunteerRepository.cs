using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Volunteer.Data;
using Volunteer.Entities;
using Volunteer.Repositories.Interfaces;

namespace Volunteer.Repositories
{
    public class VolunteerRepository : IVolunteerRepository
    {
        private readonly IVolunteerContext _context;
        public VolunteerRepository(IVolunteerContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<VolunteerInfo>> GetVolunteers()
        {
            return await _context.Volunteers.FindAsync<VolunteerInfo>(Builders<VolunteerInfo>.Filter.Empty).Result.ToListAsync<VolunteerInfo>();
        }

        public async Task<VolunteerInfo> GetVolunteer(string id)
        {
            var volunteers = await _context.Volunteers.FindAsync<VolunteerInfo>(Builders<VolunteerInfo>.Filter.Empty).Result.ToListAsync<VolunteerInfo>();
            return await _context.Volunteers.Find(p => p.Id.Equals(id)).FirstOrDefaultAsync();
        }



        public async Task<IEnumerable<VolunteerInfo>> GetVolunteersBySkills(string skills)
        {
            string[] skillsArray = skills.Split(",");
            return await _context.Volunteers.Find(Builders<VolunteerInfo>.Filter.AnyIn(x => x.Skills, skillsArray)).ToListAsync();
        }

        public async Task CreateVolunteer(VolunteerInfo volunteerInfo)
        {
            await _context.Volunteers.InsertOneAsync(volunteerInfo);
        }

        public async Task<VolunteerInfo> UpdateVolunteer(VolunteerInfo volunteerInfo)
        {
            var updateResult = await _context.Volunteers.ReplaceOneAsync(p => p.Id.Equals(volunteerInfo.Id), volunteerInfo);
            return await _context.Volunteers.Find(p => p.Id.Equals(volunteerInfo.Id)).FirstOrDefaultAsync();
        }

        public async Task<bool> DeleteVolunteer(string id)
        {
            var deleteResult = await _context.Volunteers.DeleteOneAsync(p => p.Id.Equals(id));
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }
    }
}
