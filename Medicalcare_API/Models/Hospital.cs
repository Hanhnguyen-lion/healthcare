
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Hospital{
        [Key]
        public int id{get;set;}

        [MaxLength(50)]
        public string? email{get;set;}

        [Required]
        public string? name{get;set;}
        

        public string? description{get;set;}

        public string? country{get;set;}

        public string? address{get;set;}
        public string? phone{get;set;}
  }
}