using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Ads.Entities;

namespace Ads.Persistence
{
	public class AdContextSeed
	{
        public static async Task SeedAsync(AdContext adContext, ILogger<AdContextSeed> logger)
        {
            if (!adContext.Ads.Any())
            {
                adContext.Ads.AddRange(GetPredefinedAds());
                await adContext.SaveChangesAsync();
                logger.LogInformation("Seeding database associated with context {DbContextName}", nameof(adContext));
            }

        }

        private static IEnumerable<AdEntity> GetPredefinedAds()
        {
            var ad1 = new AdEntity(System.Guid.NewGuid().ToString(), "Budite kul s nama", "Netflix&Chill", "kulj, hladan, kupus", true, "Bg", "asd1234");
            var ad2 = new AdEntity(System.Guid.NewGuid().ToString(), "DogPetCenter", "Mazimo kerove zajedno", "psi, furryBabies", true, "Novi sad", "ghjk8890");
            var ad3 = new AdEntity(System.Guid.NewGuid().ToString(), "Matrix is it you?", "Do we live in a matrix (that's a rethorical question of course we do)", "teoreticari, zavere", true, "Stara Pazova", "xyz987");
            var ad4 = new AdEntity(System.Guid.NewGuid().ToString(), "Napravite nam kulji opis", "Los nam je opis, molim vas pomagajte kako znate i mozete", "umjetnik u opisu", true, "Nis", "www333");
            var ad5 = new AdEntity(System.Guid.NewGuid().ToString(), "Aj jos jedan pls", "Treba nam jos jedan opis quicky plzz", "second hand artist", true, "Uzice", "bnm789");

            return new List<AdEntity> { ad1, ad2, ad3, ad4, ad5 };
        }
	}
}

