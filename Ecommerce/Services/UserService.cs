using Ecommerce.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Ecommerce.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;
        public UserService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _users = database.GetCollection<User>("Users");
        }
        public async Task CreateUser(User user)
        {
            await _users.InsertOneAsync(user);
        }
        public async Task<User> GetUser(string username, string password)
        {
            return await _users.Find(u => u.Name == username && u.Password == password).FirstOrDefaultAsync();
        }
        public async Task<List<User>> GetUsers()
        {
            return await _users.Find(u => true).ToListAsync();
        }


    }
}
