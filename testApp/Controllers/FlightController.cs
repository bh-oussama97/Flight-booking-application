using Application.Flights;
using Domain.DTO;
using Domain.Entities;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace testApp.Controllers
{

  public class FlightController : BaseApiController
  {



    [HttpPost("[action]")]

    public async Task<ActionResult<CommandResult<FlightDTO>>> Book(BookDTO bookDTO)
    {
      var res = await Mediator.Send(new BookFlight.Command { BookDTO = bookDTO });

      return Ok(res);
    }

    [HttpGet]

    public async Task<ActionResult<List<FlightDTO>>> Search([FromQuery] FlightSearchDTO parameters)
    {
      var res =  await Mediator.Send(new SearchFlights.SearchFlightsQuery{ parameters = parameters });
        
      return Ok(res);
    }


    [HttpGet("{FlightId}")]

    public async Task<ActionResult<FlightDTO>> Find(Guid FlightId)
    {

      var result= await Mediator.Send(new FindFlightById.GetFlightQuery { Id = FlightId });
      return Ok(result);
    }


  }
}


  

