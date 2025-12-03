
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.DTOs{
    public class m_medicine{
        
        [Key]
        public int id{get;set;}
        public int? category_id{get;set;}

        [Required]
        public string? name{get;set;}
        

        public decimal price{get;set;}
 }
}