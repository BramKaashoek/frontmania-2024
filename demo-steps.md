# demo

## introduce app

- fruitle, sell fruits
- home page and PDP
- i'm a frontend dev
- there is a backend which supplies some data

## first issue (slow fetch)

- show sales guy slide
- state that its impossible to tell what causes the issues right now
- state that we've all been there and started clicking through the site to find issues
- add otel

```javascript
// src/instrumentation.ts
import { registerOTel } from '@vercel/otel';

export async function register() {
  registerOTel({
    serviceName: 'next-server',
  });
}
```

- run k6
- open jaeger
- look into a slow trace
- add span around fetch

```javascript
// src/app/[slug]/page.tsx
const fruit = await trace
.getTracer('nextjs-example')
.startActiveSpan(`fetch-fruit`, async (span) => {
    span.setAttribute('fruit', slug);
    const data = await fetch(`http://localhost:4000/fruit/${slug}`, {
    cache: 'no-store',
    });
    const fruit = await data.json();
    span.end();
    return fruit as Fruit;
});

```

- look into span
- call backender
- put on backend hat
- add backend tracing

```javascript
// src/otel.ts
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK } from '@opentelemetry/sdk-node';

const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: 'express-api',
});

sdk.start();

require('.');
```

- fix the sleep
- show traces in jaeger
- take off backend hat
- show slide with rest header
- close up first issue by making a reference to the sales guy

## second issue (bad LCP)

- show slide
- (have someone in audience run playwright)
- explain how core web vitals affect page ranking in google
- explain core web vitals
- add core web vital instrumentation
```javascript
// frontend/app/ClientSideInstrumentation.tsx
"use client";

import {
  HoneycombWebSDK,
  WebVitalsInstrumentation,
} from "@honeycombio/opentelemetry-web";
import { useEffect } from "react";

const startClientSideInstrumentation = () => {
  const sdk = new HoneycombWebSDK({
    apiKey: process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY,
    serviceName: "next-client",
    sampleRate: 1,
    instrumentations: [
      new WebVitalsInstrumentation({
        vitalsToTrack: ["LCP", "CLS", "INP", "FCP", "TTFB"],
        cls: {
          reportAllChanges: true,
          applyCustomAttributes: (attributes) => {
            return attributes;
          },
        },
      }),
    ],
    skipOptionsValidation: true,
  });

  sdk.start();
  return sdk;
};

export const ClientSideInstrumentation = () => {
  useEffect(() => {
    const sdk = startClientSideInstrumentation();
    return () => {
      sdk?.shutdown();
    };
  }, []);
  return null;
};

```
- send traces to honeycomb

```javascript
// frontend/instrumentation.ts
import { registerOTel } from '@vercel/otel';

process.env.OTEL_EXPORTER_OTLP_ENDPOINT = 'https://api.honeycomb.io';
process.env.OTEL_EXPORTER_OTLP_HEADERS = `x-honeycomb-team=${process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY}`;

export async function register() {
  registerOTel({
    serviceName: 'next-server',
  });
}
```

```javascript
// backend/src/otel.ts
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';

const exporterOptions = {
  url: 'https://api.honeycomb.io/v1/traces',
  headers: {
    'X-Honeycomb-Team': process.env.HONEYCOMB_API_KEY,
  },
};

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: 'express-api',
});

sdk.start();

require('.');
```

- introduce honeycomb
- introduce querying / binning (use slide)
- explore new traces a little bit
- do the query for LCP
- show the slow image on PDP
- do not use slow image for LCP
- show fixed LCP in honeycomb

## third issue (high CLS)

- show slide
- (have someone in audience run playwright)
- explain how this is based on an actual real life scenario
- do the queries
- show the CLS issue on the PDP
- fix styling by adding `fixed` to the classname
