using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Medicalcare_API.Helpers;
using Medicalcare_API.DTOs;
using Medicalcare_API.Models;

namespace Medicalcare_API.Controllers{

    [ApiController]
    [Route("Medicalcare/api/[controller]")]
    public class AccountsController: ControllerBase{
        readonly DataContext context;

        public AccountsController(DataContext context){
            this.context = context;
        }
 
        [HttpGet]
        public async Task<IActionResult> GetAccounts()
        {
            var data = await this.context.m_account.ToListAsync();


            return Ok(data);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterDTO registerDto)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string? email = registerDto?.email?.ToLower();
            // Check if the email already exists.
            Account? item = await this.context.m_account.FirstOrDefaultAsync(m => m.email == email);
            if (item != null)
            {
                return Conflict(new { message = "Email is already registered." });
            }

            // Create a new user entity.
            var newAccount = new Account
            {
                email = email,
                first_name = registerDto?.first_name,
                last_name = registerDto?.last_name,
                password = registerDto?.password,
                dob = registerDto?.dob,
                gender = registerDto?.gender,
                account_type = registerDto?.account_type
            };

            await Task.Run(() =>
            {
                this.context.m_account.Add(newAccount);
                this.context.SaveChanges();
            });
            return Ok(new { message = "User registered successfully." });
        }        

        [HttpPost]
        [Route("Authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateDTO authenticateDto)
        {
            // Validate the incoming model.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string? email = authenticateDto?.email?.ToLower();
            string? password = authenticateDto?.password;
            // Check if the email already exists.
            Account? item = await this.context.m_account.FirstOrDefaultAsync(
                    m => m.email == email &&
                    m.password == password);
            if (item == null)
            {
                return NotFound(new { message = "Email or password is incorrect." });
            }

            return Ok(item);
        }        
    }
}