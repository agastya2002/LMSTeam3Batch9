using LMS.Models;
using Microsoft.AspNetCore.Mvc;
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
        public string ApplyForLoan(EmployeeIssueViewModel e);
        public string EditLoan(LoanCardMaster e);
        public string EditItem(ItemMaster e);
        public List<ItemMaster> GetItemDetailsById(String id);
        public List<LoanViewModel> GetLoanDeatilsById(String id);
        public Boolean DeleteLoanById(String id);
        public List<ItemMaster> GetItemsList();
    }
}