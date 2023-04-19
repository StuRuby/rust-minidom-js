const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

const { platform, arch } = process

let nativeBinding = null
let loadError = null

function isMusl() {
  // For Node 10
  if (!process.report || typeof process.report.getReport !== 'function') {
    try {
      const lddPath = require('child_process').execSync('which ldd').toString().trim();
      return readFileSync(lddPath, 'utf8').includes('musl')
    } catch (e) {
      return true
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header
    return !glibcVersionRuntime
  }
}

switch (platform) {
  case 'darwin':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'mpi-dependency-tree.darwin-x64.node'))
        try {
          nativeBinding = require(
            join(__dirname, './rust-minify-xml.darwin-x64.node')
          );
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'mpi-dependency-tree.darwin-arm64.node')
        )
        try {
          nativeBinding = require(
            join(__dirname, './rust-minify-xml.darwin-arm64.node')
          );
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          try {
            nativeBinding = require(
              join(__dirname, './rust-minify-xml.linux-x64-musl.node')
            );
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'mpi-dependency-tree.linux-x64-gnu.node')
          )
          try {
            nativeBinding = require(
              join(__dirname, './rust-minify-xml.linux-x64-gnu.node')
            );
          } catch (e) {
            loadError = e
          }
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

const { minifyHtml, minifyJson } = nativeBinding

module.exports.minify_html = minifyHtml
module.exports.minify_json = minifyJson
