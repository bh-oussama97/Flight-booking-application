using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
  public class BookingDTO
  {
    public Guid FlightId { get; set; }
    public string Airline { get; set; }

    public string Price { get; set; }
    public TimePlaceDTO Arrival { get; set; }
    public TimePlaceDTO Departure { get; set; }
    public string PassengerEmail { get; set; }
    public int NumberOfSeats { get; set; }


  }
}
