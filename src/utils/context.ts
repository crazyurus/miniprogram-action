import * as os from 'os';
import type { CompileOptions, CICompileOptions } from '../types';

export function getCIBot(): number {
  return 24;
}

export function getThreads(): number {
  return os.cpus().length * 2;
}

export function getCompileOptions(options: CompileOptions): CICompileOptions {
  return {
    es6: options.es6,
    es7: options.enhance,
    minify: options.minified,
    autoPrefixWXSS: options.postcss,
    minifyWXML: options.minified || options.minifyWXSS,
    minifyWXSS: options.minified || options.minifyWXML,
    minifyJS: options.minified,
    codeProtect: options.uglifyFileName,
    uploadWithSourceMap: options.uploadWithSourceMap,
  };
}
