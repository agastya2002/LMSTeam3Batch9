using LMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly GisdbContext _db;

        public EmployeeController(GisdbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<ActionResult> RegisterEmployee(string employeeId, string employeeName, string designation, string department, string gender, DateTime dob, DateTime doj, string password, String employeeRole)
        {
            EmployeeCredential c = new EmployeeCredential();
            c.EmployeeId = employeeId;
            c.EmployeePassword = password;
            c.EmployeeRole = employeeRole;
            await _db.EmployeeCredentials.AddAsync(c);
            await _db.SaveChangesAsync();

            EmployeeMaster e = new EmployeeMaster();
            e.EmployeeId = employeeId;
            e.EmployeeName = employeeName;
            e.Designation = designation;
            e.Department = department;  
            e.Gender = gender;
            e.DateOfBirth = dob;
            e.DateOfJoining = doj;
            e.Employee = c;
            await _db.EmployeeMasters.AddAsync(e);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}
