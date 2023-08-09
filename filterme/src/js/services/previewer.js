/**
 * This class is responsible for setting attributes
 * to the given Image JS object, such as src (from base64)
 * and classList.
 */
class Previewer {
    constructor() {}

    createImageFromBase64(data, classes) {
        let image = new Image();

        this.setDataToImage(image, {src: data, classList: classes});

        return image;
    }

    setDataToImage(imageElement, options = {}) {
        if (options.src != null) {
            imageElement.src = options.src;
        }

        if (options.classList != null) {
            imageElement.classList.add(...options.classList);
        }
    }

    preview(img, container) {
        this._clear(container);
        container.appendChild(img);
    }

    _clear(container) {
        if (container.firstChild != null) {
            container.removeChild(container.firstChild);
        }
    }
}

export { Previewer };