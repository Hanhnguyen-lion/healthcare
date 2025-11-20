
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Medicine{
        [Key]
        public int id{get;set;}

        public string? type{get;set;}

        [Required]
        public string? name{get;set;}
        

        public decimal price{get;set;}

        public DateTime? input_date{get;set;}

        public DateTime? expire_date{get;set;}
  }
}