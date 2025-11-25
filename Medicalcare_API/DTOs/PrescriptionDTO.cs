using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.DTOs{

    public class PrescriptionDTO{

        [Key]
        public int id{get;set;}

        public int? medicalcare_id{get;set;}
        public int? medicine_id{get;set;}
        public int? doctor_id{get;set;}

        public DateTime? start_date{get;set;}
        public DateTime? end_date{get;set;}
        public string? dosage{get;set;}
        public string? frequency{get;set;}   }
}