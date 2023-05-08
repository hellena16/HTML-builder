const fs = require('fs');
const path = require('path');
const style = path.join(__dirname, '/styles');
const dist = path.join(__dirname, 'project-dist/bundle.css');
const writeStream = fs.createWriteStream(dist);

fs.readdir(style, (err, files) => {
  files.forEach((file) => {
    const pathFile = path.join(style, file);
    const ext = path.extname(pathFile);
    if (err) throw err

    if (ext === '.css') {
      const readStream = fs.createReadStream(pathFile);
      readStream.on('data', (data) => {
        writeStream.write(data.toString() + '\n');
      });
    }
  });
});