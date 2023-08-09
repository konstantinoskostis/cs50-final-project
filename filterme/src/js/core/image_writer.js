import { Canvas  } from "./canvas.js";


class ImageWriter {
    /**
     * Creates an ImageWriter given an RGBImage object
     * 
     * @param { RGBIMage } rgbImg 
     */
    constructor(rgbImg) {
        this.rgbImg = rgbImg;
        this.img = null;
        this.base64Data = null;
    }

    write() {
        let canvas = new Canvas();
        this.img = canvas.drawImage(this.rgbImg);
        this.base64Data = this.img.src;

        return this.img;
    }

    asBase64() {
        if (this.base64Data == null) {
            this.write();
        }

        return this.base64Data;
    }
}

export { ImageWriter };