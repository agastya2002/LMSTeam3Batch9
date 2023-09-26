using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using Moq;
using LMS.Models;
using LMS.Data;
using Microsoft.AspNetCore.Cors.Infrastructure;
using LMS.Services;

namespace Test
{
    public class EmployeeServicesTest {

        //private Mock<IEmployeeProvider> EmpRepoObj;

        private AdminService adminService;

        private readonly List<ItemMaster> items = new (){
            new ItemMaster { ItemId="I0001", ItemCategory="Furniture", IssueStatus="Y", ItemDescription="Table", ItemMake="Wood", ItemValuation=5000 }
    };
        private Mock<IEmployeeProvider> EmpRepoObj;

        [SetUp]
        public void Setup()
        {
            EmpRepoObj=new Mock<IEmployeeProvider>();
            EmpRepoObj.Setup(x => x.GetItemsList()).Returns(items);
        }


        [Test]
        public void GetItemsListTest()
        {
            adminService = new AdminService(EmpRepoObj.Object);
            var result = adminService.GetItems();
            // To print something to debug window
            //System.Diagnostics.Debug.WriteLine(result);
            Assert.That(result[0].ItemValuation,Is.EqualTo(5000));
        }

    }


}

