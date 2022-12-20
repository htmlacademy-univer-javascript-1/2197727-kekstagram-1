import { initFilters } from './filters.js';
import { renderUploadForm } from './form.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';


getData((photos) => initFilters(photos),
  () => showAlert(),
);

renderUploadForm();
