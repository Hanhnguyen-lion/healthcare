using Microsoft.EntityFrameworkCore;
using Medicalcare_API.Models;
using System.IO;
using System.Text.Json;
using System.Collections;
using System.ComponentModel;
using Medicalcare_API.DTOs;
using Microsoft.VisualBasic;
using System.Diagnostics;

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
        public DbSet<TreatmentDTO> m_treatment{get;set;}
        public DbSet<Treatment> v_treatment{get;set;}
        
        public DbSet<PrescriptionDTO> h_prescription{get;set;}
        public DbSet<Prescription> v_prescription{get;set;}

        public void WriteJsonFile(string filePath, string jsonString)
        {
            File.WriteAllText(filePath, jsonString);
        } 

        public IDictionary? GetMedicalDetails(
            int patient_id, 
            int visit_month,  
            int visit_year)
        {
            var item = m_patient.Where(li => li.id == patient_id).FirstOrDefault<Patient?>();

            var first_name = item?.first_name??"";
            var last_name = item?.last_name??"";

            var paItem = new Dictionary<string, object>
            {
                ["patient_id"] = patient_id,
                ["patient_code"] = item?.code??"",
                ["patient_name"] = $"{last_name} {first_name}",
                ["gender"] = item?.gender??"",
                ["insurance_policy_number"] = item?.insurance_policy_number??"",
                ["insurance_type"] = item?.insurance_type??"",
                ["date_of_birth"] = item?.date_of_birth??new DateTime(),
                ["insurance_expire"] = item?.insurance_expire??new DateTime(),
                ["job"] = item?.job??"",
                ["home_address"] = item?.home_address??"",
                ["office_address"] = item?.office_address??"",
            };

            var medicalItems = v_medicalcare.Where(li => li.patient_id == patient_id &&
                (li.visit_month== visit_month) &&
                (li.visit_year== visit_year)).ToList<MedicalCare?>();
            List<IDictionary> medicals = new List<IDictionary>();

            foreach (var medicalItem in medicalItems)
            {
                var medicalcare_id = medicalItem?.id??0;
                var it = new Dictionary<string, object>
                {
                    ["medicalcare_id"] = medicalcare_id,
                    ["diagnostic"] = medicalItem?.diagnostic??"",
                    ["start_date"] = medicalItem?.start_date??new DateTime(),
                    ["end_date"] = medicalItem?.end_date??new DateTime(),
                };

                var presItems = v_prescription.Where(li => li.patient_id == patient_id && li.medicalcare_id == medicalcare_id).ToList<Prescription?>();
                List<IDictionary> prescriptions = new List<IDictionary>();

                foreach (var presItem in presItems)
                {
                    var dicPres = new Dictionary<string, object>
                    {
                        ["prescription_id"] = presItem?.id??0,
                        ["dosage"] = presItem?.dosage??"",
                        ["frequency"] = presItem?.frequency??"",
                        ["medicine_name"] = presItem?.medicine_name??"",
                    };
                    prescriptions.Add(dicPres);
                }
                it["prescriptions"] = prescriptions;

                var treatmentItems = v_treatment.Where(li => li.patient_id == patient_id && li.medicalcare_id == medicalcare_id).ToList<Treatment?>();
                List<IDictionary> treatments = new List<IDictionary>();
                foreach (var treatmentItem in treatmentItems)
                {
                    var dicTreatment = new Dictionary<string, object>
                    {
                        ["treatment_id"] = treatmentItem?.id??0,
                        ["treatment_type"] = treatmentItem?.treatment_type??"",
                        ["description"] = treatmentItem?.description??"",
                        ["treatment_date"] = treatmentItem?.treatment_date??new DateTime(),
                    };
                    treatments.Add(dicTreatment);
                }
                it["treatments"] = treatments;

                medicals.Add(it);
            }
            paItem["medical"] = medicals;

            return paItem;
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
        public List<TreatmentDTO>? GetPatchTreatment(int medicalcare_id)
        {
            var items = m_treatment.Where(
                    m => m.medicalcare_id == null ||
                    m.medicalcare_id == medicalcare_id).ToList<TreatmentDTO>();
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