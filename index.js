const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

const imageDirectory = 'img';

const directoryPath = path.join(__dirname, imageDirectory);

let files = [];

// Add whatever type of files are expected to be allowed.
// Directories can have all sorts of files in them.
const whitelist = ['.jpg', '.jpeg', '.png'];

try {
  files = fs.readdirSync(directoryPath);

} catch (err) {
  console.error('Unable to scan directory: ' + err);
  process.exit(2);
}

const zip = new AdmZip();

files
  .filter(file => {
    const extension = path.extname(file);

    return whitelist.indexOf(extension) > -1;
  })
  .forEach(file => {
    console.log(`adding ${file} to zip`);
    zip.addLocalFile(directoryPath + '/' + file);
  });

const willSendthis = zip.toBuffer();

zip.writeZip("upload.zip");
