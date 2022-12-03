import * as os from 'os';
import * as path from 'path';
import * as core from '@actions/core';

export function getProjectPath(): string {
  const { GITHUB_WORKSPACE = '' } = process.env;
  const projectPath = core.getInput('project_path') || '.';

  return path.join(GITHUB_WORKSPACE, projectPath);
}

export function getMiniProgramRootPath(projectPath: string, relativePath?: string): string {
  if (relativePath) {
    return path.resolve(projectPath, relativePath);
  }

  return projectPath;
}

export function getProjectConfigPath(projectPath: string): string {
  return path.join(projectPath, 'project.config.json')
}

export function getPackageConfigPath(projectPath: string): string {
  return path.join(projectPath, 'package.json');
}

function getTemporaryFileName(type: string, appID: string, ext: string): string {
  const timestamp = Date.now();

  return `${type}-${appID}-${timestamp}.${ext}`;
}

export function getTemporaryPath(appID: string): string {
  return path.join(os.tmpdir(), getTemporaryFileName('qrcode', appID, 'jpg'));
}
