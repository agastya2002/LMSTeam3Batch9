using LMS.Data;
using LMS.Models;

namespace LMS.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IEmployeeProvider _employeeDataProvider;
        public CustomerService(IEmployeeProvider employeeDataProvider)
        {
            _employeeDataProvider = employeeDataProvider;
        }
        public List<ItemViewModel> GetitemInformation(string id)
        {
            List<ItemViewModel> items = _employeeDataProvider.GetItemDetailsById(id);
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
