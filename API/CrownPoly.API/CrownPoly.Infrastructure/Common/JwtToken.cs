using CrownPoly.Core.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class JwtToken
{
    private readonly IConfiguration _configuration;

    public JwtToken(IConfiguration configuration)
    {
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    public string GenerateJwtToken(User userLogin)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, userLogin.FirstName),
                new Claim(ClaimTypes.GivenName, userLogin.LastName),
                new Claim(ClaimTypes.Role, userLogin.IsSuper ? "SuperUser" : "RegularUser"),
                new Claim(JwtRegisteredClaimNames.Aud, _configuration["Jwt:Audience"] ?? ""),
                new Claim(JwtRegisteredClaimNames.Iss, _configuration["Jwt:Issuer"] ?? "")
            }),
            Expires = DateTime.UtcNow.AddMinutes(int.TryParse(_configuration["Jwt:ExpireMinutes"], out var expireMinutes)? expireMinutes: 0),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);
        return tokenString;
    }
}
