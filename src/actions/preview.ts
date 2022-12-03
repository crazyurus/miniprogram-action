import * as ci from 'miniprogram-ci';
import * as fs from 'fs';
import core from '@actions/core';
import { getTemporaryPath } from '../utils/path'
import type { ActionContext } from '../types';

async function preview(context: ActionContext): Promise<void> {
  const project = new ci.Project(context.project);
  const pagePath = core.getInput('page_path');
  const pageQuery = core.getInput('page_query');
  const scene = Number(core.getInput('scene')) || 1011;
  const tempImagePath = getTemporaryPath(project.appid);

  await ci.preview({
    project,
    version: context.version,
    desc: context.description,
    setting: context.compileOptions,
    robot: context.robot,
    threads: context.threads,
    qrcodeFormat: 'base64',
    qrcodeOutputDest: tempImagePath,
    pagePath,
    searchQuery: pageQuery,
    scene,
    onProgressUpdate: console.log,
  });

  const base64 = await fs.promises.readFile(tempImagePath, 'utf-8');

  core.setOutput('preview_qrcode', base64);
}

export default preview;
