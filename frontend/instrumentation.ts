import { registerOTel } from '@vercel/otel';

process.env.OTEL_EXPORTER_OTLP_ENDPOINT = 'https://api.honeycomb.io';
process.env.OTEL_EXPORTER_OTLP_HEADERS =
  'x-honeycomb-team=BwCgyLSabcF8PTviSe80FG';
// process.env.OTEL_EXPORTER_OTLP_PROTOCOL = 'http/protobuf;';

console.log(process.env.OTEL_EXPORTER_OTLP_ENDPOINT);

export async function register() {
  registerOTel({
    serviceName: 'next-server',
  });
}
