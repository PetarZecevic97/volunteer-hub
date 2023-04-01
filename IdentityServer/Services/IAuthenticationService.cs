using IdentityServer.DTOs;
using IdentityServer.Entities;
using System.Threading.Tasks;

namespace IdentityServer.Services
{
    public interface IAuthenticationService
    {
        Task<User> ValidateUser(UserCredentialsDto userCredentials);
        Task<AuthenticationModel> CreateAuthenticationModel(User user);
        Task RemoveRefreshToken(User user, string refreshToken);
    }
}
