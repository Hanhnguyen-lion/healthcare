using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.DTOs{

    public class MedicalCareDTO{

        [Key]
        public int id{get;set;}

        public int? patient_id{get;set;}
        public int? doctor_id{get;set;}
        public int? department_id{get;set;}

        public DateTime? visit_date{get;set;}

        public DateTime? start_date{get;set;}

        public DateTime? end_date{get;set;}
        public string? diagnostic{get;set;}
        public string? notes{get;set;}
    }
}    