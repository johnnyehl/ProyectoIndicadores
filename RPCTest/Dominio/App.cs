using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    class App
    {
        private decimal idAapp;

        public decimal IdAapp
        {
            get { return idAapp; }
            set { idAapp = value; }
        }
        
        private string codApp;


        public string CodApp
        {
            get { return codApp; }
            set { codApp = value; }
        }
        
        private string nomApp;

        public string NomApp
        {
            get { return nomApp; }
            set { nomApp = value; }
        }
        
        private string estado;

        public string Estado
        {
            get { return estado; }
            set { estado = value; }
        }
    }
}
