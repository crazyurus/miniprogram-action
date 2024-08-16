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
  ignoreUploadUnusedFiles: boolean;
}

export type ActionType = 'preview' | 'upload';

export interface ActionContext {
  project: Project;
  version: string;
  description: string;
  robot: number;
  threads: number;
  allowIgnoreUnusedFiles: boolean;
}
