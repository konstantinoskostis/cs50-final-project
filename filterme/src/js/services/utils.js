import { DB } from './db.js'
import { Previewer } from './previewer.js';

class Utils {
    constructor() {
        this.db = new DB();
    }

    toBase64(file, meta) {
        this._getBase64(file).then(data => {
            this.db.set(meta.key, data);

            let previewer = new Previewer();
            let image = previewer.createImageFromBase64(data, meta.classList);
            previewer.preview(image, meta.container);
        });
    }

    _getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}

export { Utils };