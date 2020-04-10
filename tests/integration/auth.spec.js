const {User} = require('../../models/user');
const request = require('supertest');

describe('auth middleware', () => {
  let token; 
  
  beforeEach(() => { 
    token = new User({isAdmin: true }).generateAuthToken();
    server = require('../../index');
  });
  afterEach(async () => { 
    await User.remove({});
    await server.close(); 
  });


  const exec = () => {
    return request(server)
      .post('/api/users')
      .set('x-auth-token', token)
      .send({ 
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '12345',
        isAdmin: true 
      });
  }

  it('should return 401 if no token is provided', async () => {
    token = ''; 

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a'; 

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});