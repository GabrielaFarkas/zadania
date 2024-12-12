import { test, expect } from '@playwright/test';

test.describe('GET-List of users test', () => {
    test('GET request- List of users, verify data', async ({ request }) => {
        const response = await request.get(
            'https://reqres.in/api/users?page=2'
        );
        expect(response.status()).toEqual(200);

        const responseData = await response.json();

        expect(responseData.total).toEqual(12);
        expect(responseData.data[0].last_name).toEqual('Lawson');
        expect(responseData.data[1].last_name).toEqual('Ferguson');
    });

    test('GET request-Count of number of received users in data', async ({
        request,
    }) => {
        const response1 = await request.get(
            'https://reqres.in/api/users?page=1'
        );
        expect(response1.status()).toEqual(200);
        const responseData1 = await response1.json();

        const response2 = await request.get(
            'https://reqres.in/api/users?page=2'
        );
        expect(response2.status()).toEqual(200);
        const responseData2 = await response2.json();
        const dataTotal = responseData1.data.length + responseData2.data.length;
        expect(responseData2.total).toEqual(dataTotal);
    });

    test('GET request- List of users, verify if all users have all requiered data defined', async ({
        request,
    }) => {
        const response = await request.get(
            'https://reqres.in/api/users?page=2'
        );
        expect(response.status()).toEqual(200);

        const responseData = await response.json();
        responseData.data.forEach((element) => {
            expect(element.id).toBeDefined();
            expect(element.email).toBeDefined();
            expect(element.first_name).toBeDefined();
            expect(element.last_name).toBeDefined();
            expect(element.avatar).toBeDefined();

            //Data types validation
            expect(typeof element.id).toBe('number'); 
            expect(typeof element.email).toBe('string'); 
            expect(typeof element.first_name).toBe('string'); 
            expect(typeof element.last_name).toBe('string');
            expect(typeof element.avatar).toBe('string');

            // Avatar url validation
            const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
            expect(urlPattern.test(element.avatar)).toBe(true);
        });
    });
});
