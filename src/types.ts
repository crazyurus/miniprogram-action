export interface CompileOptions {
  es6: boolean;
  enhance: boolean;
  minified: boolean;
  postcss: boolean;
  minifyWXSS: boolean;
  minifyWXML: boolean;
  uglifyFileName: boolean;
  uploadWithSourceMap: boolean;
}

export interface CICompileOptions {
  es6: boolean;
  es7: boolean;
  minify: boolean;
  autoPrefixWXSS: boolean;
  minifyWXML: boolean;
  minifyWXSS: boolean;
  minifyJS: boolean;
  codeProtect: boolean;
  uploadWithSourceMap: boolean;
}

export interface Project {
  appid: string;
  type: 'miniProgram' | 'miniProgramPlugin' | 'miniGame' | 'miniGamePlugin';
  projectPath: string;
  ignores: string[];
  privateKey?: string;
}

export interface ProjectConfig {
  appid: string;
  projectname: string;
  libVersion: string;
  miniprogramRoot?: string;
  compileType?: 'miniprogram' | 'plugin';
  setting: CompileOptions;
  ignoreUploadUnusedFiles: boolean;
}

export type ActionType = 'preview' | 'upload';

export interface ActionContext {
  project: Project;
  version: string;
  description: string;
  compileOptions: CICompileOptions;
  robot: number;
  threads: number;
  allowIgnoreUnusedFiles: boolean;
}
