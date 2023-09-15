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

        public void UpdateEmplyee(EditEmployeeViewModel employee)
       {
            _employeeDataProvider.EditEmpolyee(employee, employee.EmployeeId);
        }
    }
}
