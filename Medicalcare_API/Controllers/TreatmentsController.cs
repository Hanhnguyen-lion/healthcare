using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;
using Medicalcare_API.DTOs;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class TreatmentsController: ControllerBase{
        readonly DataContext context;
        readonly string JsonFile = "Data/treatement_category.json";

        public TreatmentsController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        [Route("items/{billing_id}")]
        public async Task<IActionResult> GetTreatments(int billing_id)
        {
            var data = await this.context.v_treatment.Where(
                li=> li.billing_id == billing_id).ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("item/{id}")]
        public async Task<IActionResult> GetTreatmentById(int id)
        {
            TreatmentDTO? item = await this.context.m_treatment.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Treatment not found." });
            }
            return Ok(item);
        }


        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(TreatmentDTO item)
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
                    this.context.m_treatment.Add(item);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Treatment add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, TreatmentDTO item)
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
            TreatmentDTO? editItem = await this.context.m_treatment.FirstOrDefaultAsync(
                    m => m.id == item.id);
            if (editItem == null)
            {
                if (item?.billing_id > 0)
                {
                    if (item != null)
                    {
                        this.context.m_treatment.Add(item);
                        this.context.SaveChanges();
                    }
                    return Ok(item);
                }
                else
                {
                    return NotFound(new { message = "Treatment not found." });
                }
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_treatment.Entry(editItem).CurrentValues.SetValues(item);
                    this.context.SaveChanges();
                });

                return Ok(item);
            }
        }

        [HttpPatch]
        [Route("Patch/{medicalcare_id}")]
        public async Task<IActionResult> Patch(int medicalcare_id)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var items = this.context.GetPatchTreatment(medicalcare_id);
            await Task.Run(() =>
            {
                if (items != null)
                {
                    foreach(var item in items)
                    {
                        this.context.m_treatment.Update(item);
                    }
                    this.context.SaveChanges();
                }
            });

            return Ok();
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
            TreatmentDTO? item = await this.context.m_treatment.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Treatment not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_treatment.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "Treatment deleted "});
            }
        }

        [HttpGet]
        [Route("Category")]
        public async Task<IActionResult> GetCategories()
        {
            var data = await this.context.m_treatment_category.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("Category/{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            TreatmentCategory? item = await this.context.m_treatment_category.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Treatment Category not found." });
            }
            return Ok(item);
        }


        [HttpPost]
        [Route("Category/Add")]
        public async Task<IActionResult> AddCategory(TreatmentCategory item)
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
                    this.context.m_treatment_category.Add(item);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Treatment Category add successfully." });
        }        

        [HttpPut]
        [Route("Category/Edit/{id}")]
        public async Task<IActionResult> EditCategory(int id, TreatmentCategory item)
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
            TreatmentCategory? editItem = await this.context.m_treatment_category.FirstOrDefaultAsync(
                    m => m.id == item.id);
            if (editItem == null)
            {
                return NotFound(new { message = "Treatment Category not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_treatment_category.Entry(editItem).CurrentValues.SetValues(item);
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
            TreatmentCategory? item = await this.context.m_treatment_category.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Treatment Category not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.m_treatment_category.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "Treatment Category deleted "});
            }
        }

        [HttpPost]
        [Route("Category/ImportJson")]
        public async Task<IActionResult> ImportJson()
        {
            await Task.Run(() =>
            {
                var items = this.context.ReadJsonFile(JsonFile);
                if (items != null)
                {
                    List<TreatmentCategory> treatmentCategories = new List<TreatmentCategory>();
                    foreach (var item in items)
                    {
                        treatmentCategories.Add(new TreatmentCategory
                        {
                            name_en = item?["name_en"]?.ToString(),
                            name_vn = item?["name_vn"]?.ToString(),
                            name_jp = item?["name_jp"]?.ToString(),
                            description = item?["description"]?.ToString(),
                        });
                    }
                    this.context.m_treatment_category.AddRange(treatmentCategories);
                    this.context.SaveChanges();
                }
            });

            return Ok(new {message = "Import Json to treatment category table"});
        }
    }
}