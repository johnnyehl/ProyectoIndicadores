using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    class Usuario
    {
        private decimal idUsuario;

        public decimal IdUsuario
        {
            get { return idUsuario; }
            set { idUsuario = value; }
        }
        
        private string codUsuario;

        public string CodUsuario
        {
            get { return codUsuario; }
            set { codUsuario = value; }
        }
        
        private string apePat;

        public string ApePat
        {
            get { return apePat; }
            set { apePat = value; }
        }
        
        private string apeMat;

        public string ApeMat
        {
            get { return apeMat; }
            set { apeMat = value; }
        }
        
        private string nombre;

        public string Nombre
        {
            get { return nombre; }
            set { nombre = value; }
        }
        
        private string email;

        public string Email
        {
            get { return email; }
            set { email = value; }
        }
        
        private string direccion;

        public string Direccion
        {
            get { return direccion; }
            set { direccion = value; }
        }
        
        private string dni;

        public string Dni
        {
            get { return dni; }
            set { dni = value; }
        }
        
        private string password;

        public string Password
        {
            get { return password; }
            set { password = value; }
        }

    }
}
