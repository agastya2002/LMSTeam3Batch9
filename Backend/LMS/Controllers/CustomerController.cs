using LMS.Models;
using LMS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "customer")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService=customerService;
        }

        [HttpGet("GetPurchasedItems")]
        public async Task<ActionResult> GetAllItems(String id)
        {
            List<ItemMaster> items =  _customerService.GetitemInformation(id);
            return Ok(items);
        }

        [HttpGet("GetLoans")]
        public async Task<ActionResult> GetLoanDetails(String id)
        {
            List<LoanViewModel> items = _customerService.GetLoanInformation(id);
            return Ok(items);
        }
    }
}
