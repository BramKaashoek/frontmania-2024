import { trace } from '@opentelemetry/api';

export default async function Home() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await trace
    .getTracer('nextjs-example')
    .startActiveSpan('sleep', async (span) => {
      await sleep(Math.random() * 1000);
      span.end();
    });

  return <h1>Hello Frontmania</h1>;
}
