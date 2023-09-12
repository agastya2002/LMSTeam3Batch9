using LMS.Models;
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

        public Boolean RegisterEmployee(EmployeeMaster e)
        {
            try
            {
                _db.EmployeeCredentials.Add(e.Employee);
                _db.SaveChanges();
                _db.EmployeeMasters.Add(e);
                _db.SaveChanges();
                return true;
            } 
            catch
            {
                return false;
            }
        }
    }
}