using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTO;
using Domain.Entities;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace Application.Flights
{
  public class SearchFlights
  {

    public class SearchFlightsQuery : IRequest<List<FlightDTO>>
    {
      public FlightSearchDTO parameters { get; set; }
    }

    public class Handler : IRequestHandler<SearchFlightsQuery, List<FlightDTO>>

    {

      private readonly ApplicationDbContext datacontext;
      private readonly IMapper mapper;

      public Handler(ApplicationDbContext datacontext, IMapper mapper)
      {
        this.datacontext = datacontext;
        this.mapper = mapper;
      }

      public async Task<List<FlightDTO>> Handle(SearchFlightsQuery request, CancellationToken cancellationToken)
      {
        try
        {

          IQueryable<FlightRm> flights =  datacontext.Flights;

          if (!string.IsNullOrWhiteSpace(request.parameters.Destination))
          {
            flights = flights.Where(f => f.Arrival.Place.Contains(request.parameters.Destination));
          }

          if (!string.IsNullOrWhiteSpace(request.parameters.From))
          {
            flights = flights.Where(f => f.Departure.Place.Contains(request.parameters.From));
          }

          if (request.parameters.FromDate != null)
          {
            flights = flights.Where(f => f.Departure.Time >= request.parameters.FromDate.Value.Date);
          }

          if (request.parameters.ToDate != null)
          {
            flights = flights.Where(f => f.Departure.Time >= request.parameters.ToDate.Value.Date.AddDays(1).AddTicks(-1));
          }

          if (request.parameters.NumberOfPassengers !=0 && request.parameters.NumberOfPassengers != null)
          {
            flights = flights.Where(f => f.RemainingNumberOfSeats >= request.parameters.NumberOfPassengers);
          }

          else
          {
            flights = flights.Where(f => f.RemainingNumberOfSeats >= 1);
          }

            

           var flightsList = await flights.Include(flight=>flight.Departure)
            .Include(flight=>flight.Arrival)
            .ToListAsync();


          if (flightsList != null)
          {
            return mapper.Map<List<FlightDTO>>(flightsList);
          }

          return null;

        }
        catch (Exception ex)
        {
          return new List<FlightDTO>();

        }

      }
    }


  }

}
