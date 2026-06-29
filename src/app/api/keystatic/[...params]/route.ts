import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

const handler = makeRouteHandler({ config });

function withStableOrigin(request: Request): Request {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return request;
  const url = new URL(request.url);
  const stable = new URL(siteUrl);
  url.protocol = stable.protocol;
  url.host = stable.host;
  return new Request(url.toString(), request);
}

export async function GET(request: Request) {
  try {
    return await handler.GET(withStableOrigin(request));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Keystatic GET error]', message);
    return new Response(
      `<pre style="font-family:monospace;padding:2rem">Keystatic error:\n\n${message}</pre>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    return await handler.POST(withStableOrigin(request));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Keystatic POST error]', message);
    return new Response(
      `<pre style="font-family:monospace;padding:2rem">Keystatic error:\n\n${message}</pre>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
