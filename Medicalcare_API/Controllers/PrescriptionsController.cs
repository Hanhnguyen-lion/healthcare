using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;
using Medicalcare_API.DTOs;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class PrescriptionsController: ControllerBase{
        readonly DataContext context;
        public PrescriptionsController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        [Route("items/{medicalcare_id}")]
        public async Task<IActionResult> GetPrescriptions(int medicalcare_id)
        {
            var data = await this.context.v_prescription.Where(li=> li.medicalcare_id == null ||
                li.medicalcare_id == medicalcare_id).ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("item/{id}")]
        public async Task<IActionResult> GetPrescriptionById(int id)
        {
            PrescriptionDTO? item = await this.context.h_prescription.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Prescription not found." });
            }
            return Ok(item);
        }


        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(PrescriptionDTO item)
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
                    this.context.h_prescription.Add(item);
                    this.context.SaveChanges();
                });
            }
            return Ok(new { message = "Prescription add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, Prescription item)
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
            PrescriptionDTO? editItem = await this.context.h_prescription.FirstOrDefaultAsync(
                    m => m.id == item.id);
            if (item == null)
            {
                return NotFound(new { message = "Prescription not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    if (editItem != null)
                    {
                        this.context.h_prescription.Entry(editItem).CurrentValues.SetValues(item);
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
            var items = this.context.GetPatchPrescription(medicalcare_id);
            await Task.Run(() =>
            {
                if (items != null)
                {
                    foreach(var item in items)
                    {
                        this.context.h_prescription.Update(item);
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
            PrescriptionDTO? item = await this.context.h_prescription.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Prescription not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.h_prescription.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "Prescription deleted "});
            }
        }
    }
}