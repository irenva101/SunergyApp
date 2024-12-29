using Microsoft.IdentityModel.Tokens;
using Sunergy.Shared.DTOs.User.DataOut;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace Sunergy.WebApp.Helper
{
    public class JwtManager
    {
        private static string Secret = "jgkfdgj8fgu9f8gh9rujgdjg9f0g9dfjgjggjgjg9000";
        public static string GetToken(UserDto user, int expireMinutes = 1440)
        {
            // symmetric security key
            var symemtricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim("email", user.Email),
                    new Claim("role", user.Role.ToString()),
                    new Claim("firstName", user.FirstName),
                    new Claim("lastName", user.LastName),
                }),

                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(expireMinutes)),

                SigningCredentials = new SigningCredentials(symemtricSecurityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var jwtHander = new JwtSecurityTokenHandler();
            var token = jwtHander.CreateToken(tokenDescriptor);

            // return token
            return jwtHander.WriteToken(token);
        }
        public static TokenValidationParameters GetTokenValidationParameters()
        {
            return new TokenValidationParameters
            {
                // what to validate
                RequireExpirationTime = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                // setup validate data
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret)),
                ClockSkew = TimeSpan.Zero,
                ValidateLifetime = true
            };
        }
        public static ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                if (jwtToken == null)
                    return null;

                var symmetricKey = Convert.FromBase64String(Secret);

                var principal = tokenHandler.ValidateToken(token, GetTokenValidationParameters(), out _);

                return principal;
            }

            catch (Exception e)
            {
                return null;
            }
        }
    }
}
