using CrownPoly.Application.Interfaces;
using CrownPoly.Core.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrownPoly.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;
        public UserRepository(IConfiguration configuration)
        {
            _configuration= configuration;
        }
        public async Task<int> AddAsync(User entity)
        {
            throw new NotImplementedException();
        }

        public async Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyList<User>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("YourDatabaseConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", id);

            var users = await dbConnection.QueryAsync<User>("sp_GetUserById", parameters, commandType: CommandType.StoredProcedure);

            return users.SingleOrDefault();
        }

        public async Task<int> UpdateAsync(User entity)
        {
            throw new NotImplementedException();
        }
    }
}
