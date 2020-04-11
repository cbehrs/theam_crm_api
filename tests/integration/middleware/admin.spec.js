const { User } = require('../../../models/user');
const request = require('supertest');

describe('admin middleware', () => {
    
    let user;
    let token;
    
    beforeEach(() => {
        server = require('../../../index');
    });
    
    const exec = () => {
        return request(server)
            .get('/api/users')
            .set('x-auth-token', token)
            .send();
    }

    beforeEach(() => {
        user = new User({ isAdmin: true });
        token = user.generateAuthToken();
    });
    afterEach(async () => {
        await server.close();
        await User.remove({});;
    });


    it('should return 403 if user is not admin', async function () {
        user = new User({ isAdmin: false });
        token = user.generateAuthToken();
        
        const res = await exec();
        
        expect(res.status).toBe(403);
        expect(res.text).toBe('Access denied!');
    });

    it('should return 200 if user is an admin', async function () {
        const res = await exec();
        
        expect(res.status).toBe(200);
    });
});