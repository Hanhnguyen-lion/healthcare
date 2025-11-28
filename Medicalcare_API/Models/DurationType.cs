
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class DurationType{
        
        [Key]
        public int id{get;set;}

        public string? name_en{get;set;}
        public string? name_vn{get;set;}
        public string? name_jp{get;set;}
        public string? description{get;set;}
   }
}