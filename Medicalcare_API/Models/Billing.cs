
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Billing{
        
        [Key]
        public int id{get;set;}

        public int? medicalcare_id{get;set;}
        public int? medicine_id{get;set;}
        public int? patient_id{get;set;}

        public DateTime? prescription_date{get;set;}
        public int? quantity{get;set;}
        public decimal? price{get;set;}
        public decimal? amount{get;set;}

        public string? medicine_name{get;set;}
        public string? medicine_type{get;set;}
   }
}