using LMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS.Data
{
    public class EmployeeDataProvider : IEmployeeDataProvider
    {
        private readonly GisdbContext _db;

        public EmployeeDataProvider(GisdbContext db)
        {
            _db = db;
        }

        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login)
        {
            //return users.SingleOrDefault(x => x.EmployeeId == login.Username && x.EmployeePassword == login.Password);
            return _db.EmployeeCredentials.SingleOrDefault(x => x.EmployeeId == login.Username && x.EmployeePassword == login.Password);
        }
    }
}