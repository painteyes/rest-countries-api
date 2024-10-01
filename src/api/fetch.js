export const mockFetch = (url, options) => {
    return new Promise((resolve, reject) => {
        let requestBody;
        if (options?.body) {
            requestBody = JSON.parse(options.body);
        }

        const responses = {
            '/api/login': {
                method: 'POST',
                response: { id: 1, name: 'John Doe', email: requestBody?.username, phone: '' }, 
            },
            '/api/logout': {
                method: 'POST',
                response: { ok: true }, // Simulate a logout response
            },
            '/api/register': {
                method: 'POST',
                response: { id: 1, email: requestBody?.username },
            },
        };

        const endpoint = Object.keys(responses).find((key) => url === key && options.method === responses[key].method);

        if (endpoint) {
            resolve({
                ok: true,
                json: async () => responses[endpoint].response,
            });
        } else {
            reject({ ok: false });
        }
    });
};
