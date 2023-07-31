using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTO;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Application.Flights.SearchFlights;

namespace Application.Flights
{
  public class FindFlightById
  {

    public class GetFlightQuery : IRequest<FlightDTO>
    {
      public Guid Id { get; set; }
    }


    public class GetFlightQueryHandler : IRequestHandler<GetFlightQuery, FlightDTO>
    {

      private readonly ApplicationDbContext datacontext;
      private readonly IMapper mapper;

      public GetFlightQueryHandler(ApplicationDbContext datacontext, IMapper mapper)
      {
        this.datacontext = datacontext;
        this.mapper = mapper;
      }

      public async Task<FlightDTO> Handle(GetFlightQuery request, CancellationToken cancellationToken)
      {

        var flight = await datacontext.Flights.ProjectTo<FlightDTO>(mapper.ConfigurationProvider)
          .FirstOrDefaultAsync(f => f.Id == request.Id);

        if (flight == null)
          return null;

        return flight;
      }
    }



  }
}
