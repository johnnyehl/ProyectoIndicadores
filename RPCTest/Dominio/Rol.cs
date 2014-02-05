using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    class Rol
    {
        private decimal idRol;

        public decimal IdRol
        {
            get { return idRol; }
            set { idRol = value; }
        }
        
        private string codRol;

        public string CodRol
        {
            get { return codRol; }
            set { codRol = value; }
        }

        private string nomRol;

        public string NomRol
        {
            get { return nomRol; }
            set { nomRol = value; }
        }
        
        private string estado;

        public string Estado
        {
            get { return estado; }
            set { estado = value; }
        }

    }
}
