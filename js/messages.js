import { isEscapeKey } from './utils.js';

const errorMessageTemplate = `<section class="error js-message">
<div class="error__inner js-message-inner">
  <h2 class="error__title">Ошибка загрузки файла</h2>
  <button type="button" class="error__button js-message-btn">Загрузить другой файл</button>
</div>
</section>`;

const successMessageTemplate = `<section class="success js-message">
<div class="success__inner js-message-inner">
  <h2 class="success__title">Изображение успешно загружено</h2>
  <button type="button" class="success__button js-message-btn">Круто!</button>
</div>
</section>`;

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    document.removeEventListener('keydown', onDocumentEscKeydown);
    removeMessage();
  }
};

const onDocumentClick = (evt) => {
  const target = evt.target;

  if (target.classList.contains('js-message-btn') || !target.classList.contains('js-message-inner')) {
    removeMessage();
  }

  document.removeEventListener('click', onDocumentClick);
  removeMessage();
};

const renderMessage = (isSuccess = false) => {
  document.body.insertAdjacentHTML('beforeend', isSuccess ? successMessageTemplate : errorMessageTemplate);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

function removeMessage() {
  const message = document.querySelector('.js-message');
  message.remove();
}

export { renderMessage };
