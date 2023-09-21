using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using Moq;
using LMS.Models;
using LMS.Data;

namespace Test
{
    public class CustomerProvidersTest {

        private List<LoanCardMaster> sampleLoans;
        IQueryable<LoanCardMaster> loanData;
        Mock<DbSet<LoanCardMaster>> mockSet;
        Mock<GisdbContext> mockAPIContext;
        EmployeeProvider empRepo;

        [SetUp]
        public void Setup()
        {
            sampleLoans = new List<LoanCardMaster>() {
               new LoanCardMaster
               {
                   LoanId="L0001",
                   LoanType="Furniture",
                   DurationInYears=3
               }
            };
            loanData = sampleLoans.AsQueryable();
            mockSet = new Mock<DbSet<LoanCardMaster>>();
            mockSet.As<IQueryable<LoanCardMaster>>().Setup(m => m.Provider).Returns(loanData.Provider);
            mockSet.As<IQueryable<LoanCardMaster>>().Setup(m => m.Expression).Returns(loanData.Expression);
            mockSet.As<IQueryable<LoanCardMaster>>().Setup(m => m.ElementType).Returns(loanData.ElementType);
            mockSet.As<IQueryable<LoanCardMaster>>().Setup(m => m.GetEnumerator()).Returns(loanData.GetEnumerator());
            var p = new DbContextOptions<GisdbContext>();
            mockAPIContext = new Mock<GisdbContext>(p);
            mockAPIContext.Setup(x => x.LoanCardMasters).Returns(mockSet.Object);
            empRepo = new EmployeeProvider(mockAPIContext.Object);

        }

        [Test]

        public void GetLoanDeatilsById_Test()
        {
            List<LoanViewModel> res = empRepo.GetLoanDeatilsById("L0001");
            Assert.That(res[0].DurationInYears, Is.EqualTo(3));
        }
    }
}
}