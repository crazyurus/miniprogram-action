const { execSync } = require('child_process');

function exec(command) {
  execSync(command, {
    cwd: __dirname,
    stdio: 'inherit',
  });
}

exec('npm install pnpm -g');
exec('pnpm install --frozen-lockfile');
