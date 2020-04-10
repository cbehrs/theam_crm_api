const { User } = require('../../models/user');
const request = require('supertest');

describe('admin middleware', () => {

    let token;
    let isAdmin = false;

    beforeEach(() => {
        token = new User({ isAdmin }).generateAuthToken();
        server = require('../../index');
    });
    afterEach(async () => {
        await User.remove({});
        await server.close();
    });

    const exec = () => {
        return request(server)
            .get('/api/users')
            .set('x-auth-token', token)
            .send({
                isAdmin
            });
    }

    it('should return 403 if user is not admin', async function () {
        isAdmin = false;

        const res = await exec();

        expect(res.status).toBe(403);
    });
});