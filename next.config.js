/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const whenDev = process.env.NODE_ENV === 'development';

const getDevNextConfig = () => {
  let mountPoint = process.env.BLOCKLET_DEV_MOUNT_POINT || '';

  let appUrl = process.env.BLOCKLET_APP_URL || '';

  let assetPrefix = `${appUrl}${mountPoint}`.replace('http://', 'https://');

  let devWithBlockletServer = process.env.hasOwnProperty('BLOCKLET_DEV_MOUNT_POINT');

  return whenDev && devWithBlockletServer
    ? {
        assetPrefix: assetPrefix, // When the dev mode as component, this line required
        basePath: '',
      }
    : {};
};

const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile',
        permanent: false,
      },
    ];
  },
  i18n,
  ...getDevNextConfig(),
};

module.exports = nextConfig;
