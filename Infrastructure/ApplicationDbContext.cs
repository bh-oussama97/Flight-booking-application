using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
  public class ApplicationDbContext : IdentityDbContext<AppUser, Role, string,
                                        IdentityUserClaim<string>, ApplicationUserRole,
                                        IdentityUserLogin<string>, IdentityRoleClaim<string>,
                                        IdentityUserToken<string>>
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.Entity<ApplicationUserRole>(userRole =>
      {
        //add composed primary key (user id ,role id)
        userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

        userRole.HasOne(ur => ur.Role)
            .WithMany(r => r.UserRoles)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();

        userRole.HasOne(ur => ur.User)
            .WithMany(r => r.UserRoles)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();
      });


      modelBuilder.Entity<FlightRm>()
          .HasOne(f => f.Arrival)
          .WithMany()
          .HasForeignKey(f => f.ArrivalId)
          .OnDelete(DeleteBehavior.NoAction);

      ;

      // Configure the relationship between Flight.DepartureId and TimePlace.Id
      modelBuilder.Entity<FlightRm>()
          .HasOne(f => f.Departure)
          .WithMany()
          .HasForeignKey(f => f.DepartureId).OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<Booking>()
        .HasOne(b => b.Flight)
        .WithMany(f => f.Bookings)
        .OnDelete(DeleteBehavior.Cascade);


      //modelBuilder.Entity<FlightRm>().OwnsOne(f => f.Departure);
      //modelBuilder.Entity<FlightRm>().OwnsOne(f => f.Arrival);

      modelBuilder.Entity<FlightRm>().Property(p => p.RemainingNumberOfSeats).IsConcurrencyToken();  


    }



    public DbSet<Booking> Bookings { get; set; }


    public DbSet<FlightRm> Flights { get; set; }

    public DbSet<TimePlaceRm> TimePlaces { get; set; }

  }
}
