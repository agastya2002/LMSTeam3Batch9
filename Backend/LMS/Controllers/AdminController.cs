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
        public async Task<ActionResult> updateEmployee(EditEmployeeViewModel e)
        {
            _adminService.UpdateEmplyee(e);
            return Ok();
        }
    }
}
