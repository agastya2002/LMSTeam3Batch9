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
            List<ItemMaster> items = _employeeDataProvider.GetItemDetailsById(id);
            return items;
        }
        public List<LoanViewModel> GetLoanInformation(string id)
        {
            List<LoanViewModel> items = _employeeDataProvider.GetLoanDeatilsById(id);
            return items;
        }

        public string ApplyForLoan(EmployeeIssueViewModel e)
        {
            return _employeeDataProvider.ApplyForLoan(e);
        }

    }
}
