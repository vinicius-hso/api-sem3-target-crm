module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        alias: {
          '@controllers': './src/app/controllers',
          '@middlewares': './src/app/middlewares',
          '@entities': './src/app/entities',
          '@config': './src/config',
          '@routes': './src/routes',
          '@utils': './src/utils',
          '@src': './src',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', 'node_modules'],
};
