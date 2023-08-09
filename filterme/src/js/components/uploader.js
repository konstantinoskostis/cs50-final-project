import { INPUT_IMAGE_STORAGE_KEY } from '../services/constants.js'
import { Utils } from '../services/utils.js'

/**
 * The uploader class binds the Upload button
 * which is used to upload the original image.
 *
 */
class Uploader {
    constructor() {
        this.fileEl = document.querySelector('#choose-image');
        this.uploadBtn = document.querySelector('#upload-original');
        this.originalImageContainer = document.querySelector('.original-image-container');

        this.selectedFile = null;

        this.utils = new Utils();

        this._bindControls();
    }

    _bindControls() {
        this.fileEl.addEventListener('change', (e) => this._select_file(e));
        this.uploadBtn.addEventListener('click', (e) => this._upload(e));
    }

    _select_file() {
        this.selectedFile = this.fileEl.files[0];
    }

    _upload() {
        if (this.selectedFile === null) return;

        this.utils.db.remove(INPUT_IMAGE_STORAGE_KEY);

        let meta = {
            key: INPUT_IMAGE_STORAGE_KEY,
            container: this.originalImageContainer,
            classList: ['original-image']
        };

        this.utils.toBase64(this.selectedFile, meta);
    }
}

export { Uploader };