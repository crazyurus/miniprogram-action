import * as fs from 'fs'
import { readJSON } from './json';
import { getProjectConfigPath, getMiniProgramRootPath } from './path';
import type { Project, ProjectConfig } from '../types';

export function readProjectConfig(rootPath: string): ProjectConfig {
  const projectFilePath = getProjectConfigPath(rootPath);

  if (fs.existsSync(projectFilePath)) {
    const config = readJSON<ProjectConfig>(projectFilePath);

    if (config) {
      config.projectname = decodeURIComponent(config.projectname);

      return config;
    }

    throw new Error('project.config.json 文件解析失败');
  }

  throw new Error('未找到 project.config.json 文件');
}

export function createProject(rootPath: string, projectConfig: ProjectConfig): Project {
  return {
    appid: projectConfig.appid,
    type: projectConfig.compileType === 'miniprogram' ? 'miniProgram' : 'miniProgramPlugin',
    projectPath: getMiniProgramRootPath(rootPath, projectConfig.miniprogramRoot),
    privateKey: process.env.PRIVATE_KEY || '',
    ignores: ['node_modules/**/*'],
  };
}
