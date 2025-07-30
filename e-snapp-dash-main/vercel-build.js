const { execSync } = require('child_process');

// Run the build command
console.log('Running build command...');
execSync('npm run build', { stdio: 'inherit' });

// Generate Prisma client
console.log('Generating Prisma client...');
execSync('npx prisma generate', { stdio: 'inherit' });

console.log('Build completed successfully!');