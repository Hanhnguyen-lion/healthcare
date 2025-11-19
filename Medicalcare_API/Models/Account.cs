
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Account{
        
        [Key]
        public int id{get;set;}

        [Required]
        [MaxLength(50)]
        public string? email{get;set;}

        [Required]
        [MaxLength(50)]
        public string? password{get;set;}
        

        [Required]
        [MaxLength(50)]
        public string? first_name{get;set;}

        [Required]
        [MaxLength(50)]
        public string? last_name{get;set;}

        public DateTime? dob{get;set;}
        

        public string? gender{get;set;}

        public string? address{get;set;}
        

        public string? phone{get;set;}

        public string? account_type{get;set;}

        public string? token{get;set;}
    }
}