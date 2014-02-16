using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioIndicadoresNegocio
{
    public class GestionIndicadoresResumen
    {        
        public string DESCRIPCION { get; set; }
        public Nullable<decimal> VALOR { get; set; }
        public Nullable<decimal> LIMA { get; set; }
        public Nullable<decimal> PROVINCIA { get; set; }
    }
}