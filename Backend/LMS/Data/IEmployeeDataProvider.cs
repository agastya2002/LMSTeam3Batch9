using LMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS.Data
{
    public interface IEmployeeDataProvider
    {
        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login);
    }
}