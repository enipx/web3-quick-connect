// import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import dts from 'rollup-plugin-dts';
import { minify } from 'rollup-plugin-esbuild';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: './src/index.tsx',
    output: [
      {
        file: './dist/commonjs/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/module/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      cleaner({
        targets: ['./dist'],
      }),
      nodeResolve(),
      peerDepsExternal(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      minify(),
    ],
  },
  {
    input: './src/index.tsx',
    output: [
      {
        file: './dist/typescript/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
];
