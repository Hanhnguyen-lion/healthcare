using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;
using System.Text.Json;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class DoctorsController: ControllerBase{
        readonly DataContext context;
        readonly string JsonFile = "Data/doctor.json";
        public DoctorsController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDoctors()
        {
            var data = await this.context.m_doctor.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Doctor? item = await this.context.m_doctor.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Doctor not found." });
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(Doctor patient)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (patient != null)
            {

                await Task.Run(() =>
                {
                    this.context.m_doctor.Add(patient);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Doctor add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, Doctor patient)
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
            Doctor? item = await this.context.m_doctor.FirstOrDefaultAsync(
                    m => m.id == patient.id);
            if (item == null)
            {
                return NotFound(new { message = "Doctor not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_doctor.Entry(item).CurrentValues.SetValues(patient);
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
            Doctor? item = await this.context.m_doctor.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Doctor not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_doctor.Remove(item);
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
                    var gender = (i <= 30) ? "Female" : "Male";
                    var name = $"Doctor_00{i+1}";
                    var item = new Doctor
                    {
                        first_name = name,
                        last_name = name,
                        email = $"{name}@test.com",
                        quanlification = name,
                        phone = "123456789",
                        job_specification = name,
                        gender = gender,
                        hospital_id = null,
                        department_id = null
                    };
                    this.context.m_doctor.Add(item);
                }
                this.context.SaveChanges();

                List<Doctor> items = this.context.m_doctor.ToList();

                var jsonString = JsonSerializer.Serialize(items, new JsonSerializerOptions{WriteIndented=true});

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
                var items = this.context.ReadJsonFileToDoctor(JsonFile);
                if (items != null)
                {
                    this.context.m_doctor.AddRange(items);
                }
            });

            return Ok(new {message = "Import Json to docter table"});
        }
    }
}