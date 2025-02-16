const fs = require('fs')
const path = require('path')

const folder = path.join(__dirname, 'files')
const copyFolder = path.join(__dirname, 'files-copy')

function copyDirectory(folder, copyFolder) {
  fs.mkdir(copyFolder, { recursive: true }, (err) => {
    if (err) throw err
  })
  fs.readdir(folder, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error)
    } else {
      files.forEach((file) => {
        const inPath = path.join(folder, file.name)
        const outPath = path.join(copyFolder, file.name)
        if (file.isDirectory()) {
          fsprom.mkdir(outPath, { recursive: true }).then(() => {
            copyDirectory(inPath, outPath)
          })
        } else {
          fs.copyFile(inPath, outPath, (err) => {
            if (err) throw err
          })
        }
      })
    }
  })
}


copyDirectory(folder, copyFolder)
