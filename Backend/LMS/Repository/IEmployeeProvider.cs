using LMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS.Data
{
    public interface IEmployeeProvider
    {
        public Boolean RegisterEmployee(EmployeeMaster e);
        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login);
        public List<ItemMaster> GetItemDetailsById(String id);
        public List<LoanViewModel> GetLoanDeatilsById(String id);

    }
}