using LMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS.Services
{
    public interface IAuthService
    {
        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login);
        public Boolean RegisterEmployee(EmployeeMaster e);
        public string GenerateJSONWebToken(EmployeeCredential employeeInfo);
        public EmployeeCredential AuthenticateEmployee(EmployeeViewModel login);
    }
}