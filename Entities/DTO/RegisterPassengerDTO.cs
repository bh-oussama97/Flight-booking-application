using System.ComponentModel.DataAnnotations;

namespace Domain.DTO
{
  public class RegisterPassengerDTO
  {


    [Required]
    [EmailAddress]
    [StringLength(100,MinimumLength =3)]
    public string Email { get; set; }

    [Required]
    public string Username { get; set; }
    [Required]
    [MinLength(2)]
    [MaxLength(35)]
    public string FirstName { get; set; }
    [Required]
    [MinLength(2)]
    [MaxLength(35)]
    public string LastName { get; set; }
    [Required]
    //[RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
    public string Password { get; set; }
    [Required]

    public bool Gender { get; set; }
  }
}
