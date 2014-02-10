using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AustinHarris.JsonRpc;
using ServicioIndicadoresDTO;
using ServiciosIndicadoresEntities;
using System.Data.Entity;
namespace ServicioIndicadoresNegocio
{
    public class EntityUsuarioBusiness : JsonRpcService{
    
        [JsonRpcMethod]

        public List<USUARIOSDTO> ValidarLogin(string usu, string pass)
        {
            using (var bd = new IndicadoresEntities())
            {
                var qrydb = from user in bd.USUARIOS
                            where user.EMAIL == usu && user.PASSWORD == pass
                            select user;
                if (qrydb.Count() > 0)
                {
                    var usuarioDTO=  USUARIOSAssembler.ToDTOs(qrydb);
                    return usuarioDTO; //ejecuta

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

            using (IndicadoresEntities bd = new IndicadoresEntities())
            {
                if (bd.USUARIOS.Any(u => u.EMAIL == email))
                {
                    return "El Email Ingresado Ya se Encuentra en uso";
                }
                else if (bd.USUARIOS.Any(u => u.CODUSUARIO == usuario))
                {
                    return "El Nombre de Usuario Ingresado Ya se Encuentra en uso";
                }
                else if (bd.USUARIOS.Any(u => u.DNI == dni))
                {
                    return "El DNI Ingresado Ya se Encuentra en uso";//descomentar esta seccion si desea evitar registrar a varios usuarios con el mismo dni
                }
                else
                {
                    IndicadoresEntities bd1 = new IndicadoresEntities();
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
