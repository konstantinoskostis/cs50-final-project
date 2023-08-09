/**
 * This class contains the RGBImage data structure.
 *
 */
class RGBImage {
    constructor(height, width, imageType, pixels) {
        this.setHeight(height);
        this.setWidth(width);
        this.setImageType(imageType);
        this.setPixels(pixels);
    }

    setHeight(height) {
        this.height = height;
    }

    setWidth(width) {
        this.width = width;
    }

    setImageType(imgType) {
        this.imageType = imgType;
    } 

    setPixels(pixels) {
        this.pixels = pixels;
    }

    allZeros() {
        let pixelsCopy = [];
        let row;
        let column;

        for(row = 0; row < this.height; row++) {
            let imageRow = [];

            for(column = 0; column < this.width; column++) {
                let pixel = this.pixels[row][column].copy();
                pixel.set(0, 0, 0);
                imageRow.push(pixel);
            }

            pixelsCopy.push(imageRow);
        }

        return new RGBImage(this.height, this.width, this.imageType, pixelsCopy);
    }

    copy() {
        let pixelsCopy = [];
        let row;
        let column;

        for(row = 0; row < this.height; row++) {
            let imageRow = [];

            for(column = 0; column < this.width; column++) {
                let pixel = this.pixels[row][column].copy();
                imageRow.push(pixel);
            }

            pixelsCopy.push(imageRow);
        }

        return new RGBImage(this.height, this.width, this.imageType, pixelsCopy);
    }
}

export { RGBImage };