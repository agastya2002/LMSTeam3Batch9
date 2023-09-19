using LMS.Models;
using LMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using LMS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin")]
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

        [HttpGet("GetEmployeeById")]
        public async Task<ActionResult> GetEmployeeById(string id)
        {
            EditEmployeeViewModel employee = _adminService.GetEmployeeById(id);
            return Ok(employee);
        }

        [HttpDelete("DeleteLoanById")]
        public IActionResult DeleteEmployee(string id) {
            Boolean res = _adminService.DeleteLoanById(id);
            if(res)
            {
                return Ok();
            }
            else { return BadRequest(); }
        }
    }
}
