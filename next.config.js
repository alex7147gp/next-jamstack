const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  future: {
    webpack5: true,
  },
  env: {
    NEXT_PUBLIC_SPACE_ID: 'ehut0i2fzqdk',
    NEXT_PUBLIC_ACCESS_TOKEN: 'VG4rSRnnYtud1TNQ_UQW1HIT00GJYfVAmJ0Lh8A3CTc',
  },
}

module.exports = withBundleAnalyzer(config)
