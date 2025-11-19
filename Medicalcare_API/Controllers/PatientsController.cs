using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.Models;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class PatientsController: ControllerBase{
        readonly DataContext context;

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
    }
}