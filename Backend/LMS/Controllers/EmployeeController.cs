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
