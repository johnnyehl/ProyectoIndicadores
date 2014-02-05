using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADODBFactory
{
   
public class ADODBFactory : IDisposable
{
    private Dictionary<string, SqlConnection> dictionary = new Dictionary<string, SqlConnection>();

	public ADODBFactory() 
	{
        addConnection("CONFIG", "Data Source=192.167.0.214;Initial Catalog=BDINDICADORES;User Id=indicadores;Password=ind$$123");        
	}

    public void Dispose()
    {
        dictionary.Clear();
        dictionary = null;
    }

    public void addConnection(String nombre,String strConnection){
        SqlConnection connection = new SqlConnection(strConnection);
        dictionary.Add(nombre, connection);
    }
    public SqlConnection getConnection(String nombre)
    {
        return dictionary[nombre];
    }


    public SqlDataReader getRecordSet(String ConnectionName, String sql)
    {

        // Provide the query string with a parameter placeholder. 

        using (SqlConnection connection = getConnection(ConnectionName))
        {
            // Create the Command and Parameter objects.
            SqlCommand command = new SqlCommand(sql, connection);

            try
            {
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                return reader;
                //reader.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }


        }
    }
  }
}

