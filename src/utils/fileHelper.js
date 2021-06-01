const fs = window.require('fs').promises;
export default {
    readFile: (path) => {
        return fs.readFile(path, { encoding: 'utf-8'})
    },
    writeFile: (path,content) => {
        return fs.writeFile(path,content,{ encoding: 'utf-8'})
    },
    renameFile: (path,newPath) => {
        return fs.rename(path,newPath)
    },
    deleteFile: (path) => {
        return fs.unlink(path)
    }
}