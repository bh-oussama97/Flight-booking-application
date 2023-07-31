

using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{

  public class ApplicationUserRole : IdentityUserRole<string>
  {
    public virtual AppUser User { get; set; }
    public virtual Role Role { get; set; }
  }

}
