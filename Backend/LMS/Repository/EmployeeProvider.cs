using LMS.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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

        public void EditEmpolyee(EditEmployeeViewModel e, String id)
        {
            EmployeeCredential ec = _db.EmployeeCredentials.Find(id);

            EmployeeMaster newEmp = new EmployeeMaster()
            {
                EmployeeId = e.EmployeeId,
                EmployeeName = e.EmployeeName,
                Designation = e.Designation,
                Department = e.Department,
                Gender = e.Gender,
                DateOfBirth = e.DateOfBirth,
                DateOfJoining = e.DateOfJoining,
                Employee = ec
            };

            _db.EmployeeMasters.Update(newEmp);
            _db.SaveChanges();
            
        }

        public string RegisterEmployee(RegisterViewModel e)
        {
            try
            {
                var query1 = from emp in _db.EmployeeMasters
                             select emp.EmployeeId;
                List<String> _items = query1.ToList();
                int min = 1000;
                int max = 9999;
                Random _rdm = new Random();
                String empId = "E" + _rdm.Next(min, max);
                while(_items.Contains(empId)) {
                    empId = "E" + _rdm.Next(min, max);
                }

                EmployeeCredential c = new EmployeeCredential() {EmployeeId = empId, EmployeePassword = e.Employee.EmployeePassword, EmployeeRole = e.Employee.EmployeeRole};
                EmployeeMaster newEmp = new EmployeeMaster()
                {
                    EmployeeId = empId,
                    EmployeeName = e.EmployeeName,
                    Designation = e.Designation,
                    Department = e.Department,
                    Gender = e.Gender,
                    DateOfBirth = e.DateOfBirth,
                    DateOfJoining = e.DateOfJoining,
                    Employee = c
                };

                _db.EmployeeCredentials.Add(c);
                _db.SaveChanges();
                _db.EmployeeMasters.Add(newEmp);
                _db.SaveChanges();
                return empId;
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