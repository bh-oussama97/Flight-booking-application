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

namespace Application.Bookings
{
  public class CancelBooking
  {
    public class CancelBookingQuery : IRequest<CommandResult>
    {
      public BookingToDeleteDTO BookingDTO { get; set; }
    }

    public class CancelBookingHandler : IRequestHandler<CancelBookingQuery, CommandResult>
    {
      private readonly ApplicationDbContext context;
      private readonly IMapper mapper;
      public CancelBookingHandler(ApplicationDbContext context,IMapper mapper)
      {
        this.mapper = mapper;
        this.context = context;
      }

      public async Task<CommandResult> Handle(CancelBookingQuery request, CancellationToken cancellationToken)
      {

        CommandResult result = new CommandResult();

        var booking = await context.Bookings
          .FirstOrDefaultAsync(
          b => b.NumberOfSeats == request.BookingDTO.NumberOfSeats
          && b.PassengerEmail.ToLower() == request.BookingDTO.PassengerEmail.ToLower())
          ;

        FlightRm flight = await context.Flights.
          SingleOrDefaultAsync(f=>f.Id == request.BookingDTO.FlightId);

        try
        {
         
          if (booking != null && flight!= null)
          {
            Booking bookingToDelete = mapper.Map<Booking>(booking);
            flight.RemainingNumberOfSeats += booking.NumberOfSeats;

            context.Bookings.Remove(bookingToDelete);

            var resultdelete = await context.SaveChangesAsync() > 0;

            if (resultdelete)

            {
              result.Success = true;
              result.Message = "Booking of flight is cancelled";
            }

          }

        }
        catch (Exception ex)
        {
          result.Success = false;
          result.Message = ex.Message;
        }
        return result;
      }
    }
  }
}
