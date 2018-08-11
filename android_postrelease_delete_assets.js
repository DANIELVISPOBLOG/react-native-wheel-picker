const fs = require('fs');
const path = require('path');
const CONSTANTS = require('./android_release_assets_def');

console.log('### This scripts is intended to delete Android assets created before the creation of the release package. Need it to save space. Only delete files, no folders');

CONSTANTS.IMAGES_2_MOVE_ARRAY.map(item => {
  const filePath = path.normalize(`${CONSTANTS.ANDROID_ASSETS_PATH}/${item}`);
  console.log(`- Deleting file ${filePath} ...`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`     + Done: Destination File removed`);
  } else {
    console.log(`     + Error: Destination File doesnt exist`);
  }
});