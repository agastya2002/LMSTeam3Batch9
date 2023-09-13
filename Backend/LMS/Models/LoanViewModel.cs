namespace LMS.Models
{
    public class LoanViewModel
    {
        public string LoanId { get; set; } = null!;

        public string? LoanType { get; set; }

        public int? DurationInYears { get; set; }

        public DateTime? CardIssueDate { get; set; }
    }
}
