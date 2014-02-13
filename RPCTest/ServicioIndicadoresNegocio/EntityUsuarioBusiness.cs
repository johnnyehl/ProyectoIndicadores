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
        //[JsonRpcMethod]
        //private string RegistrarLogin(string usuario, string nom, string apepat, string apemat, string email, string direc, string dni, string pass)
        //{

        //    using (IndicadoresEntities bd = new IndicadoresEntities())
        //    {
        //        if (bd.USUARIOS.Any(u => u.EMAIL == email))
        //        {
        //            return "El Email Ingresado Ya se Encuentra en uso";
        //        }
        //        else if (bd.USUARIOS.Any(u => u.CODUSUARIO == usuario))
        //        {
        //            return "El Nombre de Usuario Ingresado Ya se Encuentra en uso";
        //        }
        //        else if (bd.USUARIOS.Any(u => u.DNI == dni))
        //        {
        //            return "El DNI Ingresado Ya se Encuentra en uso";//descomentar esta seccion si desea evitar registrar a varios usuarios con el mismo dni
        //        }
        //        else
        //        {
        //            IndicadoresEntities bd1 = new IndicadoresEntities();
        //            USUARIOS _usu = new USUARIOS();
        //            _usu.NOMBRE = nom;
        //            _usu.APEPAT = apepat;
        //            _usu.APEMAT = apemat;
        //            _usu.DIRECCION = direc;
        //            _usu.DNI = dni;
        //            _usu.PASSWORD = pass;
        //            _usu.EMAIL = email;
        //            _usu.CODUSUARIO = usuario;
        //            _usu.IDROL = 1;
        //            bd1.USUARIOS.Add(_usu);
        //            bd1.SaveChanges();
        //            /*log.IDDET = cc.ID;*/
        //            return "Registro OK";
        //        }
        //    }

        //}
        [JsonRpcMethod]
        public List<Sph> TablaSph(int anho, int mes, String codobj)
        {
            using (var context = new IndicadoresEntities())
            {
                var blogNames = context.Database.SqlQuery<Sph>(
                "select FECHA,COUNT(distinct txt_01) logueados,COUNT(distinct txt_01) * 7 horas_trabajadas, "
                + "SUM(val_03) ventas,        (SELECT ROUND(VALOR,0) FROM GESTION_VARIABLES V WHERE CODOBJ=X.CODOBJ AND CODVAR = 'OBJ_VTA_DIA_NEG') "
                + "objetivo,       SUM(val_03)/(COUNT(distinct txt_01) * 7) sph,"
                + "(sum(case when txt_03 = 'DECO' then val_03 else 0 end)+sum(case when txt_03 = 'REGULAR' then val_03 else 0 end)) as TotalPaq,"
                + "sum(case when txt_03 = 'REGULAR' then val_03 else 0 end) regular,"
                + "sum(case when txt_03 = 'DECO' then val_03 else 0 end) deco,"
                + "sum(case when txt_06 = 'LIMA' then val_03 else 0 end) lima,"
                   + " sum(case when txt_06 = 'PROVINCIA' then val_03 else 0 end) provincia,"
                + "SUM(case when val_03 > 0 then val_08 else 0 end) tmo     "
                + "from dbo.GESTION_INDICADORES_DETALLE X "
                + "where tipo = 'TABLA_BASES_UNICOS' "
                + "and FECHA is not null "
                    + " and ANHO= " + anho
                    + " AND MES = " + mes
                    + " AND DIA >= 1"
               + " AND CODOBJ = '" + codobj + "'"
                + " AND ESTADO = 'A' group by fecha, "
                + " CODOBJ order by 1").ToList();
                return blogNames;
            }
        }


        [JsonRpcMethod]
        public List<TablaTeleavance> TablaTeleavance(String PRODUCTO, String SEGMENTO)
        {
            using (var context = new IndicadoresEntities())
            {
                var blogNames = context.Database.SqlQuery<TablaTeleavance>(
                "select CODOBJ, DESCRIPCION "
                 +"from GESTION_TELEAVANCE "
                  + "where PRODUCTO='" + PRODUCTO + "' "
                  + " and SEGMENTO='" + SEGMENTO + "' ").ToList();
                return blogNames;
            }
        }
    }
}
