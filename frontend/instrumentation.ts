import { registerOTel } from '@vercel/otel';

process.env.OTEL_EXPORTER_OTLP_ENDPOINT = 'https://api.honeycomb.io';
process.env.OTEL_EXPORTER_OTLP_HEADERS = `x-honeycomb-team=${process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY}`;

export async function register() {
  registerOTel({
    serviceName: 'next-server',
  });
}
