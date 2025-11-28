using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.DTOs{

    public class PrescriptionDTO{

        [Key]
        public int id{get;set;}

        public int? medicalcare_id{get;set;}
        public int? medicine_id{get;set;}
        public int? doctor_id{get;set;}

        public string? dosage{get;set;}
        public DateTime? prescription_date{get;set;}
        public int? quantity{get;set;}
        public int? duration{get;set;}
        public string? duration_type{get;set;}
        public string? notes{get;set;}
        public string? medicine_type{get;set;}
    }
}