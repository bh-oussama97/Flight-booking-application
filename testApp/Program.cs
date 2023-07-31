

using Domain;
using Domain.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testApp
{

  public class Program
  {
    public static async Task Main(string[] args)

    {
      var host = CreateHostBuilder(args).Build();

      using var scope = host.Services.CreateScope();

      var services = scope.ServiceProvider;

      //try
      //{
      //  var context = services.GetRequiredService<ApplicationDbContext>();
      //  await Seed.SeedData(context);
      //}
      //catch (Exception e)
      //{
      //  var logger = services.GetRequiredService<ILogger<Program>>();
      //  logger.LogError(e, "An error occured during migration");
      //}

      await host.RunAsync();

    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>().UseDefaultServiceProvider((context, options) => {
                options.ValidateScopes = context.HostingEnvironment.IsDevelopment();
                options.ValidateOnBuild = false;
              });
            });
  }

}








