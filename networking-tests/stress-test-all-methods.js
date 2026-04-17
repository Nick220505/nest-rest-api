import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '20s', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: '20s', target: 200 }, // stay at higher 200 users for 30 minutes
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
};

const BASE_URL = 'http://172.19.92.153:8080';

export default () => {
  const itemsUrl = `${BASE_URL}/items`;

  const jsonHeaders = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const createPayload = JSON.stringify({
    name: `item-${__VU}-${__ITER}`,
    description: 'Item created by k6',
    quantity: 1,
  });

  // GET /
  http.get(`${BASE_URL}`);

  // GET /items
  http.get(itemsUrl);

  // POST /items
  const createRes = http.post(itemsUrl, createPayload, jsonHeaders);
  let itemId = '';

  try {
    const createdItem = createRes.json();
    itemId = createdItem?._id || createdItem?.id || '';
  } catch (_) {
    itemId = '';
  }

  if (itemId) {
    // GET /items/:id
    http.get(`${itemsUrl}/${itemId}`);

    // PUT /items/:id
    const updatePayload = JSON.stringify({
      name: `updated-item-${__VU}-${__ITER}`,
      description: 'Item updated by k6',
      quantity: 2,
    });
    http.put(`${itemsUrl}/${itemId}`, updatePayload, jsonHeaders);

    // DELETE /items/:id
    http.del(`${itemsUrl}/${itemId}`);
  }

  // HEAD /items
  http.head(itemsUrl);

  // OPTIONS /items
  http.options(itemsUrl, null, jsonHeaders);

  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};