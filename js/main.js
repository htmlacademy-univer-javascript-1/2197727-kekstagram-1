import {createPhotos} from './data.js';
import {initThumbnails} from './thumbnails.js';

const data = createPhotos();

initThumbnails(data);
