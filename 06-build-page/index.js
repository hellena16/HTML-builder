const fs = require('fs')
const path = require('path')
const fsprom = require('fs/promises')

const projectDist = path.join(__dirname, 'project-dist')
const style = path.join(__dirname, 'styles')
const styleDist = path.join(projectDist, 'style.css')
const assets = path.join(__dirname, 'assets')
const assetsDist = path.join(projectDist, 'assets')
const template = path.join(__dirname, 'template.html')
const components = path.join(__dirname, 'components')
const indexDist = path.join(projectDist, 'index.html')

function createStyles(style, styleDist) {
  const writeStream = fs.createWriteStream(styleDist)

  fs.readdir(style, (err, files) => {
    files.forEach((file) => {
      const pathFile = path.join(style, file)
      const ext = path.extname(pathFile)
      if (err) throw err

      if (ext === '.css') {
        const readStream = fs.createReadStream(pathFile)
        readStream.on('data', (data) => {
          writeStream.write(data.toString() + '\n')
        })
      }
    })
  })
}

function createHTML(template, indexDist, components) {
  fs.readFile(template, 'utf8', (error, data) => {
    if (error) {
      console.log(error)
    }
    let template = data
    const tags = data.match(/{{(.*)}}/gi)
    tags.forEach((el) => {
      const name = `${el.slice(2, -2)}.html`
      const pathComponents = path.join(components, name)
      fs.readFile(pathComponents, 'utf8', (error, dataHtml) => {
        if (error) {
          console.log(error)
        }
        template = template.replace(el, dataHtml)
        const writeStream = fs.createWriteStream(indexDist)
        writeStream.write(template)
      })
    })
  })
}
function copyDirectory(assets, assetsDist) {
  fs.mkdir(assetsDist, { recursive: true }, (err) => {
    if (err) throw err
  })
  fs.readdir(assets, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error)
    } else {
      files.forEach((file) => {
        const inPath = path.join(assets, file.name)
        const outPath = path.join(assetsDist, file.name)
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

function createPage(projectDist) {
  fsprom.mkdir(projectDist, { recursive: true }).finally(() => {
    createStyles(style, styleDist)
    createHTML(template, indexDist, components)
    copyDirectory(assets, assetsDist)
  })
}

createPage(projectDist)
