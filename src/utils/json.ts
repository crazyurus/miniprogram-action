import * as fs from 'fs';

export function readJSON<T extends Record<string, any>>(filePath: string): T | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function updateJSON(filePath: string, key: string, value: any, method: string = ''): Promise<void> {
  const appConfig = readJSON(filePath) || {};

  if (method) {
    // @ts-ignore
    appConfig[key][method](value);
  } else {
    appConfig[key] = value;
  }

  return fs.promises.writeFile(filePath, JSON.stringify(appConfig, null, 2));
}
