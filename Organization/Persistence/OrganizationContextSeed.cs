using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Organization.Entities;

namespace Organization.Persistence
{
    public class OrganizationContextSeed
    {
        public static async Task SeedAsync(OrganizationContext organizationContext, ILogger<OrganizationContextSeed> logger) {

            if (!organizationContext.Organizations.Any()) 
            {
                organizationContext.Organizations.AddRange(GetPredefinedOrganizations());
                await organizationContext.SaveChangesAsync();
                logger.LogInformation("Seeding database associated with context {DbContextName}", nameof(organizationContext));
            }
        
        }

        private static IEnumerable<OrganizationEntity> GetPredefinedOrganizations()
        {
            var organization1 = new OrganizationEntity(1, "nikola", DateTime.MinValue, "...", DateTime.MinValue, "organization_1", "asd1234", "This is a very cool organization!");
            var organization2 = new OrganizationEntity(2, "nikola", DateTime.MinValue, "...", DateTime.MinValue, "organization_2", "ghjk8890", "We love dogs, come help us pet them!");
            var organization3 = new OrganizationEntity(3, "nikola", DateTime.MinValue, "...", DateTime.MinValue, "organization_3", "xyz987", "The government is lying to you, help us spread the word!");
            return new List<OrganizationEntity> { organization1, organization2, organization3 };
        }
    }
}
