import { join } from 'path';

import { buildAppConfig } from '../src/config/config.server';
import { commonExports } from './webpack.common';

const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

// EMUR (09/11/2026): o assets/config.json NAO pode ser pre-comprimido. Ele e regravado
// por cada instancia ao iniciar (com a config de producao), mas o .gz/.br gerado aqui
// ficaria com a config padrao (rest = localhost:8080). O servidor entrega o .gz ao
// navegador e as paginas sem SSR (ex.: /statistics, /about) caem no erro 500.
const NAO_COMPRIMIR = /assets[\\/]config\.json$/;

module.exports = Object.assign({}, commonExports, {
  target: 'web',
  plugins: [
    ...commonExports.plugins,
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg|json)$/,
      exclude: NAO_COMPRIMIR,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg|json)$/,
      exclude: NAO_COMPRIMIR,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  devServer: {
    setupMiddlewares(middlewares, server) {
      buildAppConfig(join(process.cwd(), 'src/assets/config.json'));
      return middlewares;
    }
  },
  watchOptions: {
    // Ignore directories that should not be watched for recompiling angular
    ignored: [
      '**/node_modules', '**/_build', '**/.git', '**/docker',
      '**/.angular', '**/.idea', '**/.vscode', '**/.history', '**/.vsix'
    ]
  },
});
