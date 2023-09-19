﻿using LMS.Models;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Services
{
    public interface IAdminService
    {
        public void UpdateEmployee(EditEmployeeViewModel employee);
        public string UpdateLoan(LoanCardMaster l);
        public string UpdateItem(ItemMaster i);
        public List<EditEmployeeViewModel> GetEmployees();
        public EditEmployeeViewModel GetEmployeeById(string id);
        public Boolean DeleteLoanById(string id);
        public Boolean DeleteEmp(string id);

    }
}
