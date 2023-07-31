using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
  public class FlightSearchDTO
  {
    [DefaultValue("12/25/2022 10:30:00 AM")]
    public DateTime? FromDate { get; set; }
    [DefaultValue("12/26/2022 10:30:00 AM")]
    public DateTime? ToDate { get; set; }
    [DefaultValue("Los Angeles")]
    public string? From { get; set; }
    [DefaultValue("Berlin")]
    public string? Destination { get; set; }
    [DefaultValue(1)]
    public int? NumberOfPassengers { get; set; }
  }
}
