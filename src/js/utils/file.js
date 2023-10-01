export { download }

var fileDownload = require('js-file-download');

/**
 * Generates a file and offers to download it
 * @param {String} file file content
 * @param {String} name name of the file
 */
function download(file, name, mime = 'text/plain') {
    const fileBlob = new Blob([file], {type: mime});
    fileDownload(fileBlob, name);
}
