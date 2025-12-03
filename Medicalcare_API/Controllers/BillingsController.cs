using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.DTOs;
using System.Collections;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class BillingsController: ControllerBase{
        readonly DataContext context;
        public BillingsController(DataContext context){
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBillingItems()
        {
            var data = await this.context.v_billing.ToListAsync();

            return Ok(data);
        }

        [HttpGet]
        [Route("BillingDetail/{id}")]
        public async Task<IActionResult> GetBillingDetail(int id)
        {

            IDictionary? item = new Dictionary<string, object>();
            await Task.Run(() =>
            {
                item = this.context.GetBillingDetails(id);
            });
            return Ok(item);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(Dictionary<string, object> item)
        {

            var billing_id = 0;
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (item != null)
            {
                await Task.Run(() =>
                {
                    DateTime? discharge_date = (string.IsNullOrEmpty(item["discharge_date"].ToString())) ? null : Convert.ToDateTime(item["discharge_date"].ToString());
                    var billingItem = new BillingDTO();
                    billingItem.doctor_id = Convert.ToInt32(item["doctor_id"].ToString());
                    billingItem.patient_id = Convert.ToInt32(item["patient_id"].ToString());
                    billingItem.admission_date = Convert.ToDateTime(item["admission_date"].ToString());
                    billingItem.discharge_date = discharge_date;
                    billingItem.department_id = Convert.ToInt32(item["department_id"].ToString());
                    billingItem.notes = item["notes"].ToString();
                    billingItem.diagnostic = item["diagnostic"].ToString();

                    this.context.h_billing.Add(billingItem);

                    this.context.SaveChanges();
                    billing_id = billingItem.id;
                });
            }
            return Ok(billing_id);
        }        

        [HttpPost]
        [Route("Add/Treatement/{id}")]
        public async Task<IActionResult> AddTreatment(int id, IList<Dictionary<string, object>> treatements)
        {

            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (treatements != null)
            {
                await Task.Run(() =>
                {
                    if (treatements != null)
                    {
                        foreach (var item in treatements)
                        {
                            var treatmentItem = new TreatmentDTO();
                            
                            treatmentItem.billing_id = id;
                            treatmentItem.quantity = Convert.ToInt32(item["quantity"].ToString());
                            treatmentItem.description = item["description"].ToString();
                            treatmentItem.category_id = Convert.ToInt32(item["category_id"].ToString());

                            this.context.m_treatment.Add(treatmentItem);
                        } 
                        this.context.SaveChanges();
                    }
                });
            }
            return Ok(new { message = "Treatment add successfully." });
        }        

        [HttpPost]
        [Route("Add/Prescription/{id}")]
        public async Task<IActionResult> Prescription(int id, IList<Dictionary<string, object>> prescriptions)
        {

            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (prescriptions != null)
            {
                await Task.Run(() =>
                {
                    if (prescriptions != null)
                    {
                        foreach (var item in prescriptions)
                        {
                            var prescriptionItem = new PrescriptionDTO();
                            
                            prescriptionItem.billing_id = id;
                            prescriptionItem.medicine_id = Convert.ToInt32(item["medicine_id"].ToString());
                            prescriptionItem.quantity = Convert.ToInt32(item["quantity"].ToString());
                            prescriptionItem.duration = Convert.ToInt32(item["duration"].ToString());
                            prescriptionItem.duration_type = item["duration_type"].ToString();
                            prescriptionItem.dosage = item["dosage"].ToString();
                            prescriptionItem.notes = item["notes"].ToString();
                            prescriptionItem.medicine_type = item["medicine_type"].ToString();
                            prescriptionItem.duration_type = item["duration_type"].ToString();


                            this.context.h_prescription.Add(prescriptionItem);
                        } 
                        this.context.SaveChanges();
                    }
                });
            }
            return Ok(new { message = "Presscription add successfully." });
        }        

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, BillingDTO item)
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
            BillingDTO? editItem = await this.context.h_billing.FirstOrDefaultAsync(
                    m => m.id == item.id);
            if (item == null)
            {
                return NotFound(new { message = "Billing not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    if (editItem != null)
                    {
                        this.context.h_billing.Entry(editItem).CurrentValues.SetValues(item);
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
            BillingDTO? item = await this.context.h_billing.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Billing not found." });
            }
            else
            {
                await Task.Run(() =>
                {
                    this.context.h_billing.Remove(item);
                    this.context.SaveChanges();
                });

                return Ok(new {message = "Billing deleted "});
            }
        }

        [HttpPost]
        [Route("PrescriptionItem")]
        public async Task<IActionResult> GetPrescriptionItem([FromBody] Dictionary<string, object> item)
        {
            IDictionary? data = new Dictionary<string, object>();
            await Task.Run(() =>
            {
               data = this.context.GetPrescriptionItem(item); 
            });

            return Ok(data);
        }

        [HttpPost]
        [Route("TreatmentItem")]
        public async Task<IActionResult> GetTreatmentItem([FromBody] Dictionary<string, object> item)
        {
            IDictionary? data = new Dictionary<string, object>();
            await Task.Run(() =>
            {
               data = this.context.GetTreatmentItem(item); 
            });

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

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetBillingById(int id)
        {
            BillingDTO? item = await this.context.h_billing.FirstOrDefaultAsync(
                    m => m.id == id);
            if (item == null)
            {
                return NotFound(new { message = "Billing not found." });
            }
            return Ok(item);
        }
    }
}