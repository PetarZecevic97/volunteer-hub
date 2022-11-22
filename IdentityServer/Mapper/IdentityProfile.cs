using AutoMapper;
using IdentityServer.DTOs;
using IdentityServer.Entities;

namespace IdentityServer.Mapper
{
    public class IdentityProfile : Profile
    {
        public IdentityProfile()
        {
            CreateMap<User, NewUserDto>().ReverseMap();
            CreateMap<User, UserDetails>().ReverseMap();
        }
    }
}
