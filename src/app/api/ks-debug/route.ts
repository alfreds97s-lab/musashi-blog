export async function GET() {
  return Response.json({
    hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientIdPrefix: process.env.KEYSTATIC_GITHUB_CLIENT_ID?.slice(0, 6) ?? 'NOT SET',
    hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    clientSecretLength: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET?.length ?? 0,
    hasSecret: !!process.env.KEYSTATIC_SECRET,
    secretLength: process.env.KEYSTATIC_SECRET?.length ?? 0,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'NOT SET',
  });
}
