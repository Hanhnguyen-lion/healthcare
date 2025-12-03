using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;
using System.Text.Json;
using Medicalcare_API.DTOs;

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
            var data = await this.context.v_medicine.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            v_medicine? item = await this.context.v_medicine.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Medicine not found." });
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(m_medicine item)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (item != null)
            {
                string? name = item.name?.ToLower();
                m_medicine? newItem = await this.context.m_medicine.FirstOrDefaultAsync(m => m.name == name);
                if (newItem != null)
                {
                    return Conflict(new { message = "Medicine is already exists." });
                }

                await Task.Run(() =>
                {
                    this.context.m_medicine.Add(item);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Medicine add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, m_medicine patient)
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
            m_medicine? item = await this.context.m_medicine.FirstOrDefaultAsync(
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

            m_medicine? item = await this.context.m_medicine.FirstOrDefaultAsync(
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
                    var item = new m_medicine
                    {
                        name = name,
                        price = 100M
                    };
                    this.context.m_medicine.Add(item);
                }
                this.context.SaveChanges();

                List<m_medicine> items = this.context.m_medicine.ToList();

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


        [HttpGet]
        [Route("Category")]
        public async Task<IActionResult> GetCategories()
        {
            var data = await this.context.m_medicine_type.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("Category/{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            MedicineType? item = await this.context.m_medicine_type.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Medicine Category not found." });
            }
            return Ok(item);
        }


        [HttpPost]
        [Route("Category/Add")]
        public async Task<IActionResult> AddCategory(MedicineType item)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (item != null)
            {
                await Task.Run(() =>
                {
                    this.context.m_medicine_type.Add(item);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Medicine Category add successfully." });
        }        

        [HttpPut]
        [Route("Category/Edit/{id}")]
        public async Task<IActionResult> EditCategory(int id, MedicineType item)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.id)
            {
                return BadRequest("ID mismatch in the URL and body.");
            }
            // Check if patient exists
            MedicineType? editItem = await this.context.m_medicine_type.FirstOrDefaultAsync(
                    m => m.id == item.id);
            if (editItem == null)
            {
                return NotFound(new { message = "Medicine Category not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_medicine_type.Entry(editItem).CurrentValues.SetValues(item);
                    this.context.SaveChanges();
                });

                return Ok(item);
            }
        }
 
        [HttpDelete]
        [Route("Category/Delete/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if patient exists
            MedicineType? item = await this.context.m_medicine_type.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Medicine Category not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_medicine_type.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "Medicine Category deleted "});
            }
        }
        
    }
}