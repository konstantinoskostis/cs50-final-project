import { Uploader } from './components/uploader.js';
import { ImageProcessor } from './components/image_processor.js'

$( document ).ready(function() {
    new Uploader();
    new ImageProcessor();
});