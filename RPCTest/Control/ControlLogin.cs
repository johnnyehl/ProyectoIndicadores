using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AustinHarris.JsonRpc;
using System.Data;
using ADODBFactory;
using System.Data.Entity;



namespace Control
{
    public class ControlLogin : JsonRpcService
    {
        private IndicadoresEntityModel bd = new IndicadoresEntityModel();
        [JsonRpcMethod]
        private string ValidarLogin(string usuario,string pass){
          
            var qrydb = from user in bd.USUARIOS
                            where user.NOMBRE == usuario && user.PASSWORD == pass
                            select user;
            if (qrydb != null)
            {
                return "Usuario no Existe";
            }
            else return "Login Ok";            
        }

        [JsonRpcMethod]
        private string RegistrarLogin(string usuario,string nom,string apepat,string apemat,string email,string direc,string dni,string pass)
        {

            using (var bd1 = new IndicadoresEntityModel())
            {
                USUARIOS _usu = new USUARIOS();
                _usu.NOMBRE = nom;
                _usu.APEPAT = apepat;
                _usu.APEMAT = apemat;
                _usu.DIRECCION = direc;
                _usu.DNI = dni;
                _usu.EMAIL = email;
                _usu.CODUSUARIO = usuario;
                bd.USUARIOS.Attach(_usu);
                /*log.IDDET = cc.ID;*/
                bd1.SaveChanges();
                return "Registro OK";
            }
            
        }
    }
}
