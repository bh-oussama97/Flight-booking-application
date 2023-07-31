using AutoMapper;
using Domain.DTO;
using Domain.Entities;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Passengers
{
  public class RegisterPassenger 
  {
    public class Command : IRequest<CommandResult<PassengerDTO>>
    {
      public RegisterPassengerDTO PassengerDTO { get; set; }
    }

    public class Handler : IRequestHandler<Command, CommandResult<PassengerDTO>>
    {
      private readonly IMapper mapper;
      private readonly UserManager<AppUser> userManager;
      private readonly TokenService tokenservice;

      public Handler(IMapper mapper,
        UserManager<AppUser> userManager, TokenService tokenService
        )
      {
        this.userManager = userManager;
        this.mapper = mapper;
        this.tokenservice = tokenService;
      }

      public async Task<CommandResult<PassengerDTO>> Handle(Command request, CancellationToken cancellationToken)
      {

        CommandResult<PassengerDTO> commandResult = new CommandResult<PassengerDTO> ();


        var passengerToAdd = mapper.Map<AppUser>(request.PassengerDTO);



        passengerToAdd.FirstName = request.PassengerDTO.FirstName;
        passengerToAdd.LastName = request.PassengerDTO.LastName;
        passengerToAdd.UserName = request.PassengerDTO.Username;
        passengerToAdd.Email = request.PassengerDTO.Email;
        passengerToAdd.Gender = request.PassengerDTO.Gender;
        passengerToAdd.Id = Guid.NewGuid().ToString();


        if (userManager.Users.Any(x => x.Email == request.PassengerDTO.Email))
        {
          commandResult.Message = "Email alraedy taken";
          commandResult.IsSuccess = false;
          return commandResult;
        }


            var result = await userManager.CreateAsync(passengerToAdd, request.PassengerDTO.Password);


        if (!result.Succeeded)

        {
          foreach(var err in result.Errors)
          {
            commandResult.Message = err.Description;
            commandResult.IsSuccess = false;
          }

          return commandResult;
        }
        else
        {
          commandResult.Message = "Passenger successfully registered";
          commandResult.IsSuccess = true;
          commandResult.ResponseData = new PassengerDTO { Email = passengerToAdd.Email,
            FirstName = passengerToAdd.FirstName,
            LastName = passengerToAdd.LastName,
            Token = tokenservice.createToken(passengerToAdd)
          };
          return commandResult;
        }

      }
    }
  }
}
