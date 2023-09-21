using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using Moq;
using LMS.Models;
using LMS.Data;
using Microsoft.AspNetCore.Cors.Infrastructure;
using LMS.Services;

namespace Test
{
    public class CustomerServicesTest {

        private Mock<EmployeeProvider> EmpRepoObj;

        private CustomerService customerService;

        private readonly List<LoanViewModel> loans = new(){
            new LoanViewModel(){ LoanId="L0001",LoanType="Furniture",DurationInYears=3,CardIssueDate=new DateTime(1000)}
        };

        [SetUp]
        public void Setup()
        {
            EmpRepoObj = new Mock<EmployeeProvider>();
            EmpRepoObj.Setup(x => x.GetLoanDeatilsById("L0001")).Returns(loans);
            customerService = new CustomerService(EmpRepoObj.Object);
        }


        [Test]
        public void GetLoanDeatilsById_Test()
        {
            var result = customerService.GetLoanInformation("L0001");
            // To print something to debug window
            //System.Diagnostics.Debug.WriteLine(result);
            Assert.That(result[0].DurationInYears,Is.EqualTo(3));
        }

    }


}
}
