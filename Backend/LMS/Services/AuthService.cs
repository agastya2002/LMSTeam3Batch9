using LMS.Data;
using LMS.Models;
using LMS.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS.Services
{
    public class AuthService : IAuthService
    {
        private readonly EmployeeDataProvider _employeeDataProvider;
        public AuthService(EmployeeDataProvider employeeDataProvider)
        {
            _employeeDataProvider = employeeDataProvider;
        }
        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login)
        {
            EmployeeCredential employee = null;
            employee = _employeeDataProvider.GetEmployeeDetail(login);
            return employee;
        }
    }
}