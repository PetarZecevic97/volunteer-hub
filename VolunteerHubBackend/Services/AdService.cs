using VolunteerHubBackend.Entities;
using VolunteerHubBackend.Services.Interfaces;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using System.Net.Http.Json;
using System.Collections.Generic;

namespace VolunteerHubBackend.Services
{
    public class AdService : IAdService
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private readonly IConfiguration _configuration;

        public AdService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<Ad>> GetAllAds()
        {
            IEnumerable<Ad> product = new List<Ad>();
            HttpResponseMessage response = await _httpClient.GetAsync(_configuration.GetValue<string>("AdSettings:BasePath") + "/Ad");
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                product = await response.Content.ReadFromJsonAsync<IEnumerable<Ad>>();
            }
            return product ?? throw new Exception();
        }

        public async Task<Ad> GetAdById(string Id)
        {
            Ad product = new Ad();
            HttpResponseMessage response = await _httpClient.GetAsync(_configuration.GetValue<string>("AdSettings:BasePath") + "/Ad/" + Id);
            if (response.IsSuccessStatusCode)
            {
                if (!response.StatusCode.ToString().Equals("NoContent"))
                    product = await response.Content.ReadFromJsonAsync<Ad>();
            }
            return product ?? throw new Exception();
        }

        public async Task<Ad> CreateAd(AdCreate product)
        {
            Ad newProduct = new Ad();
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync(_configuration.GetValue<string>("AdSettings:BasePath") + "/Ad", product);
            if (response.IsSuccessStatusCode)
            {
                newProduct = await response.Content.ReadFromJsonAsync<Ad>();
            }
            return newProduct ?? throw new Exception();
        }

        public async Task<Ad> UpdateAd(Ad product)
        {
            HttpResponseMessage response = await _httpClient.PutAsJsonAsync(_configuration.GetValue<string>("AdSettings:BasePath") + "/Ad/" + product.Id, product);
            Ad result = await response.Content.ReadFromJsonAsync<Ad>();
            return result;
        }

        public async Task<HttpResponseMessage> DeleteAd(string id)
        {
            HttpResponseMessage response = await _httpClient.DeleteAsync(_configuration.GetValue<string>("AdSettings:BasePath") + "/Ad/" + id);
            return response;
        }

        public async Task<Ad> AddVolunteer(AdVolunteerCreate product)
        {
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync(_configuration.GetValue<string>("AdSettings:BasePath") + "/Ad/" + product.AdId + "/" + product.VolunteerId, product);
            Ad result = await response.Content.ReadFromJsonAsync<Ad>();
            return result;
        }

        public async Task<Ad> DeleteVolunteer(string adId, string volunteerId)
        {
            HttpResponseMessage response = await _httpClient.DeleteAsync(_configuration.GetValue<string>("AdSettings:BasePath") + "/Ad/" + adId + "/" + volunteerId);
            Ad result = await response.Content.ReadFromJsonAsync<Ad>();
            return result;
        }

    }
}
