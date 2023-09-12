using LMS.Data;
using LMS.Models;

namespace LMS.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly EmployeeProvider _employeeDataProvider;
        public CustomerService(EmployeeProvider employeeDataProvider)
        {
            _employeeDataProvider = employeeDataProvider;
        }
        public List<ItemMaster> GetitemInformation(string id)
        {
            List<ItemMaster> items = _employeeDataProvider.GetItemDetails(id);
            return items;
        }
    }
}
