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
        /*
        [JsonRpcMethod]
        private List<String> lista(string item)
        {
            List<String> lista1= new List<string>();
            lista1.Add("uno");
            lista1.Add("dos");
            lista1.Add("tres");

        }*/



    }
}