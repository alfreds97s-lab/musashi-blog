import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

const handler = makeRouteHandler({ config });

// Force Keystatic to always use the stable production URL instead of
// Netlify's per-deploy URL (e.g. 6a42bd13--musahiblog.netlify.app)
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
  return handler.GET(withStableOrigin(request));
}

export async function POST(request: Request) {
  return handler.POST(withStableOrigin(request));
}
