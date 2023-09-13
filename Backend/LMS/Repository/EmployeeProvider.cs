﻿using LMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS.Data
{
    public class EmployeeProvider : IEmployeeProvider
    {
        private readonly GisdbContext _db;
        public EmployeeProvider(GisdbContext db)
        {
            _db = db;
        }

        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login)
        {
            //return users.SingleOrDefault(x => x.EmployeeId == login.Username && x.EmployeePassword == login.Password);
            return _db.EmployeeCredentials.SingleOrDefault(x => x.EmployeeId == login.Username && x.EmployeePassword == login.Password);
        }

        public string RegisterEmployee(EmployeeMaster e)
        {
            try
            {
                _db.EmployeeCredentials.Add(e.Employee);
                _db.SaveChanges();
                _db.EmployeeMasters.Add(e);
                _db.SaveChanges();
                return "Ok";
            } 
            catch (Exception exp)
            {
                return exp.Message;
            }
        }

        public List<ItemMaster> GetItemDetailsById(String id)
        {
            try
            {
                var query1 = from item in _db.ItemMasters
                              join issue in _db.EmployeeIssueDetails
                              on item.ItemId equals issue.ItemId
                              where issue.EmployeeId == id
                              select item;

                List<ItemMaster> _items = query1.ToList();
                return _items;
            }
            catch
            {
                return new List<ItemMaster>();
            }
        }

        public List<LoanViewModel> GetLoanDeatilsById(String id)
        {
            try
            {
                var query1 = from loan in _db.LoanCardMasters
                             join issue in _db.EmployeeCardDetails
                             on loan.LoanId equals issue.LoanId
                             where issue.EmployeeId == id
                             select new LoanViewModel(){ LoanId = loan.LoanId, LoanType = loan.LoanType, DurationInYears = loan.DurationInYears, CardIssueDate = issue.CardIssueDate };

                List<LoanViewModel> _items = query1.ToList();
                return _items;
            }
            catch
            {
                return new List<LoanViewModel>();
            }
        }
    }
}