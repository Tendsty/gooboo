export { download }

/**
 * Generates a file and offers to download it
 * @param {String} file file content
 * @param {String} name name of the file
 */
function download(file, name, mime = 'text/plain') {
    let element = document.createElement('a');
    element.setAttribute('href', `data:${ mime };charset=utf-8,` + encodeURIComponent(file));
    element.setAttribute('download', name);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
