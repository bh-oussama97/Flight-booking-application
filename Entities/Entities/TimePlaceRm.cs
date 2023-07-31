using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
  public class TimePlaceRm
  {
    [Key]
    public Guid Id { get; set; }
    public string Place { get; set; }

    public DateTime Time { get; set; }



    public TimePlaceRm(string Place,DateTime Time) {
      this.Place = Place;
      this.Time = Time;
    }
  }

}
