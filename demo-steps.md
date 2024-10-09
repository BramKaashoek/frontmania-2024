# demo

## prep

### terminal

- pane with fe
- pane with backend
- pane with k6
- pane with jaeger

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

### browser

- tab with frontend
- tab with jaeger
- tab with honeycomb

### stage

- pointer
- bottle on the floor

## otel lines

Otel is a suite of tools/standards and SDK's that enables developers to monitor their projects​

OpenTelemetry tracks a series of events (trace) and produces details about each event (span)

## introduce app

- fruitle, sell fruits
- home page and PDP
- (slide) there is a frontend and a backend
- i'm a frontend dev

## first issue (slow fetch)

- show sales guy slide
- state that its impossible to tell what causes the issues right now
- state that we've all been there and started clicking through the site to find issues
- show otel FE slide
- add otel
- explain what @vercel/otel does

```javascript
// src/instrumentation.ts
import { registerOTel } from '@vercel/otel';

export async function register() {
  registerOTel({
    serviceName: 'next-server',
  });
}
```

- restart frontend
- open jaeger
- look into a slow trace
- look into span
- call backender
- put on backend hat
- add backend tracing

```javascript
// src/index.ts
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK } from '@opentelemetry/sdk-node';

const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: 'express-api',
});

sdk.start();

require('.');
```

- add span around db call

```javascript
// src/routes/fruit.ts
import { trace } from '@opentelemetry/api';
// ...
const fruit = await trace
  .getTracer('express-api')
  .startActiveSpan(`db-get-fruit`, async (span) => {
    span.setAttribute('fruit', slug);
    const fruit = await db.getFruit(slug);
    span.end();
    return fruit;
  });
```

- show the sleep
- show traces in jaeger
- bring back the sleep
- show jaeger again
- take off backend hat
- close up first issue by making a reference to the sales guy

## intermezzo: honeycomb

- send traces to honeycomb
- introduce honeycomb
- copy files over from honeycomb folders
- introduce querying / binning (use slide)
- show cherry example in honeycomb (VISUALIZE AVG(duratiom ms), WHERE(http.url exists), GROUPBY (http.url))

## second issue (bad LCP)

- (have someone in audience run playwright)
- show sales guy slide
- explain how core web vitals affect page ranking in google
- explain core web vitals
- show core web vitals instrumentation component
- add core web vital instrumentation component to layout component
- do the query for LCP
- do not use slow image for LCP
- show fixed LCP in honeycomb

## third issue (high CLS)

- show slide
- (have someone in audience run playwright)
- explain how this is based on an actual real life scenario
- do the queries
- show the CLS issue on the PDP
- fix styling by adding `fixed` to the classname
