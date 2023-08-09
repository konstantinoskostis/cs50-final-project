class ImageFilter {
    constructor(img) {
        this.inputImage = img;
        this.outputImage = img.allZeros();
    }

    /**
     * Parent class apply method.
     * 
     * Places the processed image to the outputImage
     */
    apply() {}
}

class Duplicate extends ImageFilter {
    constructor(img) {
        super(img);
    }

    apply() {
        this.outputImage = this.inputImage.copy();
    }
}

class Grayscale extends ImageFilter {
    constructor(img) {
        super(img);
    }

    apply() {
        for(let h = 0; h < this.inputImage.height; h++) {
            for (let w = 0; w < this.inputImage.width; w++) {
                let original = this.inputImage.pixels[h][w];

                // This is a numerical value (a simple float)
                let gray = (original.r + original.g + original.b) / 3.0;

                this.outputImage.pixels[h][w].set(gray, gray, gray);
            }
        }
    }
}

class Reflect extends ImageFilter {
    constructor(img) {
        super(img);
    }

    apply() {
        let middle = Math.round(this.inputImage.width / 2) - 1;

        for(let h = 0; h < this.inputImage.height; h++) {
            for (let w = 0; w <= middle; w++) {
                let original = this.inputImage.pixels[h][w];
                let reflectedW = (this.inputImage.width - w) - 1;
                let reflected = this.inputImage.pixels[h][reflectedW];

                this.outputImage.pixels[h][w].set(reflected.r, reflected.g, reflected.b);
                this.outputImage.pixels[h][reflectedW].set(original.r, original.g, original.b);
            }
        }
    }
}

class Sepia extends ImageFilter {
    constructor(img) {
        super(img);
    }

    apply() {
        for(let h = 0; h < this.inputImage.height; h++) {
            for (let w = 0; w < this.inputImage.width; w++) {
                let original = this.inputImage.pixels[h][w];

                let pixel = this.sepiaPixel(original);

                this.outputImage.pixels[h][w].set(pixel.r, pixel.g, pixel.b);
            }
        }
    }

    sepiaPixel(pixel) {
        let newRed = Math.min(0.393*pixel.r + 0.769*pixel.g + 0.189*pixel.b, 255);
        let newGreen = Math.min(0.349*pixel.r + 0.686*pixel.g + 0.168*pixel.b, 255);
        let newBlue = Math.min(0.272*pixel.r + 0.534*pixel.g + 0.131*pixel.b, 255);

        return {r: newRed, g: newGreen, b: newBlue};
    }
}

export { Duplicate, Grayscale, Reflect, Sepia };