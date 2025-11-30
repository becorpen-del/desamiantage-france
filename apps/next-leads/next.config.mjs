const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ["@desamiant/shared"],
  env: {
    NEXT_PUBLIC_BRAND_NAME: process.env.BRAND_NAME,
    NEXT_PUBLIC_PRIMARY_COLOR: process.env.PRIMARY_COLOR,
    NEXT_PUBLIC_GA_ID: process.env.GA_ID,
    NEXT_PUBLIC_GTM_ID: process.env.GTM_ID,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_HONEYPOT_FIELD_NAME: process.env.HONEYPOT_FIELD_NAME,
    NEXT_PUBLIC_MIN_SUBMIT_DELAY_MS: process.env.MIN_SUBMIT_DELAY_MS,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL,
  },
  async redirects() {
    return [
      {
        source: "/desamiantage/paris",
        destination: "/paris",
        permanent: true,
      },
      {
        source: "/desamiantage/bordeaux",
        destination: "/bordeaux",
        permanent: true,
      },
      {
        source: "/desamiantage/lyon",
        destination: "/lyon",
        permanent: true,
      },
      {
        source: "/desamiantage/toulouse",
        destination: "/toulouse",
        permanent: true,
      },
      {
        source: "/desamiantage/nantes",
        destination: "/nantes",
        permanent: true,
      },
      {
        source: "/desamiantage/france",
        destination: "/desamiantage-france",
        permanent: true,
      },
      {
        source: "/types-desamiantage/fibrociment",
        destination: "/desamiantage-fibrociment",
        permanent: true,
      },
      {
        source: "/prix-desamiantage-au-m2",
        destination: "/prix-desamiantage",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/desamiantage-:region",
        destination: "/desamiantage-regions/:region",
      },
    ];
  },
};

export default nextConfig;
