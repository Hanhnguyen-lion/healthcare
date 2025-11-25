using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;
using Medicalcare_API.DTOs;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class MedicalCaresController: ControllerBase{
        readonly DataContext context;
        public MedicalCaresController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMedicalCares()
        {
            var data = await this.context.v_medicalcare.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetMedicalCareById(int id)
        {
            MedicalCareDTO? item = await this.context.h_medicalcare.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "MedicalCare not found." });
            }
            return Ok(item);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(MedicalCareDTO item)
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
                    this.context.h_medicalcare.Add(item);
                    this.context.SaveChanges();
                    var id = item.id;

                    var prescriptionItems = this.context.GetPatchPrescription(id);
                    if (prescriptionItems != null)
                    {
                        foreach (var item in prescriptionItems)
                        {
                            this.context.Update(item);
                        } 
                        this.context.SaveChanges();
                    }
                    var treatmentItems = this.context.GetPatchTreatment(id);
                    if (treatmentItems != null)
                    {
                        foreach (var item in treatmentItems)
                        {
                            this.context.Update(item);
                        } 
                        this.context.SaveChanges();
                    }
                });
            }
            return Ok(new { message = "MedicalCare add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, MedicalCareDTO item)
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
            MedicalCareDTO? editItem = await this.context.h_medicalcare.FirstOrDefaultAsync(
                    m => m.id == item.id);
            if (item == null)
            {
                return NotFound(new { message = "MedicalCare not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    if (editItem != null)
                    {
                        this.context.h_medicalcare.Entry(editItem).CurrentValues.SetValues(item);
                        this.context.SaveChanges();
                    }
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
            MedicalCareDTO? item = await this.context.h_medicalcare.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "MedicalCare not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.h_medicalcare.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "MedicalCare deleted "});
            }
        }
    }
}