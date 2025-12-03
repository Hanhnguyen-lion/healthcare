using Microsoft.EntityFrameworkCore;
using Medicalcare_API.Models;
using System.Text.Json;
using System.Collections;
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
        public DbSet<m_medicine> m_medicine{get;set;}
        public DbSet<v_medicine> v_medicine{get;set;}
        public DbSet<MedicalCareDTO> h_medicalcare{get;set;}
        public DbSet<MedicalCare> v_medicalcare{get;set;}
        public DbSet<TreatmentDTO> m_treatment{get;set;}
        public DbSet<Treatment> v_treatment{get;set;}
        
        public DbSet<PrescriptionDTO> h_prescription{get;set;}
        public DbSet<Prescription> v_prescription{get;set;}
        public DbSet<DurationType> m_duration_type{get;set;}
        public DbSet<MedicineType> m_medicine_type{get;set;}
        public DbSet<TreatmentCategory> m_treatment_category{get;set;}
        public DbSet<BillingDTO> h_billing{get;set;}
        public DbSet<Billing> v_billing{get;set;}

        public void WriteJsonFile(string filePath, string jsonString)
        {
            File.WriteAllText(filePath, jsonString);
        } 

        public IDictionary? GetPrescriptionItem(Dictionary<string, object> item)
        {
            var medicine_id =  Convert.ToInt32(item["medicine_id"].ToString());
            var id =  Convert.ToInt32(item["id"].ToString());
            var new_id =  Convert.ToInt32(item["new_id"].ToString());
            if (id == 0 && new_id == 0)
                new_id = new Random().Next(100, 500);
            else if (id > 0)
                new_id = id;
                
            var billing_id = Convert.ToInt32(item["billing_id"].ToString());
            var quantity = Convert.ToInt32(item["quantity"].ToString());
            var medicine = m_medicine.Where(li => li.id == medicine_id).FirstOrDefault<m_medicine?>();
            var medicine_name = medicine?.name??"";
            var price = medicine?.price??0;
            var medicine_type = item["medicine_type"].ToString();
            var duration_type = item["duration_type"].ToString();
            var duration = Convert.ToInt32(item["duration"].ToString());
            var dosage = item["dosage"].ToString();
            var notes = item["notes"].ToString();
            var newItem = new Dictionary<string, object>
            {
                ["id"]  = id,
                ["new_id"] = new_id,
                ["billing_id"]  = billing_id,
                ["medicine_id"]  = medicine_id,
                ["medicine_name"]  = medicine_name,
                ["quantity"]  = quantity,
                ["amount"]  = price,
                ["total"]  = price * quantity,
                ["prescription_date"]  = DateTime.Today,
                ["medicine_type"] = medicine_type??"",
                ["duration"] = duration,
                ["duration_type"] = duration_type??"",
                ["dosage"] = dosage??"",
                ["notes"] = notes??""
            };
            return newItem;
        }

        public IDictionary? GetTreatmentItem(Dictionary<string, object> item)
        {
            var id =  Convert.ToInt32(item["id"].ToString());
            var new_id =  Convert.ToInt32(item["new_id"].ToString());

            if (id == 0 && new_id == 0)
            {
                new_id = new Random().Next(100, 500);
            }
            else if (id > 0)
            {
                new_id = id;
            }

            var billing_id = Convert.ToInt32(item["billing_id"].ToString());
            var category_id = Convert.ToInt32(item["category_id"].ToString());
            var quantity = Convert.ToInt32(item["quantity"].ToString());
            var description = item["description"].ToString();
            var categoryItem = m_treatment_category.Where(li=> li.id == category_id).FirstOrDefault();
            decimal? price = 0M;
            decimal? total = 0M;
            var treatment_type = "";
            if (categoryItem != null)
            {
                price = categoryItem.price;
                total = price * quantity;
                treatment_type = categoryItem.name_en;
            }
            var newItem = new Dictionary<string, object>
            {
                ["id"]  = id,
                ["new_id"] = new_id,
                ["billing_id"]  = billing_id,
                ["quantity"]  = quantity,
                ["amount"]  = price??0,
                ["total"]  = total??0,
                ["treatment_date"]  = DateTime.Today,
                ["description"] = description??"",
                ["treatment_type"] = treatment_type??"",
                ["category_id"] = category_id
            };
            return newItem;
        }
        
        public IDictionary? GetMedicalDetails(
            int patient_id, 
            int admission_month,  
            int admission_year)
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
                (li.admission_month== admission_month) &&
                (li.admission_year== admission_year)).ToList<MedicalCare?>();
            List<IDictionary> medicals = new List<IDictionary>();

            foreach (var medicalItem in medicalItems)
            {
                var billing_id = medicalItem?.id??0;
                var it = new Dictionary<string, object>
                {
                    ["billing_id"] = billing_id,
                    ["diagnostic"] = medicalItem?.diagnostic??"",
                };

                var presItems = v_prescription.Where(li => li.patient_id == patient_id && li.billing_id == billing_id).ToList<Prescription?>();
                List<IDictionary> prescriptions = new List<IDictionary>();

                foreach (var presItem in presItems)
                {
                    var dicPres = new Dictionary<string, object>
                    {
                        ["prescription_id"] = presItem?.id??0,
                        ["dosage"] = presItem?.dosage??"",
                        ["quantity"] = presItem?.quantity??0,
                        ["duration"] = presItem?.duration??0,
                        ["duration_type"] = presItem?.duration_type??"",
                        ["medicine"] = presItem?.medicine??"",
                        ["prescription_date"] = presItem?.prescription_date??DateTime.Today,
                        ["notes"] = presItem?.notes??"",
                        ["medicine_name"] = presItem?.medicine_name??"",
                    };
                    prescriptions.Add(dicPres);
                }
                it["prescriptions"] = prescriptions;

                var treatmentItems = v_treatment.Where(li => li.patient_id == patient_id && li.billing_id == billing_id)
                    .ToList<Treatment?>()
                    .OrderBy(li=> li?.billing_id)
                    .ThenBy(li=>li?.treatment_date);
                
                List<IDictionary> treatments = new List<IDictionary>();

                
                if (treatmentItems != null)
                {
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
                    DateTime? start_date = treatmentItems?.First()?.treatment_date??null;
                    DateTime? end_date = (treatmentItems?.Count() > 1) ? treatmentItems?.Last()?.treatment_date??null: null;
                    it["start_date"] = start_date??DateTime.Today;
                    it["end_date"] = end_date??DateTime.Today;
                }
                
                it["treatments"] = treatments;

                medicals.Add(it);
            }
            paItem["medical"] = medicals;

            return paItem;
        }
       
        public IDictionary? GetBillingDetails(int billing_id)
        {
            var billingItem = h_billing.Where(li => li.id == billing_id).FirstOrDefault();
            var patient_id = billingItem?.patient_id;
            var item = m_patient.Where(li => li.id == patient_id).FirstOrDefault<Patient?>();

            var first_name = item?.first_name??"";
            var last_name = item?.last_name??"";

            var paItem = new Dictionary<string, object>
            {
                ["patient_id"] = patient_id??0,
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
            if (billingItem != null)
            {
                var billing = v_billing.Where(li => li.billing_id == billing_id).FirstOrDefault();
                billingItem.amount = billing?.total??0;
                paItem["billing"] = billingItem;
            }
            var prescriptionItems = v_prescription.Where(li => li.billing_id == billing_id).ToList<Prescription?>();
            paItem["prescriptions"] = prescriptionItems;

            var treatmentItems = v_treatment.Where(li => li.billing_id == billing_id).ToList<Treatment?>();
            paItem["treatments"] = treatmentItems;


            return paItem;
        }

        public List<PrescriptionDTO>? GetPatchPrescription(int billing_id)
        {
            var items = h_prescription.Where(
                    m => m.billing_id == null ||
                    m.billing_id == billing_id).ToList<PrescriptionDTO>();
            if (items != null)
            {
                foreach(var item in items)
                {
                    item.billing_id = billing_id;
                }
            }
            return items;
        }
        public List<TreatmentDTO>? GetPatchTreatment(int billing_id)
        {
            var items = m_treatment.Where(
                    m => m.billing_id == null ||
                    m.billing_id == billing_id).ToList<TreatmentDTO>();
            if (items != null)
            {
                foreach(var item in items)
                {
                    item.billing_id = billing_id;
                }
            }
            return items;
        }

        public List<Patient>? ReadJsonFileToPatient(string filePath)
        {
            var jsonContent = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Patient>>(jsonContent);
        }

        public List<IDictionary>? ReadJsonFile(string filePath)
        {
            var jsonContent = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<IDictionary>>(jsonContent);
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

        public List<m_medicine>? ReadJsonFileToMedicine(string filePath)
        {
            var jsonContent = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<m_medicine>>(jsonContent);
        }
    }
}