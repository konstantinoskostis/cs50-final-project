import { RGBPixel } from './rgb_pixel.js'
import { RGBImage } from './rgb_image.js'
import { Canvas } from './canvas.js';


class ImageReader {
    constructor(base64Data) {
        this.base64Data = base64Data;
        this.imageType = null;
    }

    getImageType() {
        if (this.imageType != null) return this.imageType;

        if (this.base64Data.match(/:image\/png;/) != null) {
            this.imageType = 'image/png';
        } else if (this.base64Data.match(/:image\/jpeg;/) != null) {
            this.imageType = 'image/jpeg';
        }

        return this.imageType;
    }

    /**
     * Returns an RGBImage
     * 
     * @returns RGBImage
     */
    read() {
        let meta = this.getMeta();
        let height = meta.height;
        let width = meta.width;
        let image = null;

        if (meta.colorSpace == 'srgb') {
            // The numerical data array
            let data = meta.data;

            // sRGB is the standard RGB and contains 4 channels.
            // R, G, B, A values form a single pixel.
            let valuesCount = (height * width) * 4;
            let i;
            let valuesRead = 0;
            let rgba = []

            // iterate the Uint8 data array and create a 1D array of RGBPixel objects
            let pixelsBuffer = [];

            for (i = 0; i < valuesCount; i++) {
                rgba.push(data[i]);
                valuesRead += 1;

                if (valuesRead == 4) {
                    let pixel = RGBPixel.fromRGBA(rgba[0], rgba[1], rgba[2], rgba[3]);
                    pixelsBuffer.push(pixel);

                    valuesRead = 0;
                    rgba = [];
                }
            }

            let pixels = [];

            // iterate the pixelsBuffer and set the 2D image data
            let row;
            let column;

            for (row = 0; row < height; row++) {
                let imageRow = [];

                for(column = 0; column < width; column++) {
                    let position = row * width + column;
                    let p = pixelsBuffer[position];

                    let pixel = new RGBPixel(p.r, p.g, p.b);
                    imageRow.push(pixel);
                }

                pixels.push(imageRow);
            }

            image = new RGBImage(height, width, meta.imageType, pixels);
        }

        return image;
    }

    getMeta() {
        let canvas = new Canvas();
        let imgData = canvas.fromBase64(this.base64Data);

        let meta = {
            imageType: this.getImageType(),
            height: imgData.height,
            width: imgData.width,
            colorSpace: imgData.colorSpace,
            data: imgData.data
        }

        return meta;
    }
}

export { ImageReader };