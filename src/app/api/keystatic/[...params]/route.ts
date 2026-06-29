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
  // Also override forwarded headers Netlify may inject
  const headers = new Headers(request.headers);
  headers.set('x-forwarded-host', stable.host);
  headers.set('x-forwarded-proto', stable.protocol.replace(':', ''));
  headers.set('host', stable.host);
  return new Request(url.toString(), { method: request.method, headers, body: request.body });
}

export async function GET(request: Request) {
  const modifiedRequest = withStableOrigin(request);
  try {
    const response = await handler.GET(modifiedRequest);
    const location = response.headers.get('location') ?? '';
    // Intercept error redirects and show details in browser for debugging
    if (location.includes('error') || response.status >= 400) {
      const body = await response.text().catch(() => '(no body)');
      return new Response(
        `<pre style="padding:2rem;font-family:monospace;white-space:pre-wrap">STATUS: ${response.status}\nLOCATION: ${location}\nREQUEST URL: ${modifiedRequest.url}\nBODY: ${body}</pre>`,
        { status: 200, headers: { 'Content-Type': 'text/html' } }
      );
    }
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      `<pre style="padding:2rem;font-family:monospace">EXCEPTION:\n${message}</pre>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

export async function POST(request: Request) {
  const modifiedRequest = withStableOrigin(request);
  try {
    return await handler.POST(modifiedRequest);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      `<pre style="padding:2rem;font-family:monospace">POST EXCEPTION:\n${message}</pre>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
