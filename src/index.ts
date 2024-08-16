import * as core from '@actions/core';
import * as actions from './actions';
import { getProjectPath } from './utils/path';
import {
  readProjectConfig,
  createProject,
  hasPackageJSON,
} from './utils/project';
import { getCIBot, getThreads } from './utils/context';
import type { ActionType, ActionContext } from './types';

export async function activate(): Promise<void> {
  const actionType = (core.getInput('action_type') as ActionType) || 'upload';
  const projectPath = getProjectPath();
  const projectConfig = readProjectConfig(projectPath);
  const project = createProject(projectPath, projectConfig);
  const version = core.getInput('version') || '1.0.0';
  const description =
    core.getInput('description') || '通过 MiniProgram GitHub Action 上传';
  const context: ActionContext = {
    project,
    version,
    description,
    allowIgnoreUnusedFiles: projectConfig.ignoreUploadUnusedFiles,
    robot: getCIBot(),
    threads: getThreads(),
  };

  if (core.isDebug()) {
    console.debug('env', process.env);
  }

  try {
    if (hasPackageJSON(project.projectPath)) {
      await actions.npm(context);
    }

    await actions[actionType](context);
  } catch (error) {
    core.setFailed(error);
  }
}
