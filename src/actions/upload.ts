import * as ci from 'miniprogram-ci';
import * as core from '@actions/core';
import { onProgressUpdate } from '../utils/context';
import type { ActionContext } from '../types';

async function upload(context: ActionContext): Promise<void> {
  const project = new ci.Project(context.project);

  core.info('start upload');

  await ci.upload({
    project,
    version: context.version,
    desc: context.description,
    setting: {
      useProjectConfig: true,
    },
    robot: context.robot,
    threads: context.threads,
    allowIgnoreUnusedFiles: context.allowIgnoreUnusedFiles,
    onProgressUpdate,
  });
}

export default upload;
