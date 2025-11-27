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
        public TreatmentsController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        [Route("items/{medicalcare_id}")]
        public async Task<IActionResult> GetTreatments(int medicalcare_id)
        {
            var data = await this.context.m_treatment.Where(li=> li.medicalcare_id == null ||
                li.medicalcare_id == medicalcare_id).ToListAsync();

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
            if (item == null)
            {
                return NotFound(new { message = "Treatment not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    if (editItem != null)
                    {
                        this.context.m_treatment.Entry(editItem).CurrentValues.SetValues(item);
                        this.context.SaveChanges();
                    }
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
    }
}