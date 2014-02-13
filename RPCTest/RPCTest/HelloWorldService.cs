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
        private string ValidarLogin2(string usuario, string password)
        {
            if (usuario == "admin@a.com" && password == "123")
            {
                return "Bienvenido";
            }
            else if (usuario == "admin@a.com" && password != "123")
            {
                return "Usuario incorrecto";
            }
           
            else
            {
                return "Usuario no registrado";
            }
           
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