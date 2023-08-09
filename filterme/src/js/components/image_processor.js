import { INPUT_IMAGE_STORAGE_KEY, OUTPUT_IMAGE_STORAGE_KEY } from '../services/constants.js'
import { DB } from '../services/db.js';

import { ImageReader } from "../core/image_reader.js";
import { ImageWriter } from "../core/image_writer.js";
import { Grayscale, Sepia, Reflect, Duplicate } from '../core/image_filter.js'

import { Previewer } from '../services/previewer.js';


/**
 * This class is responsible for binding the
 * filtering process control, meaning the seclect
 * options and the apply button
 */
class ImageProcessor {
    constructor() {
        this.applyBtn = document.querySelector('#apply-filter');
        this.operationSelector = document.querySelector('.js-filter-select');
        this.processedImageContainer = document.querySelector('.processed-image-container');

        this.db = new DB();
        this.previewer = new Previewer();

        this._bindControls();
    }

    _bindControls() {
        this.applyBtn.addEventListener('click', (e) => this._applyFilter(e));
    }

    _applyFilter() {
        let operation = this.operationSelector.value;

        if (!this.db.exists(INPUT_IMAGE_STORAGE_KEY)) return;

        this.db.remove(OUTPUT_IMAGE_STORAGE_KEY);

        let encoded = this.db.get(INPUT_IMAGE_STORAGE_KEY);

        let imageReader = new ImageReader(encoded);
        let rgbImage = imageReader.read();

        let imageFilter = null;

        switch (operation) {
            case 'duplicate':
                imageFilter = new Duplicate(rgbImage);
                break;
            case 'grayscale':
                imageFilter = new Grayscale(rgbImage);
                break;
            case 'reflect':
                imageFilter = new Reflect(rgbImage);
                break;
            case 'sepia':
                imageFilter = new Sepia(rgbImage);
                break;
            default: null
        }

        imageFilter.apply();

        let imageWriter = new ImageWriter(imageFilter.outputImage);
        let processedImg = imageWriter.write();
        this.previewer.setDataToImage(processedImg, { classList: ['processed-image'] });

        let base64Data = imageWriter.asBase64();
        this.db.set(OUTPUT_IMAGE_STORAGE_KEY, base64Data);

        this.previewer.preview(processedImg, this.processedImageContainer);
    }
}

export { ImageProcessor };