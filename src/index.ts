import * as core from '@actions/core';
import * as actions from './actions';
import { getProjectPath } from './utils/path';
import { readProjectConfig, createProject } from './utils/project';
import { getCompileOptions, getCIBot, getThreads } from './utils/context';
import type { ActionType, ActionContext } from './types';

async function activate(): Promise<void> {
  const actionType = core.getInput('action_type') as ActionType || 'upload';
  const projectPath = getProjectPath();
  const projectConfig = readProjectConfig(projectPath);
  const project = createProject(projectPath, projectConfig);
  const version = core.getInput('version') || '1.0.0';
  const description = core.getInput('description') || '通过 MiniProgram GitHub Action 上传';
  const context: ActionContext = {
    project,
    version,
    description,
    compileOptions: getCompileOptions(projectConfig.setting),
    robot: getCIBot(),
    threads: getThreads(),
  };

  try {
    await actions[actionType](context);
  } catch (error) {
    core.setFailed(error);
  }
}

activate();
