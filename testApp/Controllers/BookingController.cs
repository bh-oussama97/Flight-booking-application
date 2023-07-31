using Application.Bookings;
using Application.Flights;
using Domain.DTO;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace testApp.Controllers
{

  public class BookingController : BaseApiController
  {

    [HttpGet("{email}")]

    public async Task<ActionResult<List<BookingDTO>>> MyBookings(string email)
    {

      var result = await Mediator.Send(new MyBookingList.MyBookingListQuery { Email = email });
      return Ok(result);
    }


    [HttpDelete]
    public async Task<ActionResult<CommandResult>> CancelBooking(BookingToDeleteDTO bookingDTO)
    {
      var result = await Mediator.Send(new CancelBooking.CancelBookingQuery { BookingDTO= bookingDTO });
      return Ok(result);
    }
  }
}

