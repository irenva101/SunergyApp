﻿using Sunergy.Shared.Constants;

namespace Sunergy.Shared.DTOs.User.DataIn
{
    public class RegisterDataIn
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Role Role { get; set; }
    }
}
