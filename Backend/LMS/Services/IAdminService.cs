using LMS.Models;

namespace LMS.Services
{
    public interface IAdminService
    {
        public void UpdateEmployee(EditEmployeeViewModel employee);
        public List<EditEmployeeViewModel> GetEmployees();
    }
}
