using Microsoft.EntityFrameworkCore;
using Medicalcare_API.Models;
using System.IO;
using System.Text.Json;
using System.Collections;
using System.ComponentModel;
using Medicalcare_API.DTOs;

namespace Medicalcare_API.Helpers{
    public class DataContext: DbContext{
        
        public DataContext(DbContextOptions<DataContext> options):base(options){

        }

        public DbSet<Account> m_account{get;set;}
        public DbSet<Patient> m_patient{get;set;}
        public DbSet<Hospital> m_hospital{get;set;}
        public DbSet<Department> m_department{get;set;}
        public DbSet<Doctor> m_doctor{get;set;}
        public DbSet<Medicine> m_medicine{get;set;}
        public DbSet<MedicalCareDTO> h_medicalcare{get;set;}
        public DbSet<MedicalCare> v_medicalcare{get;set;}
        public DbSet<Treatment> m_treatment{get;set;}
        public DbSet<PrescriptionDTO> h_prescription{get;set;}
        public DbSet<Prescription> v_prescription{get;set;}

        public void WriteJsonFile(string filePath, string jsonString)
        {
            File.WriteAllText(filePath, jsonString);
        } 
        public List<PrescriptionDTO>? GetPatchPrescription(int medicalcare_id)
        {
            var items = h_prescription.Where(
                    m => m.medicalcare_id == null ||
                    m.medicalcare_id == medicalcare_id).ToList<PrescriptionDTO>();
            if (items != null)
            {
                foreach(var item in items)
                {
                    item.medicalcare_id = medicalcare_id;
                }
            }
            return items;
        }
        public List<Treatment>? GetPatchTreatment(int medicalcare_id)
        {
            var items = m_treatment.Where(
                    m => m.medicalcare_id == null ||
                    m.medicalcare_id == medicalcare_id).ToList<Treatment>();
            if (items != null)
            {
                foreach(var item in items)
                {
                    item.medicalcare_id = medicalcare_id;
                }
            }
            return items;
        }

        public List<Patient>? ReadJsonFileToPatient(string filePath)
        {
            var jsonContent = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Patient>>(jsonContent);
        }

        public List<Hospital>? ReadJsonFileToHospital(string filePath)
        {
            var jsonContent = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Hospital>>(jsonContent);
        }

        public List<Doctor>? ReadJsonFileToDoctor(string filePath)
        {
            var jsonContent = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Doctor>>(jsonContent);
        }

        public List<Department>? ReadJsonFileToDepartment(string filePath)
        {
            var jsonContent = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Department>>(jsonContent);
        }

        public List<Medicine>? ReadJsonFileToMedicine(string filePath)
        {
            var jsonContent = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Medicine>>(jsonContent);
        }
    }
}