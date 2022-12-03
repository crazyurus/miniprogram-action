import { execSync } from 'child_process';
import * as ci from 'miniprogram-ci';
import * as core from '@actions/core';
import type { ActionContext } from '../types';

async function npm(context: ActionContext): Promise<void> {
  const project = new ci.Project(context.project);

  core.info('start npm install');

  execSync('npm install', {
    cwd: context.project.projectPath,
  });

  core.info('start npm build');

  const warning = await ci.packNpm(project, {
    reporter: console.log,
  });

  if (warning.length > 0) {
    console.warn(warning);
  }
}

export default npm;
