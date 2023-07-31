using Domain.DTO;
using Domain.Entities;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace Application.Passengers
{
  public class LoginPassenger
  {
    public class LoginPassengerCommand:IRequest<CommandResult<PassengerDTO>>
    {
      public LoginPassengerDTO loginPassengerDTo { get; set; }
    }

    public class Handler: IRequestHandler<LoginPassengerCommand, CommandResult<PassengerDTO>>
    {

      private readonly UserManager<AppUser> _userManager;
      private readonly SignInManager<AppUser> _siginInmanager;
      private readonly TokenService _tokenservice;



      public Handler(UserManager<AppUser> userManager, TokenService tokenservice,SignInManager<AppUser> signInManager)
      {
        this._userManager = userManager;
        this._tokenservice = tokenservice;
        this._siginInmanager = signInManager;
      }

      public async Task<CommandResult<PassengerDTO>> Handle(LoginPassengerCommand request, CancellationToken cancellationToken)
      {

        CommandResult<PassengerDTO> commandresult = new CommandResult<PassengerDTO>();

        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == request.loginPassengerDTo.Email);

        if (user == null)

        {
          commandresult.IsSuccess = false;
          commandresult.Message = "Unauthorized";
          return commandresult;
        }

        var result = await _siginInmanager.CheckPasswordSignInAsync(user, request.loginPassengerDTo.Password, false);

        if (result.Succeeded)
        {
          commandresult.Message = "Passenger successfully logged in";
          commandresult.IsSuccess = true;
          commandresult.ResponseData = new PassengerDTO
          {
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Token = _tokenservice.createToken(user)
          };
          return commandresult;

        }

        commandresult.IsSuccess = false;
        commandresult.Message = result.ToString();

        return commandresult;

      }
    }


  }
}
