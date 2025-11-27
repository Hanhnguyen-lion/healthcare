
using System.ComponentModel.DataAnnotations;

namespace Medicalcare_API.Models{
    public class MedicalCareDetail{
        [Key]
        public int id{get;set;}
        public int? patient_id {get;set;}
        public Patient? patient{get;set;}
        public ICollection<MedicalCare>? medicalCares{get;set;}
        public ICollection<Prescription>? prescriptions{get;set;}
   }
}