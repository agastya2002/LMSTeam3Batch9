using LMS.Models;
using LMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService=customerService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllItems(String id)
        {
            List<ItemMaster> items =  _customerService.GetitemInformation(id);
            return Ok(items);
        }
    }
}
