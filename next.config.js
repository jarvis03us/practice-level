/** @type {import('next').NextConfig} */
const { color } = require('./theme/theme.config');
const withLess = require('next-with-less');
module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        'primary-color': color.primary,
        'secondary-color': color.secondary,
        'success-color': color.success,
        'warning-color': color.warning,
        'error-color': color.error,
        'info-color': color.info,
        'text-base-color': color.textBase,
        'bg-base-color': color.bgBase,
        'white-color': color.white,
      },
    },
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
});
