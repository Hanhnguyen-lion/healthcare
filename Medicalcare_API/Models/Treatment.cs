
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Treatment{
        
        [Key]
        public int id{get;set;}

        public int? billing_id{get;set;}

        public DateTime? treatment_date{get;set;}
        public string? treatment_type{get;set;}
        public string? description{get;set;}

        public int? quantity{get;set;}
        public decimal? amount{get;set;}
        public decimal? total{get;set;}
   }
}