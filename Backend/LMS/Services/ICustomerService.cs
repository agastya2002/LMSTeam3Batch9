﻿using LMS.Models;

namespace LMS.Services
{
    public interface ICustomerService
    {
        public List<ItemMaster> GetitemInformation(String id);
        public List<LoanViewModel> GetLoanInformation(string id);
    }
}
