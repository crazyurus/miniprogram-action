import * as os from 'os';
import * as core from '@actions/core';

interface TaskStatus {
  status: 'doing' | 'done' | 'warn' | 'fail';
  message: string;
}

export function getCIBot(): number {
  return core.getInput('ci') ? Number(core.getInput('ci')) : 24;
}

export function getThreads(): number {
  return os.cpus().length * 2;
}

export function onProgressUpdate(message: string | TaskStatus): void {
  console.log(
    typeof message === 'object'
      ? message.message + ' ' + message.status
      : message
  );
}
