const request = require('supertest');
const { User } = require('../../../models/user');

describe('validate middleware', () => {
    let token, isAdmin;
    let user;
    
    beforeEach(async () => {
        server = require('../../../index');
        user = new User({
            name: 'Customer',
            email: 'customer@gmail.com',
            password: '12345',
            isAdmin: true 
        });
        token = user.generateAuthToken();
        await user.save();
    });
    afterEach(async () => {
        await User.remove({});
        await server.close();
    });


    const exec = () => {
        return request(server)
            .put(`/api/users/${user._id}`)
            .set('x-auth-token', token)
            .send({
                name: 'Customer',
                email: 'customer@gmail.com',
                password: '12345',
                isAdmin
            });
    }

    it('should return 400 if validator function throws an error', async () => {
        isAdmin = 'Force error';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if validator passes', async () => {
        isAdmin = true;
        
        const res = await exec();

        expect(res.status).toBe(200);
    });
});