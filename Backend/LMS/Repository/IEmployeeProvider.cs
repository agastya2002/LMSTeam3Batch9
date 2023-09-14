using LMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS.Data
{
    public interface IEmployeeProvider
    {
        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login);
        public string RegisterEmployee(RegisterViewModel e);
        public List<ItemMaster> GetItemDetailsById(String id);
        public List<LoanViewModel> GetLoanDeatilsById(String id);
    }
}