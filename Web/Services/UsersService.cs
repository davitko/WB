using System;
using System.Collections.Generic;
using System.Linq;
using Web.Models;
using Web.Helpers;

namespace Web.Services
{
    public class UsersService : IUsersService
    {
        public User[] GetAll()
        {
            return Users.ToArray();
        }

        public User Get(Guid uniqueId)
        {
            return Users.FirstOrDefault(i => i.UniqueId == uniqueId);
        }

        public Guid Create(User user)
        {
            user.UniqueId = Guid.NewGuid();
            user.CreateDate = user.ModifiedDate = DateTime.Now.ToJavaScriptMilliseconds();
            Users.Add(user);
            return user.UniqueId;
        }

        public void Update(Guid uniqueId, User user)
        {
            var userToUpdate = Users.FirstOrDefault(i => i.UniqueId == uniqueId);
            if (userToUpdate == null) return;
            userToUpdate.FirstName = user.FirstName ?? userToUpdate.FirstName;
            userToUpdate.LastName = user.LastName ?? userToUpdate.LastName;
            userToUpdate.Password = user.Password ?? userToUpdate.Password;
            userToUpdate.Roles = user.Roles ?? userToUpdate.Roles;
            userToUpdate.TimezoneOffset = user.TimezoneOffset;
            userToUpdate.TwitterUsername = user.TwitterUsername ?? userToUpdate.TwitterUsername;
            userToUpdate.SocialNetworks = user.SocialNetworks ?? userToUpdate.SocialNetworks;
            userToUpdate.ModifiedDate = DateTime.Now.ToJavaScriptMilliseconds();
        }

        public void Delete(Guid uniqueId)
        {
            var userToDelete = Users.FirstOrDefault(i => i.UniqueId == uniqueId);
            if (userToDelete != null)
            {
                Users.Remove(userToDelete);
            }
        }

        public bool EmailIsInUse(string email)
        {
            return Users.Any(i => i.Email == email);
        }

        static readonly List<User> Users = new List<User> { 
            new User {
                UniqueId = new Guid("4eb38ee1b9e1490199d952f9895c5ae1"),
                Email = "admin@test.com",
                FirstName = "Wraith",
                LastName = "Administrator",
                Password = "123456",
                Roles = new[] { "Administrator" },
                TimezoneOffset = -8,
                TwitterUsername = "wraithblog",
                CreateDate = 1413656047695,
                ModifiedDate = 1413656047695,
                SocialNetworks = new Dictionary<string,string> { 
                    { "instagram", "wraithblogpics" },
                    { "facebook", "wraithblogpage" }
                }
            }, 
            new User {
                UniqueId = new Guid("cc08c0aa11ea4327a3c2fb1dc78670e3"),
                Email = "milos.davitkovic@gmail.com",
                FirstName = "Milos",
                LastName = "Davitkovic",
                Password = "davitko",
                Roles = new[] { "Administrator" },
                TimezoneOffset = -11,
                TwitterUsername = "davitko",
                CreateDate = 1413657241168,
                ModifiedDate = 1413657241168,
                SocialNetworks = new Dictionary<string,string> { 
                    { "instagram", "davitko" },
                    { "facebook", "milos.davitkovic" }
                }
            }, 
            new User {
                UniqueId = new Guid("fc916cc981c3457a8b6d4aa8579bfa00"),
                Email = "john.stroux@lanceict.com",
                FirstName = "John",
                LastName = "Stroux",
                Password = "john.stroux",
                Roles = new[] { "Administrator" },
                TimezoneOffset = -11,
                TwitterUsername = "maryeditor",
                CreateDate = 1413657340027,
                ModifiedDate = 1413657340027,
                SocialNetworks = new Dictionary<string,string> { 
                    { "facebook", "marythecorrector" }
                }
            }
        };
    }
}