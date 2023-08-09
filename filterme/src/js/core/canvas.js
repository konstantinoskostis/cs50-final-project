/**
 * This class provides a high level API over Dom canvas-2d to facilitate
 * reading from Base64 and converting a RGBImage object to a DOM Image object.
 */
class Canvas {
    constructor(height=0, width=0) {
        this.canvas = document.createElement('canvas');

        this.setHeight(height);
        this.setWidth(width);

        this.context = this._context();
    }

    setHeight(h) {
        this.canvas.height = h;
        this.height = h;
    }

    setWidth(w) {
        this.canvas.width = w;
        this.width = w;
    }

    /**
     * Given a base64 encoded image returns an ImageData object.
     * 
     * @param {String / Base64} encoded
     * @returns {ImageData}
     */
    fromBase64(encoded) {
        let img = new Image();
        img.src = encoded;
        
        this.setHeight(img.height)
        this.setWidth(img.width);

        this.getContext().drawImage(img, 0, 0);
        let imageData = this.getContext().getImageData(0, 0, this.width, this.height);

        return imageData;
    }

    /**
     * Draws an RGBImage to canvas
     *
     * @param { RGBImage } rgbImage
     * @returns { Image } An Image JS/DOM element
     */
    drawImage(rgbImage) {
        this.setHeight(rgbImage.height);
        this.setWidth(rgbImage.width);

        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                let pixel = rgbImage.pixels[h][w];

                let fillColor = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
                this.getContext().fillStyle = fillColor;
                this.getContext().fillRect(w, h, 1, 1);
            }
        }

        let encoded = this.canvas.toDataURL();

        let img = new Image();
        img.src = encoded;

        return img;
    }

    getContext() {
        return this.context;
    }

    _context() {
        return this.canvas.getContext('2d');
    }

    dispose() {
        document.removeChild(this.canvas);
    }
}

export { Canvas };