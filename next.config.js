/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack", 
              options: { icon: true, 
                         replaceAttrValues: { '#000': "{props.fill}" }} }],
    });

    return config;
  },
}

module.exports = nextConfig
