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

        [HttpPut("UpdateLoan")]
        public async Task<ActionResult> UpdateLoan(LoanCardMaster e)
        {
            string res= _adminService.UpdateLoan(e);
            if (res[0]=='L')
                return Ok(res);
            else return BadRequest(res);
        }

        [HttpPut("UpdateItem")]
        public async Task<ActionResult> UpdateItem(ItemMaster e)
        {
            string res = _adminService.UpdateItem(e);
            if (res[0]=='I')
                return Ok(res);
            else return BadRequest(res);
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

        [HttpGet("GetItems")]
        public async Task<ActionResult> GetItems()
        {
            List<ItemMaster> list = _adminService.GetItems();
            return Ok(list);
        }

        [HttpGet("GetLoans")]
        public async Task<ActionResult> GetLoans()
        {
            List<LoanCardMaster> list = _adminService.GetLoanCards();
            return Ok(list);
        }

        [HttpDelete("DeleteLoanById")]
        public IActionResult DeleteLoan(string id) {
            Boolean res = _adminService.DeleteLoanById(id);
            if(res)
            {
                return Ok();
            }
            else { return BadRequest(); }
        }

        [HttpDelete("DeleteEmployee")]
        public IActionResult DeleteEmployee([FromQuery] User userParams)
        {
            Boolean res = _adminService.DeleteEmp(userParams.id);
            if (res)
            {
                return Ok();
            }
            else { return BadRequest(); }
        }

        [HttpDelete("DeleteItemById")]
        public IActionResult DeleteItem(string id)
        {
            Boolean res = _adminService.DeleteItemById(id);
            if (res)
            {
                return Ok();
            }
            else { return BadRequest(); }
        }

        [HttpPost("AddLoanCard")]
        public IActionResult AddLoanCard(LoanCardViewModel e)
        {
            var res = _adminService.AddLoanCard(e);
            if (res[0] == 'L')
            {
                return Ok(res);
            }
            else
            {
                return BadRequest(res);
            }
        }
    }
}
