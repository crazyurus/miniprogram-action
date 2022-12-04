const path = require('path');

require('ts-node').register({
  cwd: path.resolve(__dirname, '..'),
});

const { activate } = require('../src/index');

activate();
