using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Organization.Persistence;
using Organization.Repositories.Interfaces;

namespace Organization
{
    public static class OrganizationServiceRegistration
    {

        public static IServiceCollection AddOrganizationServices(this IServiceCollection services, IConfiguration configuration) {

            services.AddDbContext<OrganizationContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("OrganizationConnectionString"))
            );

            services.AddScoped(typeof(IAsyncRepository<>), typeof(RepositoryBase<>));

            return services;
        }

    }
}
