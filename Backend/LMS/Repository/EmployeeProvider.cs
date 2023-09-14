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

        public string ApplyForLoan(EmployeeIssueViewModel e)
        {
            try
            {
                var query1 = from emp in _db.EmployeeCardDetails
                             where emp.EmployeeId==e.EmployeeID
                             select emp.LoanId;
                             
                List<String> _items = query1.ToList();

                var query2=from loan in _db.LoanCardMasters
                           where _items.Contains(loan.LoanId)
                           select loan.LoanType;

                List<String> _categories = query2.ToList();
                
                int min = 1000;
                int max = 9999;
                Random _rdm = new Random();
                String _loanId;
                
                DateTime _returnDate;
                if (_categories.Contains(e.ItemCategory))
                {
                    var query3 = (from loan in _db.LoanCardMasters
                                    where loan.LoanType==e.ItemCategory
                                    select new {duration= loan.DurationInYears,loanId= loan.LoanId}).ToList();
                    _loanId=query3[0].loanId;
                    var query4 = (from loan in _db.EmployeeCardDetails
                                 where loan.LoanId==_loanId
                                 select loan.CardIssueDate).ToArray();
                    int _duration = (int)query3[0].duration;
                    _returnDate = ((DateTime)query4[0]).AddYears(_duration);
                }
                else
                {
                    var query5 = from loan in _db.LoanCardMasters
                                 select loan.LoanId;
                    List<String> _loanIDS = query5.ToList();

                    _loanId="L"+_rdm.Next(min, max);
                    
                    while (_loanIDS.Contains(_loanId))
                    {
                        _loanId = "L" + _rdm.Next(min, max);
                    }
                    LoanCardMaster newLoan = new LoanCardMaster() { LoanId=_loanId, LoanType=e.ItemCategory, DurationInYears=1 };
                    _db.LoanCardMasters.Add(newLoan);
                    _db.SaveChanges();

                    EmployeeCardDetail newCard = new EmployeeCardDetail() { EmployeeId=e.EmployeeID, LoanId=_loanId, CardIssueDate=new DateTime() };
                    _db.EmployeeCardDetails.Add(newCard);
                    _db.SaveChanges();
                    _returnDate = new DateTime().AddYears(1);

                }

                //inserting into item_master
                var query6 = from item in _db.ItemMasters
                             select item.ItemId;
                List<String> _itemIDS = query6.ToList();
                String itemId = "I"+_rdm.Next(min, max);

                while (_itemIDS.Contains(itemId))
                {
                    itemId = "I" + _rdm.Next(min, max);
                }

                var query7 = from item in _db.EmployeeIssueDetails
                             select item.IssueId;
                List<String> _issueIDS = query7.ToList();
                String issueId = "IS"+_rdm.Next(min, max);

                while (_issueIDS.Contains(issueId))
                {
                    issueId = "IS"+_rdm.Next(min, max);
                }


                ItemMaster newItem=new ItemMaster() { ItemId=itemId, IssueStatus="active", ItemDescription=e.ItemDescription, ItemMake=e.ItemMake, ItemCategory=e.ItemCategory, ItemValuation=e.ItemValue };
                _db.ItemMasters.Add(newItem);
                _db.SaveChanges();

                EmployeeIssueDetail newIssue=new EmployeeIssueDetail() { IssueId=issueId,EmployeeId=e.EmployeeID,ItemId=itemId,IssueDate=new DateTime(),ReturnDate=_returnDate };
                _db.EmployeeIssueDetails.Add(newIssue);
                _db.SaveChanges();

                return itemId;
            }
            catch (Exception exp)
            {
                return exp.Message;
            }
        }
    }
}