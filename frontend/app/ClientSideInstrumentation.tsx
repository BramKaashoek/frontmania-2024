'use client';

import {
  HoneycombWebSDK,
  WebVitalsInstrumentation,
} from '@honeycombio/opentelemetry-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { useEffect } from 'react';

const startClientSideInstrumentation = () => {
  const sdk = new HoneycombWebSDK({
    apiKey: process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY,
    serviceName: 'next-client',
    sampleRate: 1,
    instrumentations: [
      getWebAutoInstrumentations(),
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
