using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.DTOs{

    public class AuthenticateDTO{

        [Required(ErrorMessage = "Email is required.")]
        public string? email{get;set;}

        [Required(ErrorMessage = "Password is required.")]
        public string? password{get;set;}
    }
}