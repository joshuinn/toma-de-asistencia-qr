/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pages/assistence",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
