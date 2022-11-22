using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using IdentityServer.Entities;
using IdentityServer.Data.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.Data
{
    public class IdentityContext: IdentityDbContext<User>
    {
        public IdentityContext(DbContextOptions options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}
