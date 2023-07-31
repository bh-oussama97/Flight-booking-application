using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{

  public class FlightRm
  {
    public Guid Id { get; set; }

    public string Airline { get; set;}

    public string Price { get; set;}

    public TimePlaceRm Departure { get; set; }

    public virtual Guid DepartureId { get; set; }

    public TimePlaceRm Arrival { get; set; }

    public virtual Guid ArrivalId { get; set; }

    public ICollection<Booking>  Bookings { get; set; }


    public int RemainingNumberOfSeats { get; set; }

    public FlightRm()
    {

    }

    public FlightRm(Guid id, string airline, string price, TimePlaceRm departure, TimePlaceRm arrival, int remainingNumberOfSeats)
    {
      Id = id;
      Airline = airline;
      Price = price;
      Departure = departure;
      Arrival = arrival;
      RemainingNumberOfSeats = remainingNumberOfSeats;
    }
  }

}
