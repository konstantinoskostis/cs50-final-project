/**
 * This class contains the Pixel data structure
 */
class RGBPixel {
    constructor(r, g, b) {
        this.set(r, g, b);
    }

    set(r, g, b) {
        this.setRed(r);
        this.setGreen(g);
        this.setBlue(b);
    }

    setBGColor(bgColor) {
        if (bgColor == null){
            this.bgColor = RGBPixel.white();
        } else {
            this.bgColor = bgColor;
        }
    }

    setRed(r) {
        this.r = Math.round(r);
    }

    setGreen(g) {
        this.g = Math.round(g);
    }

    setBlue(b) {
        this.b = Math.round(b);
    }

    static white() {
        return new RGBPixel(255, 255, 255);
    }

    static black() {
        return new RGBPixel(0, 0, 0);
    }

    static fromRGBA(r, g, b, a, bgColor = 'white') {

        let alpha = a > 1 ? a / 255.0 : a;
        let background = bgColor == 'white' ? RGBPixel.white() : RGBPixel.black();

        let red = ((1 - alpha) * background.r) + (alpha * r);
        let green = ((1 - alpha) * background.g) + (alpha * g);
        let blue = ((1 - alpha) * background.b) + (alpha * b);

        let pixel = new RGBPixel(r, g, b);
        return pixel;
    }

    copy() {
        return new RGBPixel(this.r, this.g, this.b);
    }
}

export { RGBPixel };