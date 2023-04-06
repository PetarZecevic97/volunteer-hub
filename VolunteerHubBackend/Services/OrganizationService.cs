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
    public class OrganizationService : IOrganizationService
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private readonly IConfiguration _configuration;

        public OrganizationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<Organization>> GetAllOrganizations()
        {
            IEnumerable<Organization> product = new List<Organization>();
            HttpResponseMessage response = await _httpClient.GetAsync(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization");
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                product = await response.Content.ReadFromJsonAsync<IEnumerable<Organization>>();
            }
            return product ?? throw new Exception();
        }

        public async Task<Organization> GetOrganizationById(string Id)
        {
            Organization product = new Organization();
            HttpResponseMessage response = await _httpClient.GetAsync(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization/" + Id);
            if (response.IsSuccessStatusCode)
            {
                if (!response.StatusCode.ToString().Equals("NoContent"))
                    product = await response.Content.ReadFromJsonAsync<Organization>();
            }
            return product ?? throw new Exception();
        }

        public async Task<Organization> CreateOrganization(OrganizationCreate product)
        {
            Organization newProduct = new Organization();
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization", product);
            if (response.IsSuccessStatusCode)
            {
                newProduct = await response.Content.ReadFromJsonAsync<Organization>();
            }
            return newProduct ?? throw new Exception();
        }

        public async Task<Organization> UpdateOrganization(Organization product)
        {
            HttpResponseMessage response = await _httpClient.PutAsJsonAsync(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization/" + product.Id, product);
            Organization result = await response.Content.ReadFromJsonAsync<Organization>();
            return result;
        }

        public async Task<HttpResponseMessage> DeleteOrganization(string id)
        {
            HttpResponseMessage response = await _httpClient.DeleteAsync(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization/" + id);
            return response;
        }
    }
}
