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

            /* NOTE: If we add more data through code (that is, through seeding function "GetPredefinedOrganizations()") their insertion will
             *       be skipped because organizationContext.Organizations won't be empty.                  
             */
            if (!organizationContext.Organizations.Any()) 
            {
                organizationContext.Organizations.AddRange(GetPredefinedOrganizations());
                await organizationContext.SaveChangesAsync();
                logger.LogInformation("Seeding database associated with context {DbContextName}", nameof(organizationContext));
            }
        
        }

        private static IEnumerable<OrganizationEntity> GetPredefinedOrganizations()
        {
            var organization1 = new OrganizationEntity(System.Guid.NewGuid().ToString(), "organization_1", "asd1234", "This is a very cool organization!");
            var organization2 = new OrganizationEntity(System.Guid.NewGuid().ToString(), "organization_2", "ghjk8890", "We love dogs, come help us pet them!");
            var organization3 = new OrganizationEntity(System.Guid.NewGuid().ToString(), "organization_3", "xyz987", "The government is lying to you, help us spread the word!");
            var organization4 = new OrganizationEntity(System.Guid.NewGuid().ToString(), "organization_4", "www333", "We have a really cool description here!");
            var organization5 = new OrganizationEntity(System.Guid.NewGuid().ToString(), "organization_5", "bnm789", "Yet another description!");

            return new List<OrganizationEntity> { organization1, organization2, organization3, organization4, organization5 };
        }
    }
}
