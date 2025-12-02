
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.DTOs{
    public class TreatmentDTO{
        
        [Key]
        public int id{get;set;}

        public int? billing_id{get;set;}
        public string? treatment_type{get;set;}
        public string? description{get;set;}
 
        public int? quantity{get;set;}
        public decimal? amount{get;set;}
  }
}