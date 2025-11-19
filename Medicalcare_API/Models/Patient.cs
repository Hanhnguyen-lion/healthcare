
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class Patient{
        
        [Key]
        public int id{get;set;}

        [MaxLength(50)]
        public string? email{get;set;}

        [Required]
        [MaxLength(50)]
        public string? code{get;set;}
        

        [Required]
        [MaxLength(50)]
        public string? first_name{get;set;}

        [Required]
        [MaxLength(50)]
        public string? last_name{get;set;}

        public DateTime date_of_birth{get;set;}
        public string? gender{get;set;}
        public string? home_address{get;set;}
        public string? office_address{get;set;}
        public string? phone_number{get;set;}
        public string? job{get;set;}
        public string? emergency_contact_name{get;set;}
        public string? emergency_contact_phone{get;set;}
        public string? insurance_type{get;set;}
        public string? insurance_policy_number{get;set;}
        public string? insurance_provider{get;set;}
        public DateTime insurance_expire{get;set;}
        public string? insurance_info{get;set;}
        public string? medical_history{get;set;}
   }
}