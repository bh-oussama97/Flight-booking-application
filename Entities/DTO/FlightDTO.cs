using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Domain.DTO
{
  public class FlightDTO 
  {
    public Guid Id { get; set; }

    public string Airline { get; set; }

    public string Price { get; set; }

    public TimePlaceDTO Departure { get; set; }


    public TimePlaceDTO Arrival { get; set; }



    public int RemainingNumberOfSeats { get; set; }

  }



}
