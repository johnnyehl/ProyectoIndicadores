using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AustinHarris.JsonRpc;
namespace RPCTest
{
    public class HelloWorldService : JsonRpcService
    {
        [JsonRpcMethod]
        private string helloWorld(string message)
        {
            return "Hello World " + message;
        }






    }
}