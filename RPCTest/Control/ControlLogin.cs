using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AustinHarris.JsonRpc;
using System.Data;
using ADODBFactory;
using System.Data.Entity;
using Dominio;


namespace Control
{
    public class ControlLogin : JsonRpcService
    {
        [JsonRpcMethod]
        public List<Usuario> ValidarLogin(string usu, string pass)
        {
            using (var bd = new IndicadoresEntityModel())
            {
                var qrydb = from user in bd.USUARIOS
                            where user.EMAIL == usu && user.PASSWORD == pass
                            select new Usuario() { IDUSUARIO = user.IDUSUARIO, CODUSUARIO = user.CODUSUARIO, APEPAT = user.APEPAT, APEMAT = user.APEMAT, NOMBRE = user.NOMBRE, EMAIL = user.EMAIL, DIRECCION = user.DIRECCION, DNI = user.DNI, PASSWORD = user.PASSWORD };
                if (qrydb.Count() > 0)
                {
                    return qrydb.ToList(); //ejecuta

                }
                else
                {

                return null; //wilmer expresate
                }
            }
        }
        //[JsonRpcMethod]
        //private string RegistrarLogin(string usuario,string nom,string apepat,string apemat,string email,string direc,string dni,string pass)
        //{

        //    using (var bd1 = new IndicadoresEntityModel())
        //    {
        //        USUARIOS _usu = new USUARIOS();
        //        _usu.NOMBRE = nom;
        //        _usu.APEPAT = apepat;
        //        _usu.APEMAT = apemat;
        //        _usu.DIRECCION = direc;
        //        _usu.DNI = dni;
        //        _usu.EMAIL = email;
        //        _usu.CODUSUARIO = usuario;
        //        bd.USUARIOS.Attach(_usu);
        //        /*log.IDDET = cc.ID;*/
        //        bd1.SaveChanges();
        //        return "Registro OK";
        //    }
            
        //}
    }
}
