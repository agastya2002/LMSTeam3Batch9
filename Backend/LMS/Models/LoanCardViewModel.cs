namespace LMS.Models
{
    public class LoanCardViewModel
    {
        public string LoanId { get; set; } = null!;

        public string? LoanType { get; set; }

        public int? DurationInYears { get; set; }

    }
}
