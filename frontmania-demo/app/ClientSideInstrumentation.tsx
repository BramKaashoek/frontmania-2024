'use client';

import {
  HoneycombWebSDK,
  WebVitalsInstrumentation,
} from '@honeycombio/opentelemetry-web';
import { useEffect } from 'react';

const startClientSideInstrumentation = () => {
  const sdk = new HoneycombWebSDK({
    endpoint: 'http://localhost:4318/jaeger',
    serviceName: 'next-client',
    sampleRate: 1,
    instrumentations: [
      new WebVitalsInstrumentation({
        vitalsToTrack: ['LCP', 'CLS', 'INP', 'FCP', 'TTFB'],
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
