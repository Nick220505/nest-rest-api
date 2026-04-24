import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Key configurations for breakpoint in this section
  executor: 'ramping-arrival-rate', //Assure load increase if the system slows
  stages: [
    { duration: '2h', target: 20000 }, // just slowly ramp-up to a HUGE load
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
  const getHome = http.get(`${BASE_URL}`);
  check(getHome, { 'GET / status 200': (r) => r.status === 200 });

  // GET /items
  const getItems = http.get(itemsUrl);
  check(getItems, { 'GET /items status 200': (r) => r.status === 200 });

  // POST /items
  const createRes = http.post(itemsUrl, createPayload, jsonHeaders);
  check(createRes, { 'POST /items status 201': (r) => r.status === 201 });
  
  let itemId = '';

  try {
    const createdItem = createRes.json();
    itemId = createdItem?._id || createdItem?.id || '';
  } catch (_) {
    itemId = '';
  }

  if (itemId) {
    // GET /items/:id
    const getItem = http.get(`${itemsUrl}/${itemId}`);
    check(getItem, { 'GET /items/:id status 200': (r) => r.status === 200 });

    // PUT /items/:id
    const updatePayload = JSON.stringify({
      name: `updated-item-${__VU}-${__ITER}`,
      description: 'Item updated by k6',
      quantity: 2,
    });
    const updateRes = http.put(`${itemsUrl}/${itemId}`, updatePayload, jsonHeaders);
    check(updateRes, { 'PUT /items/:id status 200': (r) => r.status === 200 });

    // DELETE /items/:id
    const deleteRes = http.del(`${itemsUrl}/${itemId}`);
    check(deleteRes, { 'DELETE /items/:id status 200': (r) => r.status === 200 });
  }

  // HEAD /items
  const headItems = http.head(itemsUrl);
  check(headItems, { 'HEAD /items status 200': (r) => r.status === 200 });

  // OPTIONS /items
  const optionsItems = http.options(itemsUrl, null, jsonHeaders);
  check(optionsItems, { 'OPTIONS /items status 200': (r) => r.status === 200 });

  sleep(1);
};
