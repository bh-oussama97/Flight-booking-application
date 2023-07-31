using AutoMapper;
using Domain.DTO;
using Domain.Entities;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Flights
{
  public class BookFlight
  {
    public class Command : IRequest<CommandResult<FlightDTO>>
    {
      public BookDTO BookDTO { get; set; }
    }

    public class Handler : IRequestHandler<Command, CommandResult<FlightDTO>>
    {

      private readonly ApplicationDbContext datacontext;
      private readonly IMapper mapper;
      public Handler(ApplicationDbContext datacontext, IMapper mapper)
      {
        this.datacontext = datacontext;
        this.mapper = mapper;
      }

      public async Task<CommandResult<FlightDTO>> Handle(Command request, CancellationToken cancellationToken)
      {

        CommandResult<FlightDTO> result = new CommandResult<FlightDTO>();

        FlightRm flight = await datacontext.Flights.SingleOrDefaultAsync(f=> f.Id == request.BookDTO.FlightId);


        if (flight == null)
        {
          result.IsSuccess = false;
          result.Message = "flight not found";
          return result;
        }

        else if (flight.RemainingNumberOfSeats == 0)
        {
          result.IsSuccess = false;
          result.Message = "Not enough seats";
          result.ResponseData = mapper.Map<FlightDTO>(flight);
          return result;
        }

        else if (flight.RemainingNumberOfSeats < request.BookDTO.NumberOfSeats)
        {
          result.IsSuccess = false;
          result.Message = "the number of requested seats exceeds the number of remaining seats";
          result.ResponseData = mapper.Map<FlightDTO>(flight);
          return result;
        }

        else
        {

          var bookingFound = await datacontext.Bookings.FirstOrDefaultAsync(f=>f.Flight.Id == request.BookDTO.FlightId
          && f.PassengerEmail == request.BookDTO.PassengerEmail
          );

          if (bookingFound == null) {
            Booking book = mapper.Map<Booking>(request.BookDTO);

            book.Id = Guid.NewGuid();
            book.PassengerEmail = request.BookDTO.PassengerEmail;
            book.NumberOfSeats = request.BookDTO.NumberOfSeats;
            book.Flight = flight;


            await datacontext.Bookings.AddAsync(book);
            flight.RemainingNumberOfSeats -= request.BookDTO.NumberOfSeats;
          }

          else
          {

            bookingFound.NumberOfSeats += request.BookDTO.NumberOfSeats;
            bookingFound.Flight = flight;
            flight.RemainingNumberOfSeats -= request.BookDTO.NumberOfSeats;
          }


          try
          {
            await datacontext.SaveChangesAsync(cancellationToken);
            result.IsSuccess = true;
            result.Message = "Flight booked successfully , remaining seats :" + flight.RemainingNumberOfSeats;
            result.ResponseData = mapper.Map<FlightDTO>(flight);
          }
          catch (DbUpdateConcurrencyException e)
          {
            result.IsSuccess = false;
            result.Message = "An error occured while booking flight, please try again";
          }
        }

 
          return result;
        
      }

    }
  }
}
