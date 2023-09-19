using LMS.Models;
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

        [HttpDelete("DeleteItem")]
        public IActionResult DeleteItem([FromQuery] User userParameters)
        {
            Boolean res = _adminService.DeleteItem(userParameters.id);
            if(res)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
