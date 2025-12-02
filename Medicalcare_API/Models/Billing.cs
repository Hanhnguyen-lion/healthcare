
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Billing{
        
        [Key]
        public int billing_id{get;set;}

	    public int? patient_id {get;set;}
        public string? patient_code {get;set;}
        public string? patient_name {get;set;}
        public decimal? total {get;set;}
        public DateTime? billing_date{get;set;}
    }
}