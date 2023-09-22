using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using Moq;
using LMS.Models;
using LMS.Data;

namespace Test
{
    public class EmployeeProvidersTest {
        
        //private List<LoanCardMaster> sampleLoans;
        private List<ItemMaster> sampleItems;
        //IQueryable<LoanCardMaster> loanData;
        IQueryable<ItemMaster> itemData;
        //Mock<DbSet<LoanCardMaster>> mockSet;
        Mock<DbSet<ItemMaster>> mockSet;
        Mock<GisdbContext> mockAPIContext;
        EmployeeProvider empRepo;

        [SetUp]
        public void Setup()
        {
            sampleItems = new List<ItemMaster>() { new ItemMaster { ItemId="I0001", ItemCategory="Furniture", IssueStatus="Y", ItemDescription="Table", ItemMake="Wood", ItemValuation=5000 } };
            //loanData = sampleLoans.AsQueryable();
            itemData=sampleItems.AsQueryable();
            mockSet = new Mock<DbSet<ItemMaster>>();
            mockSet.As<IQueryable<ItemMaster>>().Setup(m => m.Provider).Returns(itemData.Provider);
            mockSet.As<IQueryable<ItemMaster>>().Setup(m => m.Expression).Returns(itemData.Expression);
            mockSet.As<IQueryable<ItemMaster>>().Setup(m => m.ElementType).Returns(itemData.ElementType);
            mockSet.As<IQueryable<ItemMaster>>().Setup(m => m.GetEnumerator()).Returns(itemData.GetEnumerator());
            var p = new DbContextOptions<GisdbContext>();
            mockAPIContext = new Mock<GisdbContext>(p);
            mockAPIContext.Setup(x => x.ItemMasters).Returns(mockSet.Object);
            empRepo = new EmployeeProvider(mockAPIContext.Object);

        }

       /* [Test]

        public void GetLoanDeatilsById_Test()
        {
            List<LoanViewModel> res = empRepo.GetLoanDeatilsById("L0001");
            Assert.That(res[0].DurationInYears, Is.EqualTo(3));
        }*/

        [Test]

        public void GetItemsList_Test()
        {
            List<ItemMaster> res = empRepo.GetItemsList();
            Assert.That(res[0].ItemValuation, Is.EqualTo(5000));
        }
    }
}
