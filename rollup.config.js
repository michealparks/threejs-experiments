import replace from '@rollup/plugin-replace'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import { terser as terserConfig } from './scripts/configs'

const { DEV, PROD } = process.env

export default [
  {
    input: 'build/index.js',
    output: {
      file: 'dist/index.js',
      format: 'es'
    },
    plugins: [
      replace({
        'import.meta.env.MODE': '"production"'
      }),
      copy({
        targets: [{ src: 'public/*', dest: 'dist' }]
      }),
      PROD && terser(terserConfig),
      PROD && filesize()
    ]
  }
]
