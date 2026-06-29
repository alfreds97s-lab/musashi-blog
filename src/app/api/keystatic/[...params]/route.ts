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
  return handler.GET(withStableOrigin(request));
}

export async function POST(request: Request) {
  return handler.POST(withStableOrigin(request));
}
