using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;
using System.Text.Json;
using System.IO;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class PatientsController: ControllerBase{
        readonly DataContext context;
        readonly string JsonFile = "Data/patient.json";
        public PatientsController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPatients()
        {
            var data = await this.context.m_patient.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPatientById(int id)
        {
            Patient? item = await this.context.m_patient.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Patient not found." });
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(Patient patient)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (patient != null)
            {
                string? code = patient.code?.ToLower();
                // Check if the email already exists.
                Patient? item = await this.context.m_patient.FirstOrDefaultAsync(m => m.code == code);
                if (item != null)
                {
                    return Conflict(new { message = "Patient is already exists." });
                }

                await Task.Run(() =>
                {
                    this.context.m_patient.Add(patient);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Patient add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, Patient patient)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patient.id)
            {
                return BadRequest("ID mismatch in the URL and body.");
            }
            // Check if patient exists
            Patient? item = await this.context.m_patient.FirstOrDefaultAsync(
                    m => m.id == patient.id);
            if (item == null)
            {
                return NotFound(new { message = "Patient not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_patient.Entry(item).CurrentValues.SetValues(patient);
                    this.context.SaveChanges();
                });

                return Ok(item);
            }
        }
 
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if patient exists
            Patient? item = await this.context.m_patient.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Patient not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_patient.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "Patient deleted "});
            }
        }

        [HttpPost]
        [Route("ExportJson")]
        public async Task<IActionResult> ExportJson()
        {
            await Task.Run(() =>
            {
                for (int i = 0; i < 50; i++)
                {
                    var name = $"Patient_00{i+1}";
                    var gender = (i <= 30) ? "Female" : "Male";
                    var item = new Patient
                    {
                        code = name,
                        first_name = name,
                        last_name = name,
                        email = $"{name}@test.com",
                        home_address = name,
                        office_address = name,
                        date_of_birth = DateTime.Today.AddYears(-20).AddDays(i+1),
                        insurance_expire = DateTime.Today.AddYears(-20).AddDays(i+1),
                        insurance_policy_number = name,
                        insurance_provider = name,
                        insurance_type = name,
                        insurance_info = name,
                        medical_history = name,
                        job = name,
                        phone_number = "123456789",
                        gender = gender,
                        emergency_contact_name = name,
                        emergency_contact_phone = "123456789"
                    };
                    this.context.m_patient.Add(item);
                }
                this.context.SaveChanges();

                List<Patient> patients = this.context.m_patient.ToList();

                var jsonString = JsonSerializer.Serialize(patients, new JsonSerializerOptions{WriteIndented=true});

                this.context.WriteJsonFile(JsonFile, jsonString);

            });

            return Ok(new {message = "Export Json Successfull"});
        }

        [HttpPost]
        [Route("ImportJson")]
        public async Task<IActionResult> ImportJson()
        {
            await Task.Run(() =>
            {
                var patients = this.context.ReadJsonFile(JsonFile);
                if (patients != null)
                    this.context.m_patient.AddRange(patients);
            });

            return Ok(new {message = "Import Json to patient table"});
        }
    }
}