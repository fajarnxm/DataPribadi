using System;
using System.ComponentModel.DataAnnotations;

namespace DataPribadi.Models
{
    public class Identitas
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "NIK is required.")]
        public int Nik { get; set; }

        [Required(ErrorMessage = "Nama Lengkap is required.")]
        public string NamaLengkap { get; set; }

        [Display(Name = "Tanggal Lahir")]
        public string TanggalLahir { get; set; }

        [Required(ErrorMessage = "Jenis Kelamin is required.")]
        public string JenisKelamin { get; set; }

        [Required(ErrorMessage = "Alamat is required.")]
        public string Alamat { get; set; }

        [Required(ErrorMessage = "Negara is required.")]
        public string Negara { get; set; }
    }
}
