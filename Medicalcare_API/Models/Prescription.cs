
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Prescription{
        
        [Key]
        public int id{get;set;}

        public int? billing_id{get;set;}
        public int? medicine_id{get;set;}
        public int? patient_id{get;set;}

        public DateTime? prescription_date{get;set;}
        public string? dosage{get;set;}
        public int? quantity{get;set;}
        public int? duration{get;set;}
        public decimal? amount{get;set;}
        public decimal? total{get;set;}
        public string? duration_type{get;set;}
        public string? notes{get;set;}
        public string? medicine{get;set;}

        public string? medicine_name{get;set;}
        public string? medicine_type{get;set;}
   }
}