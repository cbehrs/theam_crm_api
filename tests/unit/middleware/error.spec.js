const error = require('../../../middleware/error');

describe('error middleware', () => {
    let req, res;

    const next = jest.fn()

    beforeEach(() => {
        req = {
            params: {},
            body: {}
        }

        res = {
            text: null,
            status: null,
            status(status) {
                this.status = status 
                return this
            },
            send(payload) {
                this.text = payload
            }
        }
    });

    it('should handle any error', () => {
        error(new Error(), req, res, next)

        expect(res.status).toBe(500)
        expect(res.text).toBe('Something failed!')
    })
});