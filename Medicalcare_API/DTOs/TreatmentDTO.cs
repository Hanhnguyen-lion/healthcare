
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.DTOs{
    public class TreatmentDTO{
        
        [Key]
        public int id{get;set;}

        public int? medicalcare_id{get;set;}
        public DateTime? treatment_date{get;set;}
        public string? treatment_type{get;set;}
        public string? description{get;set;}
   }
}