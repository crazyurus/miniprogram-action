const { execSync } = require('child_process');

function exec(command) {
  execSync(command, {
    cwd: __dirname,
    stdio: 'inherit',
  });
}

exec('npm install pnpm@8 -g');
exec('pnpm install --frozen-lockfile');
