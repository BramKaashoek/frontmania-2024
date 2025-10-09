// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import { NodeSDK } from '@opentelemetry/sdk-node';

// const sdk = new NodeSDK({
//     instrumentations: [getNodeAutoInstrumentations()],
//     serviceName: 'express-api',
// });

// sdk.start();

require('./server.ts');