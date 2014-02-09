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
        [JsonRpcMethod]
        private string RegistrarLogin(string usuario, string nom, string apepat, string apemat, string email, string direc, string dni, string pass)
        {

            using (IndicadoresEntityModel bd = new IndicadoresEntityModel())
            {
                if (bd.USUARIOS.Any(u => u.EMAIL == email))
                {
                    return "El Email Ingresado Ya se Encuentra en uso";
                }
                else if (bd.USUARIOS.Any(u => u.CODUSUARIO == usuario))
                {
                    return "El Nombre de Usuario Ingresado Ya se Encuentra en uso";
                }
                //else if (bd.USUARIOS.Any(u => u.DNI == dni))
                //{
                //    return "El DNI Ingresado Ya se Encuentra en uso";//descomentar esta seccion si desea evitar registrar a varios usuarios con el mismo dni
                //}
                else
                {
                    IndicadoresEntityModel bd1 = new IndicadoresEntityModel();
                    USUARIOS _usu = new USUARIOS();
                    _usu.NOMBRE = nom;
                    _usu.APEPAT = apepat;
                    _usu.APEMAT = apemat;
                    _usu.DIRECCION = direc;
                    _usu.DNI = dni;
                    _usu.PASSWORD = pass;
                    _usu.EMAIL = email;
                    _usu.CODUSUARIO = usuario;
                    _usu.IDROL = 1;
                    bd1.USUARIOS.Add(_usu);
                    bd1.SaveChanges();
                    /*log.IDDET = cc.ID;*/
                    return "Registro OK";
                }
            }

        }
    }
}
