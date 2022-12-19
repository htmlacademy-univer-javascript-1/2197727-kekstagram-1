import { initFilters } from './filter.js';
import { renderUploadForm } from './form.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { ALERT_SHOW_TIME } from './consts.js';

getData((photos) => initFilters(photos),
  () => showAlert('Не удалось загрузить фотографии, обновите страницу', ALERT_SHOW_TIME),
);

renderUploadForm();
