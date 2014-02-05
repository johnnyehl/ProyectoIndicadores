using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ADODBFactory;

namespace ADODBFactory
{
    public class PruebaContexto
    {
        public void login()
        {
            using (var db = new IndicadoresEntityModel())
            {
                db.SaveChanges();
            }
        }
    }
}
