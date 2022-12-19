import { isEscapeKey } from './utils.js';

const errorMessageTemplate = `<section class="error js-message">
<div class="error__inner">
  <h2 class="error__title js-message-inner">Ошибка загрузки файла</h2>
  <button type="button" class="error__button js-message-btn">Загрузить другой файл</button>
</div>
</section>`;

const successMessageTemplate = `<section class="success js-message">
<div class="success__inner">
  <h2 class="success__title js-message-inner">Изображение успешно загружено</h2>
  <button type="button" class="success__button js-message-btn">Круто!</button>
</div>
</section>`;

const onWindowEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    document.removeEventListener('keydown', onWindowEscKeydown);
    removeMessage();
  }
};

const onDocumentClick = (evt) => {
  const target = evt.target;

  if (target.closest('.js-message-inner') && !target.classList.contains('js-message-btn')) {
    return;
  }

  document.removeEventListener('click', onDocumentClick);
  removeMessage();
};

const renderMessage = (isSuccess = false) => {
  document.body.insertAdjacentHTML('beforeend', isSuccess ? successMessageTemplate : errorMessageTemplate);
  document.addEventListener('keydown', onWindowEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

function removeMessage() {
  const message = document.querySelector('.js-message');
  message.remove();
}

export { renderMessage };
