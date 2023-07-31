using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTO;
using Domain.Entities;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IdentityServer4.Models.IdentityResources;

namespace Application.Bookings
{
  public class MyBookingList
  {
    public class MyBookingListQuery : IRequest<List<BookingDTO>>
    {
      public string Email { get; set; }
    }

    public class MyBookingListQueryHandler : IRequestHandler<MyBookingListQuery,List<BookingDTO>>
    {
      private readonly ApplicationDbContext _datacontext;
      private readonly IMapper mapper;
      public MyBookingListQueryHandler( ApplicationDbContext datacontext,IMapper mapper)
      {
        this._datacontext = datacontext;
        this.mapper = mapper;
      }
      public async Task<List<BookingDTO>> Handle(MyBookingListQuery request, CancellationToken cancellationToken)
      {
        var bookings = await _datacontext.Bookings.Where(b => b.PassengerEmail == request.Email)
           .Select(b => new BookingDTO
           {
             FlightId = b.Flight.Id,
             Airline = b.Flight.Airline,
             Price = b.Flight.Price.ToString(),
             Arrival = new TimePlaceDTO(b.Flight.Arrival.Place, b.Flight.Arrival.Time),
             Departure = new TimePlaceDTO(b.Flight.Departure.Place, b.Flight.Departure.Time),
             NumberOfSeats = b.NumberOfSeats,
             PassengerEmail = request.Email,
           }).ToListAsync();


        System.Diagnostics.Debug.Write("booking list" + bookings);

       
        if (bookings != null)
        {
         return  mapper.Map<List<BookingDTO>>(bookings);
        }

        return null;
      }
    }
  }
}
