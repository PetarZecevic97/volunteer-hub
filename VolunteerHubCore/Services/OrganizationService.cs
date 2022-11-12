using VolunteerHubCore.Entities;
using VolunteerHubCore.Services.Interfaces;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace VolunteerHubCore.Services
{
    public class OrganizationService : IOrganizationService
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private readonly IConfiguration _configuration;

        public OrganizationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<Organization> CreateOrganization(OrganizationCreate product)
        {
            Organization newProduct = new Organization();
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization/CreateOrganization", product);
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                newProduct = await response.Content.ReadFromJsonAsync<Organization>();
            }
            return newProduct ?? throw new Exception();
        }

        public async Task<string> DeleteOrganization(Organization product)
        {
            string result = "";
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization/DeleteOrganization"),
                Content = new StringContent(JsonConvert.SerializeObject(product), Encoding.UTF8, "application/json")
            };
            HttpResponseMessage response = await _httpClient.SendAsync(request);
            return result;
        }

        public async Task<Organization> GetOrganizationById(int Id)
        {
            Organization product = new Organization();
            HttpResponseMessage response = await _httpClient.GetAsync(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization/GetOrganizationById/" + Id);
            if (response.IsSuccessStatusCode)
            {
                if (!response.StatusCode.ToString().Equals("NoContent"))
                    product = await response.Content.ReadFromJsonAsync<Organization>();
            }
            return product ?? throw new Exception();
        }

        public async Task<IEnumerable<Organization>> GetAllOrganizations()
        {
            IEnumerable<Organization> product = new List<Organization>();
            HttpResponseMessage response = await _httpClient.GetAsync(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization/GetAllOrganizations");
            if (response.IsSuccessStatusCode)
            {
                Console.Write(response);
                product = await response.Content.ReadFromJsonAsync<IEnumerable<Organization>>();
            }
            return product ?? throw new Exception();
        }

        public async Task<string> UpdateOrganization(Organization product)
        {
            string result = "";
            HttpResponseMessage response = await _httpClient.PutAsJsonAsync(_configuration.GetValue<string>("OrganizationSettings:BasePath") + "/Organization/UpdateOrganization", product);
            return result;
        }
    }
}
