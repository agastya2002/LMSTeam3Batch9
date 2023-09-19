using LMS.Data;

namespace LMS.Services
{
    public class AdminService
    {
        private readonly EmployeeProvider _employeeDataProvider;
        public AdminService(EmployeeProvider employeeDataProvider)
        {
            _employeeDataProvider = employeeDataProvider;
        }

        bool DeleteItem(string id)
        {
            return true;
        }
    }
}
