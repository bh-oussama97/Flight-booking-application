using AutoMapper;
using Domain.DTO;
using Domain.Entities;


namespace Application.Core
{
    public class MappingProfile : Profile
    {
      public MappingProfile()
      {
        CreateMap<FlightRm, FlightDTO>().ReverseMap();
        CreateMap<TimePlaceRm, TimePlaceDTO>().ReverseMap();
      CreateMap<LoginPassengerDTO, AppUser>().ReverseMap();
        CreateMap<RegisterPassengerDTO, AppUser>()
        .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Username))
        .ForMember(u => u.Email, opt => opt.MapFrom(x => x.Email));
      CreateMap<Booking, BookDTO>().ReverseMap();
  
      }
    }
  
}

