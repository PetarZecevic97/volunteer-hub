using Microsoft.EntityFrameworkCore;
using Ads.Entities;
using Ads.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ad.Migrations;

namespace Ads.Repositories.Interfaces
{
    public class RepositoryBase<T> : IAsyncRepository<T> where T : AdEntity
    {
        protected readonly AdContext _dbContext;

        public RepositoryBase(AdContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public virtual async Task<IReadOnlyList<T>> GetAllAsync()
        {
            Console.WriteLine("get all async repository");
            return await _dbContext.Set<T>().Include(o => o.Volunteers!).ToListAsync();
        }

        public virtual async Task<T> GetByIdAsync(string id)
        {
            return _dbContext.Set<T>().Include(o => o.Volunteers!).Where(x => x.Id == id).Single();
        }

        public virtual async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbContext.Set<T>().Where(predicate).ToListAsync();
        }

        public virtual async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null, 
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, 
            string includeString = null, 
            bool disableTracking = true)
        {
            IQueryable<T> query = _dbContext.Set<T>();
            if (disableTracking) query = query.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(includeString)) query = query.Include(includeString);

            if (predicate != null) query = query.Where(predicate);

            if (orderBy != null)
                return await orderBy(query).ToListAsync();
            return await query.ToListAsync();
        }

        public virtual async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate = null, 
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, 
            List<Expression<Func<T, object>>> includes = null, 
            bool disableTracking = true)
        {
            IQueryable<T> query = _dbContext.Set<T>();
            if (disableTracking) query = query.AsNoTracking();

            if (includes != null) query = includes.Aggregate(query, (current, include) => current.Include(include));

            if (predicate != null) query = query.Where(predicate);

            if (orderBy != null)
                return await orderBy(query).ToListAsync();
            return await query.ToListAsync();
        }        

        public virtual async Task<T> AddAsync(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }


        public virtual async Task<T> UpdateAsync(T entity, string id)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return _dbContext.Set<T>().Include(o => o.Volunteers!).Where(x => x.Id == id).Single();
        }

        public virtual async Task DeleteAsync(string id)
        {
            AdEntity ad = await _dbContext.Ads.FindAsync(id);
            _dbContext.Ads.Remove(ad);
            await _dbContext.SaveChangesAsync();
        }

        public virtual async Task<T> AddVolunteer(AdVolunteerEntity volunteer)
        {
            _dbContext.AdsVolunteers.Add(volunteer);
            await _dbContext.SaveChangesAsync();
            return _dbContext.Set<T>().Include(o => o.Volunteers!).Where(x => x.Id == volunteer.AdId).Single();
        }

        public virtual async Task<T> DeleteVolunteer(string id, string volunteerId)
        {
            List<AdVolunteerEntity> ad = _dbContext.AdsVolunteers.Where(x => x.VolunteerId == volunteerId && x.AdId == id).ToList();
            _dbContext.AdsVolunteers.RemoveRange(ad);
            await _dbContext.SaveChangesAsync();
            return _dbContext.Set<T>().Include(o => o.Volunteers!).Where(x => x.Id == id).Single();
        }

    }
}
