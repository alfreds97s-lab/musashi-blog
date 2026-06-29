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
  const headers = new Headers(request.headers);
  headers.set('x-forwarded-host', stable.host);
  headers.set('x-forwarded-proto', stable.protocol.replace(':', ''));
  headers.set('host', stable.host);
  return new Request(url.toString(), { method: request.method, headers, body: request.body });
}

export async function GET(request: Request) {
  const modifiedRequest = withStableOrigin(request);

  // Intercept GitHub token exchange to capture the raw response
  let githubRaw: string | null = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const res = await originalFetch(input, init);
    if (String(input).includes('github.com/login/oauth/access_token')) {
      githubRaw = await res.clone().text();
    }
    return res;
  };

  try {
    const response = await handler.GET(modifiedRequest);
    globalThis.fetch = originalFetch;

    if (githubRaw) {
      return new Response(
        `<pre style="padding:2rem;font-family:monospace;white-space:pre-wrap">KEYSTATIC STATUS: ${response.status}\nGITHUB RESPONSE: ${githubRaw}\nREQUEST URL: ${modifiedRequest.url}</pre>`,
        { status: 200, headers: { 'Content-Type': 'text/html' } }
      );
    }
    return response;
  } catch (error) {
    globalThis.fetch = originalFetch;
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      `<pre style="padding:2rem;font-family:monospace">EXCEPTION: ${message}</pre>`,
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
      `<pre style="padding:2rem;font-family:monospace">POST ERROR: ${message}</pre>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
