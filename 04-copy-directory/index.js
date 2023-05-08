const fs = require('fs/promises')
const path = require('path')

const folder = path.join(__dirname, 'files')
const copyFolder = path.join(__dirname, 'files-copy')

async function copyDirectory(folder, copyFolder) {
  await fs
    .mkdir(copyFolder, { recursive: true })(
      await fs.readdir(folder, { withFileTypes: true }),
    )
    .forEach((file) => {
      fs.copyFile(
        path.join(folder, file.name),
        path.join(copyFolder, file.name),
      )
    })
}

copyDirectory(folder, copyFolder)
