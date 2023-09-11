using LMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using LMS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly EmployeeDataProvider _employeeDataProvider;


        public LoginController(IConfiguration config, EmployeeDataProvider employeeDataProvider)
        {
            _config = config;
            _employeeDataProvider = employeeDataProvider;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(EmployeeViewModel login)
        {
            IActionResult response = Unauthorized();
            var employee = AuthenticateEmployee(login);

            if (employee != null)
            {
                var tokenString = GenerateJSONWebToken(employee);

                response = Ok(new LoginResponse { token = tokenString, User_Id = login.Username, Role=employee.EmployeeRole });
            }

            return response;
        }

        private string GenerateJSONWebToken(EmployeeCredential employeeInfo)
        {

            if (employeeInfo is null)
            {
                throw new ArgumentNullException(nameof(employeeInfo));
            }
            List<Claim> claims = new List<Claim>();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            claims.Add(new Claim("Username", employeeInfo.EmployeeId));
            if (employeeInfo.EmployeeRole.Equals("admin"))
            {
                claims.Add(new Claim("role", "admin"));
            }
            else
            {
                claims.Add(new Claim("role", "customer"));

            }
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(2),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private EmployeeCredential AuthenticateEmployee(EmployeeViewModel login)
        {
            EmployeeCredential employee = _employeeDataProvider.GetEmployeeDetail(login);
            return employee;
        }
    }
}
