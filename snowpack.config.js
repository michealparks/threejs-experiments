/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/'
  },
  plugins: [
    '@snowpack/plugin-typescript',
    ['snowpack-plugin-replace', {
      list: [
        { from: 'process.env', to: 'import.meta.env' },
        { from: 'import.meta.env.MODE', to: `'${process.env.NODE_ENV}'` }
      ]
    }], [
      'snowpack-plugin-copy',
      {
        patterns: [
          { source: ['public/.nojekyll'], destination: 'build' }
        ],
      },
    ],
  ],
  exclude: [
    'ammo.js',
    '**/node_modules/**/*',
    '**/__tests__/*',
    '**/*.@(spec|test).@(js|mjs)'
  ],
  packageOptions: {
    installTypes: true
  },
}