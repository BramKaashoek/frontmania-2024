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
