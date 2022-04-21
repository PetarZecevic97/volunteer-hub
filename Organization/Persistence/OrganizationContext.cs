using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Organization.Persistence
{
    public class OrganizationContext : DbContext
    {
        public OrganizationContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<Entities.Organization> Organizations { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            //For evry new organization in datebase we set JoinedOn property to be current time
            foreach (var entity in ChangeTracker.Entries<Entities.Organization>())
            {
                switch (entity.State) {
                    case EntityState.Added:
                        entity.Entity.JoinedOn = DateTime.Now;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Adding configuration defined for Organization tabel
            modelBuilder.ApplyConfiguration(new EntityConfigurations.OrganizationEntityTypeConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}
