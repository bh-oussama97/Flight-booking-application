using Application.Core;
using Domain.Entities;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

namespace testApp
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }



    public void ConfigureServices(IServiceCollection services)
    {

      var connectionString = Configuration["ConnectionStrings:DefaultConnection"];


      services.AddAutoMapper(typeof(MappingProfile).Assembly);


      services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());

      services.AddScoped<TokenService>();
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));

      services.AddAuthentication(
      options =>
      {

        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      }
      ).AddJwtBearer(

      opt =>
      {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = key,
          ValidateIssuer = false,
          ValidateAudience = false,
          ValidateLifetime = true,
          RequireExpirationTime = false
        };
      });


      services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));


      services.AddIdentity<AppUser, Role>()
          .AddEntityFrameworkStores<ApplicationDbContext>()
          .AddDefaultTokenProviders();

      //services.AddSwaggerGen();

      // Add services to the container.

      services.AddControllers();
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      services.AddEndpointsApiExplorer();

      services.AddSwaggerGen(c =>
      {
        c.DescribeAllParametersInCamelCase();
        c.AddServer(new Microsoft.OpenApi.Models.OpenApiServer
        {
          Description = "Development Server",
          Url = "https://localhost:7061"
        });
        c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"] + e.ActionDescriptor.RouteValues["controller"]}");
      });
    }



    public static void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
    {

      app.UseCors(builder => builder.WithOrigins("*")
      .AllowAnyMethod()
      .AllowAnyHeader()
      );


      //app.UseMiddleware<ExceptionMiddleware>();


      // Configure the HTTP request pipeline.

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();

        // Enable middleware to serve generated Swagger as a JSON endpoint.

      }

      app.UseSwagger();
      app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));

      app.UseRouting();

      app.UseAuthentication();

      app.UseAuthorization();


      app.UseHttpsRedirection();

      app.UseDeveloperExceptionPage();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });


    }
  }
}
