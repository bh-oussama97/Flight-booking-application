

using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
  public class Role : IdentityRole
  {
    public ICollection<ApplicationUserRole> UserRoles { get; set; }
  }

}
