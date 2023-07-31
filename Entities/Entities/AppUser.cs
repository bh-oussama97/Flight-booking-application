using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;


namespace Domain.Entities
{
  public class AppUser : IdentityUser
  {
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public bool Gender { get; set; }


    public ICollection<ApplicationUserRole> UserRoles { get; set; }

    public AppUser(string email, string firstName, string lastName, bool gender)
    {
      Email = email;
      FirstName = firstName;
      LastName = lastName;
      Gender = gender;
    }
  }
}
