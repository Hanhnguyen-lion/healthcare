using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.DTOs{

    public class RegisterDTO{

        [Required(ErrorMessage = "First name is required.")]
        [MaxLength(50, ErrorMessage = "First name must be less than or equal to 50 characters.")]
        public string? first_name{get;set;}

        [Required(ErrorMessage = "Last name is required.")]
        [MaxLength(50, ErrorMessage = "Last name must be less than or equal 50 characters.")]
        public string? last_name{get;set;}

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [MaxLength(50, ErrorMessage = "Email must be less than or equal 50 characters.")]
        public string? email{get;set;}

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
        [MaxLength(50, ErrorMessage = "Password must be less than or equal 50 characters.")]
        public string? password{get;set;}

        public DateTime? dob{get;set;}

        public string? account_type{get;set;}

        public string? gender{get;set;}
    }
}