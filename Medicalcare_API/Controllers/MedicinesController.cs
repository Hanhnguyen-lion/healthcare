using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;
using System.Text.Json;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class MedicinesController: ControllerBase{
        readonly DataContext context;
        readonly string JsonFile = "Data/medicine.json";
        public MedicinesController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var data = await this.context.m_medicine.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Medicine? item = await this.context.m_medicine.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Medicine not found." });
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(Medicine patient)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (patient != null)
            {
                string? name = patient.name?.ToLower();
                Medicine? item = await this.context.m_medicine.FirstOrDefaultAsync(m => m.name == name);
                if (item != null)
                {
                    return Conflict(new { message = "Medicine is already exists." });
                }

                await Task.Run(() =>
                {
                    this.context.m_medicine.Add(patient);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Medicine add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, Medicine patient)
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
            Medicine? item = await this.context.m_medicine.FirstOrDefaultAsync(
                    m => m.id == patient.id);
            if (item == null)
            {
                return NotFound(new { message = "Medicine not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_medicine.Entry(item).CurrentValues.SetValues(patient);
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

            Medicine? item = await this.context.m_medicine.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Medicine not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_medicine.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "Medicine deleted "});
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
                    var name = $"Medicine_00{i+1}";
                    var item = new Medicine
                    {
                        name = name,
                        type = name,
                        price = 100M,
                        input_date = DateTime.Today,
                        expire_date = DateTime.Today.AddYears(-1)
                    };
                    this.context.m_medicine.Add(item);
                }
                this.context.SaveChanges();

                List<Medicine> items = this.context.m_medicine.ToList();

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
                var items = this.context.ReadJsonFileToMedicine(JsonFile);
                if (items != null)
                {
                    this.context.m_medicine.AddRange(items);
                }
            });

            return Ok(new {message = "Import Json to medicine table"});
        }
    }
}