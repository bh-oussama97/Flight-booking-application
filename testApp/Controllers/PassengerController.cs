using Application.Passengers;
using AutoMapper;
using Domain.DTO;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace testApp.Controllers
{

  public class PassengerController : BaseApiController
  {


    [HttpPost("[action]")]

    public async Task<ActionResult<CommandResult<PassengerDTO>>> Register(
       RegisterPassengerDTO dto)
    {


      var result = await Mediator.Send(new RegisterPassenger.Command { PassengerDTO = dto });

      if (result == null)

        return BadRequest("Error");

      return Ok(result);


    }

    [HttpPost("[action]")]
    public async Task<ActionResult<CommandResult<PassengerDTO>>> Login(LoginPassengerDTO loginDTO)
    {
      var result = await  Mediator.Send(new LoginPassenger.LoginPassengerCommand { loginPassengerDTo = loginDTO });

      if (result == null)

        return BadRequest("Error");

      return Ok(result);

    }
  }
}
