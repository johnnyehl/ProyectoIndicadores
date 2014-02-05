using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    class AppAcceso
    {
        private decimal idAccesoApp;

        public decimal IdAccesoApp
        {
            get { return idAccesoApp; }
            set { idAccesoApp = value; }
        }
        private string idApp;

        public string IdApp
        {
            get { return idApp; }
            set { idApp = value; }
        }
        private string idRol;

        public string IdRol
        {
            get { return idRol; }
            set { idRol = value; }
        }
    }
}
