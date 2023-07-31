using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
  public class BookingToDeleteDTO
  {
    public Guid FlightId { get; set; }
    public Byte NumberOfSeats { get; set; }
    public string PassengerEmail { get; set; }
  }
}
