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
    }
}