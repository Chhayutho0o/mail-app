import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:5000/api/v1/admins",
    COOKIE_NAME: process.env.COOKIE_NAME || "cookie",
    ENCRYPT_SECRET_KEY: process.env.ENCRYPT_SECRET_KEY || "secret_key",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
