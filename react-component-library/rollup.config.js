import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import externals from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import json from '@rollup/plugin-json';
import styles from "rollup-plugin-styles";

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      assetFileNames: "[name][extname]",
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      assetFileNames: "[name][extname]",
    },
  ],
  plugins: [
    styles(),
    externals(),
    url({
      fileName: '[name][extname]',
      include: ['**/*.woff2', '**/*.svg'],
      limit: 60000,
    }),
    json({ compact: true }),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.(tsx|ts)'],
    }),
    commonjs({
      namedExports: {
        'node_modules/@material-ui/core/node_modules/react-is/index.js': ['ForwardRef', 'Memo', 'isFragment'],
        'node_modules/@material-ui/utils/node_modules/react-is/index.js': ['ForwardRef', 'Memo', 'isFragment'],
        'node_modules/react-is/index.js': ['ForwardRef', 'Memo', 'isFragment'],
        'node_modules/react-lazy-load-image-component/build/index.js': ['LazyLoadImage', 'LazyLoadComponent'],
      },
    }),
  ],
};
