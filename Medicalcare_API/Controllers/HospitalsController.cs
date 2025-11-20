using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;
using System.Text.Json;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class HospitalsController: ControllerBase{
        readonly DataContext context;
        readonly string JsonFile = "Data/hospital.json";
        public HospitalsController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var data = await this.context.m_hospital.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Hospital? item = await this.context.m_hospital.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Hospital not found." });
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(Hospital patient)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (patient != null)
            {
                string? name = patient.name?.ToLower();
                // Check if the email already exists.
                Hospital? item = await this.context.m_hospital.FirstOrDefaultAsync(m => m.name == name);
                if (item != null)
                {
                    return Conflict(new { message = "Hospital is already exists." });
                }

                await Task.Run(() =>
                {
                    this.context.m_hospital.Add(patient);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Hospital add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, Hospital patient)
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
            Hospital? item = await this.context.m_hospital.FirstOrDefaultAsync(
                    m => m.id == patient.id);
            if (item == null)
            {
                return NotFound(new { message = "Hospital not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_hospital.Entry(item).CurrentValues.SetValues(patient);
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

            Hospital? item = await this.context.m_hospital.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Hospital not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_hospital.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "Hospital deleted "});
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
                    var name = $"Hospital_00{i+1}";
                    var item = new Hospital
                    {
                        name = name,
                        description = name,
                        email = $"{name}@test.com",
                        address = name,
                        phone = "123456789",
                        country = name
                    };
                    this.context.m_hospital.Add(item);
                }
                this.context.SaveChanges();

                List<Hospital> items = this.context.m_hospital.ToList();

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
                var items = this.context.ReadJsonFileToHospital(JsonFile);
                if (items != null)
                {
                    this.context.m_hospital.AddRange(items);
                }
            });

            return Ok(new {message = "Import Json to hospital table"});
        }
    }
}