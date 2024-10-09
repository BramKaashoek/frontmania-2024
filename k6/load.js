import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, group } from 'k6';
import http from 'k6/http';

const PAGES = ['/', , '/banana', '/apple', '/cherry'];
const TARGET_RATE = 5;

export const options = {
  scenarios: {
    pages: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      stages: [
        { target: TARGET_RATE, duration: '1s' },
        { target: TARGET_RATE, duration: '45m' },
        { target: 1, duration: '3m' },
      ],
    },
  },
};

export default function (data) {
  group('Load', function () {
    const page = randomItem(PAGES);

    const res = http.get(`http://localhost:3000${page}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'accept-encoding': 'gzip',
      },
    });

    check(res, { 'status was 200': (r) => r.status === 200 });
  });
}
