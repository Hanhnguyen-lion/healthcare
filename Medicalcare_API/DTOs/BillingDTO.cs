
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.DTOs{
    public class BillingDTO{
        
        [Key]
        public int id{get;set;}

	      public int? patient_id {get;set;}
        public int? doctor_id {get;set;}
        public int? department_id {get;set;}
        public int? appointment_id {get;set;}
        public int? days{get;set;}
        public string? diagnostic {get;set;}
        public string? notes {get;set;}
        public decimal? amount {get;set;}
        public string? status {get;set;}
        public DateTime? admission_date {get;set;}
        public DateTime? discharge_date {get;set;}
  }
}