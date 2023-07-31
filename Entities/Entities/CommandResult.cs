using Newtonsoft.Json;


namespace Domain.Entities
{

  public class CommandResult
  {

    public bool Success { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string Message { get; set; }
    public string contentId { get; set; }
  }

  public class CommandResult<T>
  {

    public bool IsSuccess { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string Message { get; set; }
    public T ResponseData { get; set; }
    public CommandResult() { }
    public CommandResult(T data, int code = 200)
    {
      IsSuccess = code is >= 200 and < 300;
      Message = code is >= 200 and < 300 ? "success" : "error";
      ResponseData = data;
    }

  }


}
