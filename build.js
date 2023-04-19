const { execSync } = require('child_process')

// execSync('tnpm run build:apple_arm');
execSync('tnpm run build:apple_x64');
// execSync('tnpm run build:linux_x64_gnu');
execSync('rm -rf lib');
execSync('mkdir lib');
execSync('mv *.node ./lib/');
execSync('cp index.* ./lib/');