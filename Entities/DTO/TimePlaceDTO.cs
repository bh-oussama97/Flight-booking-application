using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
  public class TimePlaceDTO
  {
    public string Place { get; set; }

    public DateTime Time { get; set; }

    public TimePlaceDTO(string Place, DateTime Time)
    {
      this.Place = Place;
      this.Time = Time;
    }
  }
}
