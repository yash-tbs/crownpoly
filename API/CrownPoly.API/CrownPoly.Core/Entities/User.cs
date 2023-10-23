using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrownPoly.Core.Entities
{
    public class User
    {
        public int UserID { get; set; }
        public string FirstName { get; set; } =string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Pin { get; set; } = string.Empty;
        public bool IsSuper { get; set; }
        public bool IsActive { get; set; }
    }

    public class UserLogin
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Pin { get; set; }=string.Empty;
    }


}
