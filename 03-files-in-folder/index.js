const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach(file => {
    const filePath = path.join(folder, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        throw err;
      }
      if (stats.isFile()) {
        const nameFile = file.split('.').slice(0,1);
        const extFile = path.extname(file).split('.').slice(1);
        const sizeFile = stats.size / 1024;
        console.log(`${nameFile} - ${extFile} - ${sizeFile}kb`);
      }
    });
  });
});