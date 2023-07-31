using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
  public class BookDTO
  {
    [Required]
    public Guid FlightId { get; set; }
    [Required]  
    [EmailAddress]
    [StringLength(100,MinimumLength =3)]
    public string PassengerEmail { get; set; }
    [Required]
    [Range(1,254)]
    public byte NumberOfSeats { get; set; }

  }
} 
