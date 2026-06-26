import { test, expect } from '@playwright/test';

declare const process: { env: { [key: string]: string | undefined } };

const BASE_URL = 'https://reqres.in';

/**
 * ReqRes now requires an API key on every request.
 * If REQRES_API_KEY is not provided, we fall back to the shared demo key so the suite can run locally.
 */
const API_KEY = process.env.REQRES_API_KEY ?? 'free_user_3FfrhuCdoIOuAZa2CEnGyxgRUHK';

// Shared headers for all ReqRes requests
const reqresHeaders = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

test.beforeAll(() => {
  if (!process.env.REQRES_API_KEY) {
    console.warn('REQRES_API_KEY not set; using the built-in demo key for local execution.');
  }
});

test.describe('ReqRes API — Users', () => {
  test('GET /api/users?page=2 returns 200 with a valid data array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/users?page=2`, {
      headers: reqresHeaders,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Top-level "data" key must be an array
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    // Every user object must have the required fields
    for (const user of body.data) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
    }
  });

  test('POST /api/users returns 201 and echoes name, job, id, and createdAt', async ({
    request,
  }) => {
    const payload = { name: 'morpheus', job: 'leader' };

    const response = await request.post(`${BASE_URL}/api/users`, {
      data: payload,
      headers: reqresHeaders,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    // Echo of submitted fields
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);

    // Server-generated fields
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');

    // createdAt should be a parseable ISO date string
    expect(new Date(body.createdAt).toString()).not.toBe('Invalid Date');
  });

  test('BONUS — create-then-verify flow structure (reqres does not persist data)', async ({
    request,
  }) => {
    // Step 1: Create a new user
    const createResponse = await request.post(`${BASE_URL}/api/users`, {
      data: { name: 'trinity', job: 'operator' },
      headers: reqresHeaders,
    });
    expect(createResponse.status()).toBe(201);

    const created = await createResponse.json();
    const createdId = created.id;

    // Step 2: Demonstrate how we would structure a follow-up assertion.
    // reqres does not persist data, so we assert on what was returned at creation time
    // rather than re-fetching. In a real API this would be:
    //   const getResponse = await request.get(`${BASE_URL}/api/users/${createdId}`, { headers: reqresHeaders });
    //   expect(getResponse.status()).toBe(200);
    //   const fetched = await getResponse.json();
    //   expect(fetched.data.id).toBe(Number(createdId));

    // Verify the structure we would assert on after a real GET:
    expect(typeof createdId).toBe('string');
    expect(created.name).toBe('trinity');
    expect(created.job).toBe('operator');
  });
});
