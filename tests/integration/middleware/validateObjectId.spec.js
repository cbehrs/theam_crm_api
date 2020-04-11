const request = require('supertest');
const { Customer } = require('../../../models/customer');
const { User } = require('../../../models/user');

describe('validateObjectId middleware', () => {

    let customer, token;
    const user = new User();
    
    beforeEach(async () => {
        server = require('../../../index');
        token = user.generateAuthToken();
        customer = new Customer({
            name: 'Customer',
            surname: 'customer'
        });
        await customer.save();
    });
    afterEach(async () => {
        await Customer.remove({});
        await server.close();
    });


    const exec = () => {
        return request(server)
            .get(`/api/customers/${customer._id}`)
            .set('x-auth-token', token)
            .send();
    }

    it('should return 404 if id is invalid', async () =>{
        customer = {
            _id: 'a'
        };
        const res = await exec();

        expect(res.status).toBe(404);
        expect(res.text).toBe('Invalid ID!');
    });

    it('should return 200 if id is valid', async () =>{
        const res = await exec();

        expect(res.status).toBe(200);

    });

})