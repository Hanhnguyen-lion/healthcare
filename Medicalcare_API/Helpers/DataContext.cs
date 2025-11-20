using Microsoft.EntityFrameworkCore;
using Medicalcare_API.Models;
using System.IO;
using System.Text.Json;
using System.Collections;

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

        public void WriteJsonFile(string filePath, string jsonString)
        {
            File.WriteAllText(filePath, jsonString);
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