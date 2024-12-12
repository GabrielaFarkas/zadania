import { test, expect } from '@playwright/test';
import Joi from 'joi';

const fs = require('fs');
const testData = JSON.parse(fs.readFileSync('./mocks/testData.json', 'utf8'));

const responseSchema = Joi.object({
    name: Joi.string().required(),
    job: Joi.string().required(),
    id: Joi.string().required(),
    createdAt: Joi.string().isoDate().required(),
});

test.describe('POST- Create users test', () => {
    test('POST request- create user, verify response data and response schema and time less than given limit', async ({
        request,
    }) => {
        const response = await request.post('https://reqres.in/api/users', {
            data: testData,
        });

        const limit = 100;
        const startTime = Date.now();

        expect(response.status()).toEqual(201);
        const responseTime = Date.now() - startTime;

        expect(responseTime).toBeLessThan(limit);

        const responseData = await response.json();

        const { error } = responseSchema.validate(responseData);
        expect(error).toBeFalsy();
    });
});
