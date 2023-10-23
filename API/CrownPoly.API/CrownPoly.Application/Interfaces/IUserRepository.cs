using CrownPoly.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrownPoly.Application.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> Login(User entity);
    }
}
