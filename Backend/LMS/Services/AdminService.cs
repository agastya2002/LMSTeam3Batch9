using LMS.Data;
using LMS.Models;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Services
{
    public class AdminService : IAdminService
    {
        private readonly EmployeeProvider _employeeDataProvider;
        public AdminService(EmployeeProvider employeeDataProvider)
        {
            _employeeDataProvider = employeeDataProvider;
        }

        public List<EditEmployeeViewModel> GetEmployees()
        {
            return _employeeDataProvider.GetEmployees();
        }

        public void UpdateEmployee(EditEmployeeViewModel employee)
       {
            _employeeDataProvider.EditEmployee(employee, employee.EmployeeId);
        }
        public string UpdateLoan(LoanCardMaster l)
        {
            return _employeeDataProvider.EditLoan(l);
        }

        public string UpdateItem(ItemMaster i)
        {
            return _employeeDataProvider.EditItem(i);
        }

        public EditEmployeeViewModel GetEmployeeById(string id)
        {
            return _employeeDataProvider.GetEmployeeById(id);
        }

        public Boolean DeleteLoanById(string id)
        {
            return _employeeDataProvider.DeleteLoanById(id);
        }

        public Boolean DeleteEmp(string id)
        {
            return _employeeDataProvider.DeleteEmployee(id);
        }

        public List<ItemMaster> GetItems() 
        { 
            return _employeeDataProvider.GetItemsList();
        }

        public List<LoanCardMaster> GetLoanCards()
        {
            return _employeeDataProvider.GetLoansList();
        }

        public bool DeleteItemById(string id)
        {
            return _employeeDataProvider.DeleteItemById(id);
        }

        public string AddLoanCard(LoanCardViewModel e)
        {
            return _employeeDataProvider.AddLoanCard(e);
        }
    }
}
