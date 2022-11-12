﻿using VolunteerHubBackend.Entities;
using VolunteerHubBackend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace VolunteerHubBackend.Services
{
    public class VolunteerService : IVolunteerService
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private readonly IConfiguration _configuration;

        public VolunteerService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<VolunteerInfo> CreateVolunteer(VolunteerInfoCreate product)
        {
            VolunteerInfo newProduct = new VolunteerInfo();
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync(_configuration.GetValue<string>("VolunteerSettings:BasePath") + "/Volunteer", product);
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                newProduct = await response.Content.ReadFromJsonAsync<VolunteerInfo>();
            }
            return newProduct ?? throw new Exception();
        }

        public async Task<bool> DeleteVolunteer(string id)
        {
            bool result = false;
            HttpResponseMessage response = await _httpClient.DeleteAsync(_configuration.GetValue<string>("VolunteerSettings:BasePath") + "/Volunteer/" + id);
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                result = await response.Content.ReadFromJsonAsync<bool>();
            }
            return result;
        }

        public async Task<VolunteerInfo> GetVolunteer(string id)
        {
            VolunteerInfo product = new VolunteerInfo();
            HttpResponseMessage response = await _httpClient.GetAsync(_configuration.GetValue<string>("VolunteerSettings:BasePath") + "/Volunteer/" + id);
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                product = await response.Content.ReadFromJsonAsync<VolunteerInfo>();
            }
            return product ?? throw new Exception();
        }

        public async Task<IEnumerable<VolunteerInfo>> GetVolunteers()
        {
            IEnumerable<VolunteerInfo> product = new List<VolunteerInfo>();
            HttpResponseMessage response = await _httpClient.GetAsync(_configuration.GetValue<string>("VolunteerSettings:BasePath") + "/Volunteer/");
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                product = await response.Content.ReadFromJsonAsync<IEnumerable<VolunteerInfo>>();
            }
            return product ?? throw new Exception();
        }

        public async Task<IEnumerable<VolunteerInfo>> GetVolunteersBySkills(string skills)
        {
            IEnumerable<VolunteerInfo> product = new List<VolunteerInfo>();
            HttpResponseMessage response = await _httpClient.GetAsync(_configuration.GetValue<string>("VolunteerSettings:BasePath") + "/Volunteer/GetVolunteersBySkill/" + skills);
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                product = await response.Content.ReadFromJsonAsync<IEnumerable<VolunteerInfo>>();
            }
            return product ?? throw new Exception();
        }

        public async Task<bool> UpdateVolunteer(VolunteerInfo product)
        {
            bool result = false;
            HttpResponseMessage response = await _httpClient.PutAsJsonAsync(_configuration.GetValue<string>("VolunteerSettings:BasePath") + "/Volunteer", product);
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                result = await response.Content.ReadFromJsonAsync<bool>();
            }
            return result;
        }
    }
}
