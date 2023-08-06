using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ads.Entities;
using Ads.Persistence.EntityConfiguration;

namespace Ads.Persistence
{
	public class AdContext : DbContext
    {
		public AdContext(DbContextOptions options) : base(options)
        {
		}

        public DbSet<AdEntity> Ads { get; set; }
        public DbSet<AdVolunteerEntity> AdsVolunteers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Adding configuration defined for Ad tabel
            modelBuilder.ApplyConfiguration(new AdEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new AdVolunteerEntityTypeConfiguration());

            base.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            //For every new ad in datebase we set OpenedDate property to be current time and
            //we do the same for LastModifiedDate if ad is modified            
            foreach (var entity in ChangeTracker.Entries<AdEntity>())
            {
                switch (entity.State)
                {
                    case EntityState.Added:
                        entity.Entity.OpenedDate = DateTime.Now;
                        entity.Entity.LastModifiedDate = DateTime.Now;
                        entity.Entity.IsOpen = true;
                        break;
                    case EntityState.Modified:
                        entity.Entity.LastModifiedDate = DateTime.Now;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}

