using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace LMS.Models;
[Keyless]
public partial class EmployeeCardDetail
{
    public string? EmployeeId { get; set; }

    public string? LoanId { get; set; }

    public DateTime? CardIssueDate { get; set; }

    public virtual EmployeeMaster? Employee { get; set; }

    public virtual LoanCardMaster? Loan { get; set; }
}
