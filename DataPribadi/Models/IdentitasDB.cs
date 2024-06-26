using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace DataPribadi.Models
{
    public class IdentitasDB
    {
        //declare connection string
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;

        //Return list of all Identitass
        public List<Identitas> ListAll()
        {
            List<Identitas> lst = new List<Identitas>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("GetIdentitas", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    var tanggalLahir = DateTime.Parse(rdr["TanggalLahir"].ToString());
                    lst.Add(new Identitas
                    {
                        Id = Convert.ToInt32(rdr["Id"]),
                        Nik = Convert.ToInt32(rdr["Nik"]),
                        NamaLengkap = rdr["NamaLengkap"].ToString(),
                        JenisKelamin = rdr["JenisKelamin"].ToString(),
                        TanggalLahir = tanggalLahir.ToString("dd-MM-yyyy"),
                        Alamat = rdr["Alamat"].ToString(),
                        Negara = rdr["Negara"].ToString(),
                        Bahasa = rdr["Bahasa"].ToString()
                    });
                }
                return lst;
            }
        }

        // Method for Adding an Identitas
        public int Add(Identitas idn, out int insertedId)
        {
            int result;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertIdentitas", con);
                com.CommandType = CommandType.StoredProcedure;

                com.Parameters.AddWithValue("@Nik", idn.Nik);
                com.Parameters.AddWithValue("@NamaLengkap", idn.NamaLengkap);
                com.Parameters.AddWithValue("@JenisKelamin", idn.JenisKelamin);
                com.Parameters.AddWithValue("@TanggalLahir", idn.TanggalLahir);
                com.Parameters.AddWithValue("@Alamat", idn.Alamat);
                com.Parameters.AddWithValue("@Negara", idn.Negara);
                com.Parameters.AddWithValue("@Bahasa", idn.Bahasa);

                // OUTPUT parameter for the inserted ID
                SqlParameter insertedIdParam = new SqlParameter("@InsertedId", SqlDbType.Int);
                insertedIdParam.Direction = ParameterDirection.Output;
                com.Parameters.Add(insertedIdParam);

                result = com.ExecuteNonQuery();
                insertedId = (int)insertedIdParam.Value;
            }

            return result;
        }

        //Method for Updating Identitas record
        public int Update(Identitas idn)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("UpdateIdentitas", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", idn.Id);
                com.Parameters.AddWithValue("@Nik", idn.Nik);
                com.Parameters.AddWithValue("@NamaLengkap", idn.NamaLengkap);
                com.Parameters.AddWithValue("@JenisKelamin", idn.JenisKelamin);
                com.Parameters.AddWithValue("@TanggalLahir", idn.TanggalLahir);
                com.Parameters.AddWithValue("@Alamat", idn.Alamat);
                com.Parameters.AddWithValue("@Negara", idn.Negara);
                com.Parameters.AddWithValue("@Bahasa", idn.Bahasa);
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Deleting an Identitas
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteIdentitas", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@ID", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}
