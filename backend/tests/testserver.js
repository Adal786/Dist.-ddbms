const request = require('supertest');
const app = require('../src/server');

describe('GET /greet', () => {
  test('should respond with "Hello, World!"', async () => {
    const response = await request(app).get('/greet');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});
