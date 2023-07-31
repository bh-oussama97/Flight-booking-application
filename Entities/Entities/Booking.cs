using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
  public class Booking
  {
    public Guid Id { get; set; }
    public string PassengerEmail { get; set; }
    public virtual FlightRm Flight { get; set; }
    public byte NumberOfSeats { get; set; }
  }
}
