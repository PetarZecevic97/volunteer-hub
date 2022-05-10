using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Volunteer.Data;
using Volunteer.Entities;
using Volunteer.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
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

        public async Task<bool> UpdateVolunteer(VolunteerInfo volunteerInfo)
        {
            var updateResult = await _context.Volunteers.ReplaceOneAsync(p => p.Id.Equals(volunteerInfo.Id), volunteerInfo);
            return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        }

        public async Task<bool> DeleteCV(string id)
        {
            var deleteResult = await _context.VolunteerCVs.DeleteOneAsync(p => p.Id.Equals(id));
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

        public async Task<bool> DeleteVolunteer(string id)
        {
            var deleteCV = await DeleteCV(id);
            var deleteResult = await _context.Volunteers.DeleteOneAsync(p => p.Id.Equals(id));
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

        public async Task<bool> DeleteCVs()
        {
            var deleteResult = await _context.VolunteerCVs.DeleteManyAsync(Builders<VolunteerCV>.Filter.Empty);
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }
        public async Task<bool> DeleteAllVolunteers()
        {
            await DeleteCVs();
            var deleteResult = await _context.Volunteers.DeleteManyAsync(Builders<VolunteerInfo>.Filter.Empty);
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

        public async Task<IEnumerable<VolunteerCV>> GetCVs()
        {
            return await _context.VolunteerCVs.FindAsync<VolunteerCV>(Builders<VolunteerCV>.Filter.Empty).Result.ToListAsync<VolunteerCV>();

        }
        public async Task<VolunteerCV> GetCV(string id) 
        {
            return await _context.VolunteerCVs.Find(p => p.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<VolunteerCV> UploadCV(string id, IFormFile resume) 
        {
            await using var memoryStream = new MemoryStream();
            await resume.CopyToAsync(memoryStream);
            Byte[] resumeInBytes = memoryStream.ToArray();
            VolunteerCV newCV = new VolunteerCV(){Id = id, Resume = resumeInBytes};
            await _context.VolunteerCVs.InsertOneAsync(newCV);
            return newCV;
        }

        public async Task<bool> ChangeCV(string id, IFormFile resume)
        {
            await using var memoryStream = new MemoryStream();
            await resume.CopyToAsync(memoryStream);
            Byte[] resumeInBytes = memoryStream.ToArray();
            var updateResult = await _context.VolunteerCVs.ReplaceOneAsync(p => p.Id.Equals(id), new VolunteerCV(){Id = id, Resume = resumeInBytes});
            return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
            
        }
    }
}
