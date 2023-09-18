using LMS.Data;
using LMS.Models;

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

        public EditEmployeeViewModel GetEmployeeById(string id)
        {
            return _employeeDataProvider.GetEmployeeById(id);
        }
    }
}
