
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Doctor{
        [Key]
        public int id{get;set;}

        [MaxLength(50)]
        public string? email{get;set;}

        [Required]
        [MaxLength(50)]
        public string? first_name{get;set;}
        
        [Required]
        [MaxLength(50)]
        public string? last_name{get;set;}

        public string? phone{get;set;}

        public string? gender{get;set;}
        public string? quanlification{get;set;}
        public string? job_specification{get;set;}
        public int? hospital_id{get;set;}
        public int? department_id{get;set;}
  }
}