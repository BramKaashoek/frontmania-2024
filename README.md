prep:

- have k6 folder available
- have `pnpm i -g k6`

steps:

- `npx create-next-app@latest` # name: frontmania-demo, rest all defaults
- <explanation>

- `git clone git@github.com:vercel/opentelemetry-collector-dev-setup.git`
- `cd opentelemetry-collector-dev-setup`
- `docker compose up -d`
- <explanation>

- `cd ../frontmania-demo`
- `pnpm i @vercel/otel @opentelemetry/sdk-logs @opentelemetry/api-logs @opentelemetry/instrumentation`
- create file `instrumentation.ts` and add

```ts
import { registerOTel } from '@vercel/otel';

export async function register() {
  registerOTel({
    serviceName: 'next-server',
  });
}
```

- `pnpm dev`
- <explanation>

- `k6 ../k6/load.js`
- <explanation>

- visit http://localhost:16686
- select service `next-server`
- <explanation>
- make page.tsx function async and add

```ts
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
-(<explanation>await sleep(Math.random() * 1000));
```

- add span by doing `pnpm i @opentelementry/api` and changin to

```ts
await trace.startActiveSpan('sleep', async (span) => {
  await sleep(Math.random() * 1000);
  span.end();
});
```

- <explanation>

- docker signoz `cd signoz/deploy && docker compose -f docker/clickhouse-setup/docker-compose.yaml up -d`


-
```sh
docker run --rm --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one
```



