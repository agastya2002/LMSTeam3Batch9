using LMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using LMS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly GisdbContext _db;

        public RegisterController(GisdbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<ActionResult> RegisterEmployee(EmployeeMaster e)
        {
            await _db.EmployeeCredentials.AddAsync(e.Employee);
            await _db.SaveChangesAsync();
            await _db.EmployeeMasters.AddAsync(e);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}
