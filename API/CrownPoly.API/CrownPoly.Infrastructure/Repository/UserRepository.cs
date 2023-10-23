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
using static Dapper.SqlMapper;

namespace CrownPoly.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;
        public UserRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<int> AddAsync(User entity)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@FirstName", entity.FirstName);
            parameters.Add("@LastName", entity.LastName);
            parameters.Add("@Pin", entity.Pin);
            parameters.Add("@IsSuper", entity.IsSuper);

            var affectedRows = await dbConnection.ExecuteAsync("usp_AddUser", parameters, commandType: CommandType.StoredProcedure);

            return affectedRows;
        }

        public async Task<int> DeleteAsync(int id)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", id);

            var affectedRows = await dbConnection.ExecuteAsync("sp_DeleteUser", parameters, commandType: CommandType.StoredProcedure);

            return affectedRows;
        }

        public async Task<IReadOnlyList<User>> GetAllAsync()
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var users = await dbConnection.QueryAsync<User>("sp_GetAllUsers", commandType: CommandType.StoredProcedure);

            return users.ToList();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", id);

            var users = await dbConnection.QueryAsync<User>("sp_GetAllUsers", parameters, commandType: CommandType.StoredProcedure);

            return users.FirstOrDefault();
        }

        public async Task<int> UpdateAsync(User entity)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@FirstName", entity.FirstName);
            parameters.Add("@LastName", entity.LastName);
            parameters.Add("@Pin", entity.Pin);
            parameters.Add("@IsSuper", entity.IsSuper);
            parameters.Add("@UserID", entity.UserID);
            parameters.Add("@IsActive", entity.IsActive);

            var affectedRows = await dbConnection.ExecuteAsync("sp_UpdateUser", parameters, commandType: CommandType.StoredProcedure);

            return affectedRows;
        }

        public async Task<User> Login(User entity)
        {
            using IDbConnection dbConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

            var parameters = new DynamicParameters();
            parameters.Add("@firstName", entity.FirstName);
            parameters.Add("@Pin", entity.Pin);

            var user = await dbConnection.QueryFirstOrDefaultAsync<User>("sp_LoginUser", parameters, commandType: CommandType.StoredProcedure);
            if (user != null)
            {
                return user; 
            }

            return null; 
        }
    }
}
