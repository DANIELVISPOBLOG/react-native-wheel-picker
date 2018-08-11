const fs = require('fs');
const path = require('path');
const CONSTANTS = require('./android_release_assets_def');

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';
  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') {
        return curDir;
      }
      if (err.code === 'ENOENT') {
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }
      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && targetDir === curDir) {
        throw err;
      }
    }
    return curDir;
  }, initDir);
}

console.log('### This scripts is intended to move react native assets to Android assets in order to use react-native-web-image on Android release packages');

if (!fs.existsSync(CONSTANTS.ANDROID_ASSETS_PATH)) {
  let onlyPath = path.dirname(path.normalize(CONSTANTS.ANDROID_ASSETS_PATH));
  mkDirByPathSync(onlyPath);
}

CONSTANTS.IMAGES_2_MOVE_ARRAY.map(item => {
  console.log(`- Moving file ${item} ...`);
  if (fs.existsSync(item)) {
    const onlyPath = path.dirname(path.normalize(`${CONSTANTS.ANDROID_ASSETS_PATH}/${item}`));
    console.log(`     + Destination Folder Path is ${onlyPath}`);
    if (!fs.existsSync(onlyPath)) {
      console.log(`     + Destination Folder Path doesnt exist. Creating it ...`);
      mkDirByPathSync(onlyPath, true);
    }
    const destFilePath = path.normalize(`${CONSTANTS.ANDROID_ASSETS_PATH}/${item}`);
    if (!fs.existsSync(destFilePath)) {
      fs.copyFileSync(item, destFilePath);
      console.log(`     + Done: File ${item} has been copied to ${destFilePath}`);
    } else {
      console.log(`     + Error: Destination File ${destFilePath} already exists`);
    }
  } else {
    console.log(`     + Error: Source File ${item} doesnt exist`);
  }
});