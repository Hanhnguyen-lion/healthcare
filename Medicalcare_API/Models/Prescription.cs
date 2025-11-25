
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Prescription{
        
        [Key]
        public int id{get;set;}

        public int? medicalcare_id{get;set;}
        public int? medicine_id{get;set;}
        public int? doctor_id{get;set;}

        public DateTime? start_date{get;set;}
        public DateTime? end_date{get;set;}
        public string? dosage{get;set;}
        public string? frequency{get;set;}
        public string? medicine_name{get;set;}
        public string? medicine_type{get;set;}
        public string? doctor_name{get;set;}
   }
}