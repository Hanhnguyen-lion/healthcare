using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;
using System.Text.Json;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class DepartmentsController: ControllerBase{
        readonly DataContext context;
        readonly string JsonFile = "Data/departments.json";
        public DepartmentsController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            var data = await this.context.m_department.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            Department? item = await this.context.m_department.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Department not found." });
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(Department item)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (item != null)
            {
                string? name = item.name?.ToLower();
                // Check if the email already exists.
                Department? existItem = await this.context.m_department.FirstOrDefaultAsync(m => m.name == name);
                if (existItem != null)
                {
                    return Conflict(new { message = "Department is already exists." });
                }

                await Task.Run(() =>
                {
                    this.context.m_department.Add(item);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Department add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, Department patient)
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
            Department? item = await this.context.m_department.FirstOrDefaultAsync(
                    m => m.id == patient.id);
            if (item == null)
            {
                return NotFound(new { message = "Department not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_department.Entry(item).CurrentValues.SetValues(patient);
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

            // Check if Department exists
            Department? item = await this.context.m_department.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Department not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_department.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "Department deleted "});
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
                    var name = $"Department_00{i+1}";
                    var item = new Department
                    {
                        name = name,
                        phone = "123456789"
                    };
                    this.context.m_department.Add(item);
                }
                this.context.SaveChanges();

                List<Department> items = this.context.m_department.ToList();

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
                var items = this.context.ReadJsonFileToDepartment(JsonFile);
                if (items != null)
                {
                    this.context.m_department.AddRange(items);
                }
            });

            return Ok(new {message = "Import Json to department table"});
        }
    }
}