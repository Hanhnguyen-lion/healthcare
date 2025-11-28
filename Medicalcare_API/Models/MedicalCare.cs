
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class MedicalCare{
        
        [Key]
        public int id{get;set;}

        public int? patient_id{get;set;}
        public int? doctor_id{get;set;}
        public int? department_id{get;set;}
        public int? visit_month{get;set;}
        public int? visit_year{get;set;}

        public DateTime? visit_date{get;set;}
        public string? diagnostic{get;set;}
        public string? notes{get;set;}
        public string? doctor_name{get;set;}
        public string? department_name{get;set;}
        public string? patient_name{get;set;}
        public string? patient_code{get;set;}
   }
}