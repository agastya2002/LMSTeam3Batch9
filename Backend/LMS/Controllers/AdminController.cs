using LMS.Models;
using LMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService=adminService;
        }

        [HttpPut("UpdateEmployee")]
        public async Task<ActionResult> UpdateEmployee(EditEmployeeViewModel e)
        {
            _adminService.UpdateEmployee(e);
            return Ok();
        }

        [HttpGet("GetEmployees")]
        public async Task<ActionResult> GetEmployees()
        {
            List<EditEmployeeViewModel> list = _adminService.GetEmployees();
            return Ok(list);
        }
    }
}
