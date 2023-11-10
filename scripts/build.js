const { copySync } = require('fs-extra')

console.log('Copying dist files')
copySync('frontend/dist', 'backend/dist')