
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Department{
        [Key]
        public int id{get;set;}


        [Required]
        public string? name{get;set;}
        

        public int? doctor_id{get;set;}

        public int? hospital_id{get;set;}
        public string? phone{get;set;}
  }
}