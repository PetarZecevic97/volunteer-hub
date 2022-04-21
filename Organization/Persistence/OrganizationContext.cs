using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Organization.Entities;
using Organization.Persistence.EntityConfigurations;

namespace Organization.Persistence
{
    public class OrganizationContext : DbContext
    {
        public OrganizationContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<OrganizationEntity> Organizations { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            //For every new organization in datebase we set CreatedDate property to be current time and
            //we do the same for LastModifiedDate if organization is modified
            foreach (var entity in ChangeTracker.Entries<OrganizationEntity>())
            {
                switch (entity.State) {
                    case EntityState.Added:
                        entity.Entity.CreatedDate = DateTime.Now;
                        entity.Entity.CreatedBy = "nikola-created(hardcoded)";
                        break;
                    case EntityState.Modified:
                        entity.Entity.LastModifiedDate = DateTime.Now;
                        entity.Entity.LastModifiedBy = "nikola-modified(hardcoded)";
                        break;


                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Adding configuration defined for Organization tabel
            modelBuilder.ApplyConfiguration(new OrganizationEntityTypeConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}
